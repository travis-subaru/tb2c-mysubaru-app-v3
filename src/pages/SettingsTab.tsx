import React from 'react';
import { View } from 'react-native';
import { MyAppIcon } from '../components/MyAppIcon';
import { MyPrimaryButton, MySecondaryButton } from '../components/MyButton';
import { Palette, useColors } from '../components/MyColors';
import { Language, useLanguage } from '../components/MyLanguage';
import { MySimpleNavBar, MySimpleNavButtonBarItem } from '../components/MySimpleNavBar';
import { MyStyleSheet } from '../components/MyStyles';
import { MyText } from '../components/MyText';
import { logout, Session, useSession } from '../stores/Session';

export const SettingsTab = () => {
    const C: Palette = useColors();
    const session: Session = useSession();
    const i18n: Language = useLanguage();
    return <View style={{ flex: 1, alignItems: 'center', justifyContent:'flex-start' }}>
        <MySimpleNavBar key="settings">
            <MySimpleNavButtonBarItem title=" ">{/* TODO Fix padding requirement */}</MySimpleNavButtonBarItem>
            <MyText style={MyStyleSheet.boldCopyText}>{i18n.appSettings.title}</MyText>
        </MySimpleNavBar>
        <View style={[MyStyleSheet.roundedEdge, { alignSelf: 'stretch', backgroundColor: C.backgroundSecondary, padding: 8, margin: 8}]}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", paddingBottom: 10 }}>
                <MyAppIcon glyph="profileUser" style={{ paddingRight: 5 }}></MyAppIcon>
                <MyText>{session?.account.firstName + " " + session?.account.lastName}</MyText>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between"}}>
                <MyPrimaryButton style={{ flexGrow: 1 }} title={i18n.myProfile.title}></MyPrimaryButton>
                <View style={{ padding: 8 }}></View>
                <MySecondaryButton onPress={() => { logout()}} style={{ flexGrow: 1 }} title={i18n.index.logout}></MySecondaryButton>
            </View>
        </View>
    </View>;
}

