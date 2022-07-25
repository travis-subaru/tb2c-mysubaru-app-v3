import React from 'react';
import { ActivityIndicator, View } from "react-native";
import { descriptionForEndpoint, descriptionForErrorCode } from '../model/Code';
import { NetworkActivity } from '../stores/Response';
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

export interface MyNetworkSnackBarProps extends MySnackBarProps {
    activity: NetworkActivity | null
}

export const MyNetworkSnackBar = (props: MyNetworkSnackBarProps) => {
    const i18n: Language = useLanguage();
    if (props.activity == null) { return null; }
    if (props.activity.type === "request") {
        return <MySnackBar title={descriptionForEndpoint(i18n, props.activity.request.endpoint)} type="progress" onClose={props.onClose} />
    } else {
        const response = props.activity.response;
        const type = response.success ? "success" : "error"
        if (response.errorCode != null) {
            return <MySnackBar title={descriptionForErrorCode(i18n, response.errorCode)} type={type} onClose={props.onClose} />
        } else {
            return <MySnackBar title={descriptionForEndpoint(i18n, response.endpoint)} type={type} onClose={props.onClose} />
        }

    }
}
