import React from 'react';
import { ActivityIndicator, View } from "react-native";
import { descriptionForEndpoint, descriptionForErrorCode } from '../model/Code';
import { NetworkActivity, useNetworkActivity } from '../stores/Response';
import { MyAppIcon } from './MyAppIcon';
import { MyLinkButton } from './MyButton';
import { Palette, useColors } from "./MyColors";
import { Language, useLanguage } from '../model/Language';
import { MyText } from './MyText';
import { descriptionForRemoteServiceStatus } from '../net/RemoteCommand';

export interface MySnackBarProps {
    style?: any
    title?: string
    type?: "progress" | "success" | "error"
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
                switch (props.type) {
                    case "error": return <MyAppIcon glyph='alert' style={{ color: C.error }}></MyAppIcon>;
                    case "progress": return <ActivityIndicator size='large' color={C.buttonPrimary}></ActivityIndicator>
                    case "success": return <MyAppIcon glyph='checkmarkCircleFilled' style={{ color: C.success }}></MyAppIcon>
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


export const MyNetworkSnackBar = (props: MySnackBarProps) => {
    const i18n: Language = useLanguage();
    const [activity, setActivity] = useNetworkActivity();
    const onClose = () => {
        if (props.onClose) { props.onClose(); }
        setActivity(null);
    }
    if (activity == null) { return null; }
    if (activity.type === "request") {
        return <MySnackBar title={descriptionForEndpoint(i18n, activity.request.endpoint)} type="progress" onClose={onClose} />
    } else {
        const response = activity.response;
        const type = response.success ? "success" : "error"
        if (response.errorCode != null) {
            return <MySnackBar title={descriptionForErrorCode(i18n, response.errorCode)} type={type} onClose={onClose} />
        } else if (response.dataName === "remoteServiceStatus") {
            const status = response.data;
            return <MySnackBar title={descriptionForRemoteServiceStatus(i18n, status)} type={status.remoteServiceState == "finished" ? type : "progress"} onClose={onClose} />
        } else {
            return <MySnackBar title={descriptionForEndpoint(i18n, response.endpoint)} type={type} onClose={onClose} />
        }
    }
}
