import React from 'react';
import { View } from 'react-native';
import { setItem } from '../stores/Local';
import { MyActionButton, MyLinkButton, MyPrimaryButton } from '../components/MyButton';
import { MyText } from '../components/MyText';
import { Session, setSession, useSession } from '../stores/Session';
import { MyStyleSheet } from '../components/MyStyles';
import { Palette, useColors } from '../components/MyColors';
import { Language, useLanguage } from '../components/MyLanguage';
import { MySimpleNavBar, MySimpleNavButtonBarItem } from '../components/MySimpleNavBar';

export const Dashboard = () => {
    const i18n: Language = useLanguage();
    const C: Palette = useColors();
    const session: Session = useSession();
    const vehicle = session?.vehicles[session?.currentVehicleIndex];

    const logout = () => {
        setItem("appState", "login");
        setSession(undefined);
    }

    const remoteStart = () => {

    };

    const remoteStop = () => {

    };

    return <View style={MyStyleSheet.screenOuter}>
        <MySimpleNavBar style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <MySimpleNavButtonBarItem style={{flexDirection: 'row', justifyContent: 'flex-start'}} onPress={logout} title= "Logout"></MySimpleNavButtonBarItem>
            <MyText>Home</MyText>
            <MySimpleNavButtonBarItem style={{flexDirection: 'row', justifyContent: 'flex-end'}} onPress={logout} title= "Vehicles"></MySimpleNavButtonBarItem>
        </MySimpleNavBar>
        <View style={MyStyleSheet.screenInner}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                <View style={{ alignItems: 'center', justifyContent: 'center', width: 72, height: 72, backgroundColor: C.buttonSecondary}}>
                    <MyText style={[MyStyleSheet.headlineText, {}]}>Car</MyText>
                </View>
                <View style={{ flexGrow: 1, paddingLeft: 10 }}>
                    <MyText>{vehicle?.nickname}</MyText>
                    <MyText>Health: No Reported Issues</MyText>
                    <MyText>Last Updated: 2 minutes ago</MyText>
                </View>
            </View>
            <View style={{flex: 1}}></View>
            <View style={{ flexDirection: 'row', flexWrap: 1, justifyContent: 'space-evenly', paddingTop: 10, width: '100%'}}>
                <MyActionButton></MyActionButton>
                <MyActionButton></MyActionButton>
                <MyActionButton></MyActionButton>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 1, justifyContent: 'space-evenly', paddingTop: 10, width: '100%'}}>
                <MyActionButton></MyActionButton>
                <MyActionButton></MyActionButton>
                <MyActionButton></MyActionButton>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 1, justifyContent: 'space-evenly', paddingTop: 10, width: '100%'}}>
                <MyActionButton></MyActionButton>
                <MyActionButton title='Engine Start'></MyActionButton>
                <MyActionButton></MyActionButton>
            </View>
            <View style={{flex: 1}}></View>
            <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                {/* TODO Tab Bar */}
                <MyPrimaryButton/>
                <MyPrimaryButton/>
                <MyPrimaryButton/>
                <MyPrimaryButton/>
            </View>
        </View>
    </View>
}
