import React, { useState } from 'react';
import { View } from 'react-native';
import { MyPrimaryDashboardButton, MyDashboardLinkButton } from '../components/MyButton';
import { MyText } from '../components/MyText';
import { Session, useSession } from '../stores/Session';
import { MyStyleSheet } from '../components/MyStyles';
import { Palette, staticWhite, useColors } from '../components/MyColors';
import { Language, useLanguage } from '../components/MyLanguage';
import { MyAppIcon } from '../components/MyAppIcon';
import { executeRemoteStart, executeRemoteStop } from '../net/EngineStartStop';
import { withPINCheck } from './PINCheck';

export const HomeTab = () => {
    const i18n: Language = useLanguage();
    const C: Palette = useColors();
    const session: Session = useSession();
    const [engineStatus, setEngineStatus] = useState(false); // TODO: Listen on VehicleStatus channel
    const vehicle = session?.vehicles[session?.currentVehicleIndex];
    const rowStyle = { flexDirection: 'row', flexWrap: 1, justifyContent: 'space-evenly', paddingTop: 10, paddingHorizontal: 20, width: '100%' };
    // TODO: Remove hardcoded params
    const remoteStart = async () => {
        const pin = await withPINCheck();
        if (pin.ok) {
            const resp = await executeRemoteStart({pin: pin.pin, delay: 0, unlockDoorType: "ALL_DOORS_CMD", name: "Summer Time", runTimeMinutes: "10", climateZoneFrontTemp: "65", climateZoneFrontAirMode: "FEET_FACE_BALANCED", climateZoneFrontAirVolume: "7", outerAirCirculation: "outsideAir", heatedRearWindowActive: "false", heatedSeatFrontLeft: "HIGH_COOL", heatedSeatFrontRight: "HIGH_COOL", airConditionOn: "false", canEdit: "true", disabled: "false", presetType: "userPreset", startConfiguration: "START_ENGINE_ALLOW_KEY_IN_IGNITION"});
            if (resp.success) { setEngineStatus(true); }
        }

    };
    // TODO: Remove hardcoded params
    const remoteStop = async () => {
        const pin = await withPINCheck();
        if (pin.ok) {
            const resp = await executeRemoteStop({pin: pin.pin, delay: 0, unlockDoorType: "ALL_DOORS_CMD"});
            if (resp.success) { setEngineStatus(false); }
        }
    };
    return <View style={{ flex: 1, alignItems: 'center', justifyContent:'flex-start' }}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' , paddingHorizontal: 20}}>
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
        </View>*/}
        <View style={rowStyle}>
            <View style={[MyStyleSheet.roundedEdge, { backgroundColor: C.backgroundSecondary, flexDirection: 'row', flexWrap: 0, alignItems: 'center', justifyContent: 'space-evenly', marginVertical: 10, width: '100%' }]}>
                <MyDashboardLinkButton style={{ flexBasis: 50, minWidth: 50, paddingHorizontal: 10 }} glyph="gear" title="View\nStart\nSettings"></MyDashboardLinkButton>
                <MyPrimaryDashboardButton style={{ flexGrow: 1, marginVertical: 10 }} glyph={engineStatus ? 'powerOff' : 'powerOn'} onPress={engineStatus ? remoteStop : remoteStart} title={engineStatus ? i18n.home.stopEngine : i18n.home.startEngine} />
                <MyDashboardLinkButton style={{ flexBasis: 50, minWidth: 50, paddingHorizontal: 10 }} glyph="filters" title="Climate\nPresets"></MyDashboardLinkButton>
            </View>
        </View>
    </View>;
}
