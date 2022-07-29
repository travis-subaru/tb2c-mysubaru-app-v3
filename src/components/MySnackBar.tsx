import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from "react-native";
import { addNetworkActivityListener, NetworkActivity, normalizeEndpoint, removeNetworkActivityListener } from '../stores/Response';
import { MyAppIcon } from './MyAppIcon';
import { MyLinkButton } from './MyButton';
import { Palette, useColors } from "./MyColors";
import { Language, useLanguage } from '../model/Language';
import { MyText } from './MyText';
import { RemoteServiceStatus } from '../net/RemoteCommand';
import { descriptionForErrorCode } from '../model/Code';

export interface MySnackBarProps {
    style?: any
    title?: string
    type?: "progress" | "success" | "error" | "info"
    onClose?: () => void
}

export const MySnackBar = (props: MySnackBarProps) => {
    const C: Palette = useColors();
    const pressClose = () => {
        if (props.onClose) { props.onClose(); }
    }
    return <View style={[{ backgroundColor: C.backgroundSecondary, minHeight: 50, maxWidth: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, props.style]}>
        <View style={{ flexBasis: 50, justifyContent: 'center', alignItems: 'center' }}>
            {(() => {
                switch (props.type ?? "info") {
                    case "error": return <MyAppIcon glyph='alert' style={{ color: C.error }}></MyAppIcon>;
                    case "progress": return <ActivityIndicator size='large' color={C.buttonPrimary}></ActivityIndicator>
                    case "success": return <MyAppIcon glyph='checkmarkCircleFilled' style={{ color: C.success }}></MyAppIcon>
                    case "info": return <MyAppIcon glyph='alertInfo' style={{ color: C.copyPrimary }}></MyAppIcon>
                }
            })()}
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 4 }}>
            <MyText style={{ numberOfLines: 0 }}>{props.title}</MyText>
        </View>
        <View style={{ flexBasis: 50, justifyContent: 'center', alignItems: 'center' }}>
            <MyLinkButton glyph='close' style={{minWidth: 50, maxWidth: 50}} onPress={pressClose} />
        </View>
    </View>;
}

export const descriptionForRemoteServiceStatus = (i18n: Language, status: RemoteServiceStatus): string | undefined => {
    switch (status.remoteServiceState) {
        case "started": {
            switch (status.remoteServiceType) {
                case "engineStart": return i18n.statusBar.remoteEngineStartStarted;
                case "engineStop": return i18n.statusBar.remoteEngineStopStarted;
                case "lock": return i18n.statusBar.lockDoorsStarted;
                case "unlock": return i18n.statusBar.unlockDoorsStarted;
                case "hornLights": return i18n.statusBar.hornLightsStarted;
            }
        }
        case "finished": {
            const message = (() => {
                switch (status.remoteServiceType) {
                    case "engineStart": return i18n.statusBar.remoteEngineStartFinished;
                    case "engineStop": return i18n.statusBar.remoteEngineStopFinished;
                    case "lock": return i18n.statusBar.lockDoorsFinished;
                    case "unlock": return i18n.statusBar.unlockDoorsFinished;
                    case "hornLights": return i18n.statusBar.hornLightsFinished;
                }
            })()
            const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric' };
            const now = (new Date()).toLocaleString('en-US', options);
            return `${message}${now}`
        }
    }

    return undefined;
};

export const descriptionForActivity = (i18n: Language, activity: NetworkActivity): string | undefined => {
    if (activity.type === "request") {
        const endpoint = normalizeEndpoint(activity.request.endpoint);
        switch (endpoint) {
            case "login.json": return i18n.loadingAnimation.title;
            case "selectVehicle.json": return i18n.loadingAnimation.text1;
            case "refreshVehicles.json": return i18n.loadingAnimation.text2;
            case "twoStepAuthContacts.json": return i18n.loadingAnimation.text3;
            case "twoStepAuthSendVerification.json": return "TODO 1";
            case "twoStepAuthVerify.json": return "TODO 2"
            case "service/g2/engineStart/execute.json": return i18n.statusBar.remoteEngineStartSent;
            case "service/g2/engineStop/execute.json": return i18n.statusBar.remoteEngineStopSent;
            case "service/g2/lock/execute.json": return i18n.statusBar.lockDoorsSent;
            case "service/g2/unlock/execute.json": return i18n.statusBar.unlockDoorsSent;
            case "service/g2/hornLights/execute.json": return i18n.statusBar.hornLightsSent;
            default: return `SENT: ${endpoint}`;
        }
    } else {
        const r = activity.response;
        if (r.dataName === "remoteServiceStatus") {
            return descriptionForRemoteServiceStatus(i18n, r.data);
        }
        if (r.errorCode === "statusError") {
            return `${i18n.message.fatalMessage} (HTTP: ${r.data.status})`
        }
        if (r.errorCode != null) {
            return descriptionForErrorCode(i18n, r.errorCode);
        }
        if (r.success) {
            // Catch-all for unhandled successes
            return `${i18n.common.ok}: ${normalizeEndpoint(activity.response.endpoint)}`;
        } else {
            // Catch-all for unhandled failures
            return `${i18n.message.fatalMessage}: ${normalizeEndpoint(activity.response.endpoint)}`;
        }
    }
};

export interface MyNetworkSnackBarProps extends MySnackBarProps {
    showActivity?: (activity: NetworkActivity) => boolean
}

export const MyNetworkSnackBar = (props: MyNetworkSnackBarProps) => {
    const i18n: Language = useLanguage();
    const [activity, setActivity] = useState<NetworkActivity|null>(null);
    useEffect(() => {
        const id = addNetworkActivityListener((activity) => {
            if (!props.showActivity || props.showActivity(activity)) {
                const description = descriptionForActivity(i18n, activity);
                if (description) {
                    setActivity(activity);
                }
            }
        });
        return () => removeNetworkActivityListener(id);
    });
    if (activity == null) { return null; }
    const onClose = () => {
        if (props.onClose) { props.onClose(); }
        setActivity(null);
    }
    const type = (() => {
        if (activity.type === "request") {
            return "progress";
        } else {
            if (activity.response.dataName === "remoteServiceStatus" && activity.response.data.remoteServiceState !== "finished") {
                return "progress"; // Show in-progress because status endpoint is polled next
            } else {
                return activity.response.success ? "success" : "error";
            }
        }
    })();
    return <MySnackBar title={descriptionForActivity(i18n, activity)} type={type} onClose={onClose} />
}
