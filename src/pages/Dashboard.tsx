import React, { useState } from 'react';
import { View } from 'react-native';
import { setItem } from '../stores/Local';
import { MySecondaryDashboardButton, MyLinkButton, MyPrimaryButton, MyPrimaryDashboardButton, MyDashboardLinkButton } from '../components/MyButton';
import { MyText } from '../components/MyText';
import { Session, setSession, useSession } from '../stores/Session';
import { MyStyleSheet } from '../components/MyStyles';
import { Palette, staticWhite, useColors } from '../components/MyColors';
import { Language, useLanguage } from '../components/MyLanguage';
import { MySimpleNavBar, MySimpleNavButtonBarItem } from '../components/MySimpleNavBar';
import { MyAppIcon } from '../components/MyAppIcon';
import { executeRemoteStart, executeRemoteStop } from '../net/EngineStartStop';

// TODO: Tab Bar

export const Dashboard = () => {
    const i18n: Language = useLanguage();
    const C: Palette = useColors();
    const session: Session = useSession();
    const [engineStatus, setEngineStatus] = useState(false); // TODO: Listen on VehicleStatus channel
    const vehicle = session?.vehicles[session?.currentVehicleIndex];
    const rowStyle = { flexDirection: 'row', flexWrap: 1, justifyContent: 'space-evenly', paddingTop: 10, width: '100%' };
    const logout = () => {
        setItem("appState", "login");
        setSession(undefined);
    };
    // TODO: Remove hardcoded params
    const remoteStart = async () => {
        const resp = await executeRemoteStart({pin: "1234", delay: 0, unlockDoorType: "ALL_DOORS_CMD", name: "Summer Time", runTimeMinutes: "10", climateZoneFrontTemp: "65", climateZoneFrontAirMode: "FEET_FACE_BALANCED", climateZoneFrontAirVolume: "7", outerAirCirculation: "outsideAir", heatedRearWindowActive: "false", heatedSeatFrontLeft: "HIGH_COOL", heatedSeatFrontRight: "HIGH_COOL", airConditionOn: "false", canEdit: "true", disabled: "false", presetType: "userPreset", startConfiguration: "START_ENGINE_ALLOW_KEY_IN_IGNITION"});
        if (resp.success) { setEngineStatus(true); }
    };
    // TODO: Remove hardcoded params
    const remoteStop = async () => {
        const resp = await executeRemoteStop({pin: "1234", delay: 0, unlockDoorType: "ALL_DOORS_CMD"});
        if (resp.success) { setEngineStatus(false); }
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
                    <MyAppIcon glyph='frontCar' style={{ color: staticWhite, fontSize: 60 }}></MyAppIcon>
                </View>
                <View style={{ flexGrow: 1, paddingLeft: 10 }}>
                    <MyText>{vehicle?.nickname}</MyText>
                    <MyText>Health: No Reported Issues</MyText>
                    <MyText>Last Updated: 2 minutes ago</MyText>
                </View>
            </View>
            <View style={{flex: 1}}></View>
            {/* <View style={rowStyle}>
                <MySecondaryDashboardButton></MySecondaryDashboardButton>
                <MySecondaryDashboardButton></MySecondaryDashboardButton>
                <MySecondaryDashboardButton></MySecondaryDashboardButton>
            </View>
            <View style={rowStyle}>
                <MySecondaryDashboardButton></MySecondaryDashboardButton>
                <MySecondaryDashboardButton></MySecondaryDashboardButton>
                <MySecondaryDashboardButton></MySecondaryDashboardButton>
            </View>
            <View style={rowStyle}>
                <View style={{ backgroundColor: C.copySecondary, flexDirection: 'row', flexWrap: 1, justifyContent: 'space-evenly', paddingVertical: 10, width: 320 }}>
                    <MyDashboardLinkButton></MyDashboardLinkButton>
                    <MyPrimaryDashboardButton
                        glyph={engineStatus ? 'powerOff' : 'powerOn'}
                        onPress={engineStatus ? remoteStop : remoteStart}
                        title={engineStatus ? i18n.home.stopEngine : i18n.home.startEngine} />
                    <MyDashboardLinkButton></MyDashboardLinkButton>
                </View>
            </View>
            <View style={{flex: 1}}></View>
            <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                <MyPrimaryButton/>
                <MyPrimaryButton/>
                <MyPrimaryButton/>
                <MyPrimaryButton/>
            </View> */}
            <MyPrimaryDashboardButton
                        glyph={engineStatus ? 'powerOff' : 'powerOn'}
                        onPress={engineStatus ? remoteStop : remoteStart}
                        title={engineStatus ? i18n.home.stopEngine : i18n.home.startEngine} />
        </View>
    </View>
}
