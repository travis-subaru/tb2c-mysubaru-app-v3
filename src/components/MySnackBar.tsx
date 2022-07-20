import React from 'react';
import { ActivityIndicator, View } from "react-native";
import { descriptionForCode } from '../model/Code';
import { NetworkActivity } from '../stores/Response';
import { MyAppIcon } from './MyAppIcon';
import { MyLinkButton } from './MyButton';
import { Palette, useColors } from "./MyColors";
import { Language, useLanguage } from './MyLanguage';
import { MyText } from './MyText';

export interface MySnackBarProps {
    activity: NetworkActivity | null
    style?: any
    title?: string
    onClose?: () => void
}

export const MySnackBar = (props: MySnackBarProps) => {
    const C: Palette = useColors();
    const i18n: Language = useLanguage();
    const pressClose = () => {
        if (props.onClose) { props.onClose(); }
    }
    if (props.activity == null) { return null; }
    const title = props.title ?? props.activity.status == "progress" ? "In Progress" : props.activity.status == "success" ? i18n.login.welcome : descriptionForCode(props.activity.tag, i18n);
    return <View style={[{ backgroundColor: C.backgroundSecondary, minHeight: 50, maxWidth: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, props.style]}>
        <View style={{ flexBasis: 50, justifyContent: 'center', alignItems: 'center' }}>
            {(() => {
                switch (props.activity.status) {
                    case "error": return <MyAppIcon glyph='alert' style={{ color: C.error }}></MyAppIcon>;
                    case "progress": return <ActivityIndicator size='large' color={C.buttonPrimary}></ActivityIndicator>
                    case "success": return <MyAppIcon glyph='checkmarkCircleFilled' style={{ color: C.success }}></MyAppIcon>
                }
            })()}
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 4 }}>
            <MyText style={{ numberOfLines: 0 }}>{title}</MyText>
        </View>
        <View style={{ flexBasis: 50, justifyContent: 'center', alignItems: 'center' }}>
            <MyLinkButton glyph='close' style={{minWidth: 50, maxWidth: 50}} onPress={pressClose} />
        </View>
    </View>;
}
