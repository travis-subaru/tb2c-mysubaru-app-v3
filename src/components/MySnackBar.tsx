import React from 'react';
import { ActivityIndicator, View } from "react-native";
import { descriptionForActivity, useNetworkActivity } from '../stores/Response';
import { MyAppIcon } from './MyAppIcon';
import { MyLinkButton } from './MyButton';
import { Palette, useColors } from "./MyColors";
import { Language, useLanguage } from '../model/Language';
import { MyText } from './MyText';

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
