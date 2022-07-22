import React, { useState } from 'react';
import { View } from 'react-native';
import { MyPrimaryDashboardButton, MyDashboardLinkButton, MyButtonProps } from '../components/MyButton';
import { MyText } from '../components/MyText';
import { Session, useSession } from '../stores/Session';
import { MyStyleSheet } from '../components/MyStyles';
import { Palette, staticWhite, useColors } from '../components/MyColors';
import { Language, useLanguage } from '../components/MyLanguage';
import { MyAppIcon } from '../components/MyAppIcon';
import { executeRemoteStart, executeRemoteStop } from '../net/EngineStartStop';
import { withPINCheck } from './PINCheck';
import { MyPressable } from '../components/MyPressable';

/** Home screen action button
 *
 * Used for various vehicle commands.
 */
 export const HomeScreenActionButton = (props: MyButtonProps) => {
    const Colors: Palette = useColors();
    const [pressed, setPressed] = useState(false);
    const [onPressIn, onPressOut] = [() => setPressed(true), () => setPressed(false)];
    const size = 100;
    const style = { borderColor: Colors.copyPrimary, borderWidth: 1, minWidth: size, width: size, maxWidth: size, minHeight: size, padding: 8, margin: 8, alignItems: 'flex-start', justifyContent: 'flex-start' };
    return (<MyPressable onPressIn={onPressIn} onPressOut={onPressOut} {...props} style={[MyStyleSheet.roundedEdge, style, props.style]}>
        {props.glyph ? <MyAppIcon glyph={props.glyph}></MyAppIcon> : null}
        {props.title ? <MyText>{props.title}</MyText> : null}
        {props.subtitle ? <MyText style={{color: Colors.copySecondary}}>{props.subtitle}</MyText> : null}
    </MyPressable>);
}

export const HomeTab = () => {
    const i18n: Language = useLanguage();
    const C: Palette = useColors();
    const session: Session = useSession();
    const [engineStatus, setEngineStatus] = useState(false); // TODO: Listen on VehicleStatus channel
    const vehicle = session?.vehicles[session?.currentVehicleIndex];
    const rowStyle = { flexDirection: 'row', flexWrap: 1, alignSelf: 'stretch', justifyContent: 'space-evenly' };
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
        <View style={rowStyle}>
            <HomeScreenActionButton glyph="alertInfo" title="Driver Alerts" subtitle='When Leaving'></HomeScreenActionButton>
            <HomeScreenActionButton glyph="lights" title="Horn & Lights" subtitle='Off'></HomeScreenActionButton>
            <HomeScreenActionButton glyph="map" title="Trips"></HomeScreenActionButton>
        </View>
        <View style={rowStyle}>
            <HomeScreenActionButton glyph="lock" title="Door Locks" subtitle='Locked'></HomeScreenActionButton>
            <HomeScreenActionButton glyph="lights" title="Horn & Lights" subtitle='Off'></HomeScreenActionButton>
            <HomeScreenActionButton glyph="mapMarker" title="Location"></HomeScreenActionButton>
        </View>
        <View style={[rowStyle, {paddingHorizontal: 15}]}>
            <View style={[MyStyleSheet.roundedEdge, { backgroundColor: C.backgroundSecondary, flexDirection: 'row', flexWrap: 0, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'space-evenly', marginVertical: 10, width: '100%' }]}>
                <MyDashboardLinkButton style={{ flexBasis: 50, minWidth: 50, paddingHorizontal: 10 }} glyph="gear" title="View\nStart\nSettings"></MyDashboardLinkButton>
                <MyPrimaryDashboardButton style={{ flexGrow: 1, marginVertical: 10 }} glyph={engineStatus ? 'powerOff' : 'powerOn'} onPress={engineStatus ? remoteStop : remoteStart} title={engineStatus ? i18n.home.stopEngine : i18n.home.startEngine} />
                <MyDashboardLinkButton style={{ flexBasis: 50, minWidth: 50, paddingHorizontal: 10 }} glyph="filters" title="Climate\nPresets"></MyDashboardLinkButton>
            </View>
        </View>
        <View style={{flex: 1}}></View>
    </View>;
}
