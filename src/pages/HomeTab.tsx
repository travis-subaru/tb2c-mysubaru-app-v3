import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';
import { MyPrimaryDashboardButton, MyDashboardLinkButton, MyButtonProps } from '../components/MyButton';
import { MyText } from '../components/MyText';
import { Session, useSession } from '../stores/Session';
import { MyStyleSheet } from '../components/MyStyles';
import { Palette, staticWhite, useColors } from '../components/MyColors';
import { Language, useLanguage } from '../model/Language';
import { MyAppIcon } from '../components/MyAppIcon';
import { executeRemoteLock, executeRemoteStart, executeRemoteStop, executeRemoteUnlock } from '../net/RemoteCommand';
import { withPINCheck } from './PINCheck';
import { MyPressable } from '../components/MyPressable';

/** Home screen action button
 *
 * Used for various vehicle commands.
 */
 export const HomeScreenActionButton = (props: MyButtonProps) => {
    const C: Palette = useColors();
    const [pressed, setPressed] = useState(false);
    const [onPressIn, onPressOut] = [() => setPressed(true), () => setPressed(false)];
    const backgroundColor = pressed ? C.buttonPrimary : C.background;
    const style = { backgroundColor: backgroundColor, borderColor: C.copyPrimary, borderWidth: 1, padding: 8, alignItems: 'flex-start', justifyContent: 'flex-start' };
    return (<MyPressable onPressIn={onPressIn} onPressOut={onPressOut} {...props} style={[MyStyleSheet.roundedEdge, style, props.style]}>
        {props.glyph ? <MyAppIcon glyph={props.glyph}></MyAppIcon> : null}
        {props.title ? <MyText>{props.title}</MyText> : null}
        {props.subtitle ? <MyText style={{color: C.copySecondary}}>{props.subtitle}</MyText> : null}
    </MyPressable>);
}

export const HomeTab = () => {
    const i18n: Language = useLanguage();
    const C: Palette = useColors();
    const session: Session = useSession();
    const [engineStatus, setEngineStatus] = useState(false); // TODO: Listen on VehicleStatus channel
    const [locked, setLocked] = useState(true); // TODO: Listen on VehicleStatus channel
    const vehicle = session?.vehicles[session?.currentVehicleIndex];
    const rowStyle = { flexDirection: 'row', flexWrap: 1, alignSelf: 'stretch', justifyContent: 'space-between' };
    const buttonSize = Math.min((Dimensions.get('window').width - 80) / 3, 120) ;
    const buttonStyle = { width: buttonSize, height: buttonSize, marginBottom: 20 };
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
    const remoteLock = async () => {
        if (!vehicle) { return; }
        const pin = await withPINCheck();
        if (pin.ok) {
            const resp = await executeRemoteLock({pin: pin.pin, delay: 0, forceKeyInCar: false, vin: vehicle.vin });
            if (resp.success) { setLocked(true); }
        }
    };
    const remoteUnlock = async () => {
        if (!vehicle) { return; }
        const pin = await withPINCheck();
        if (pin.ok) {
            const resp = await executeRemoteUnlock({pin: pin.pin, delay: 0, unlockDoorType: "ALL_DOORS_CMD", vin: vehicle.vin });
            if (resp.success) { setLocked(false); }
        }
    };
    return <View style={{ flex: 1, alignItems: 'center', justifyContent:'flex-start', paddingHorizontal: 20 }}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
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
            <HomeScreenActionButton glyph="alertInfo" style={buttonStyle} title="Driver Alerts" subtitle='When Leaving'></HomeScreenActionButton>
            <HomeScreenActionButton glyph="lights" style={buttonStyle} title="Horn & Lights" subtitle='Off'></HomeScreenActionButton>
            <HomeScreenActionButton glyph="map" style={buttonStyle} title="Trips"></HomeScreenActionButton>
        </View>
        <View style={rowStyle}>
            <HomeScreenActionButton glyph={locked ? "unlock" : "lock"} style={buttonStyle} title={locked ? i18n.home.unlockDoors : i18n.home.lockDoors} subtitle='Locked' onPress={locked ? remoteUnlock : remoteLock}></HomeScreenActionButton>
            <HomeScreenActionButton glyph="lights" style={buttonStyle} title="Horn & Lights" subtitle='Off'></HomeScreenActionButton>
            <HomeScreenActionButton glyph="mapMarker" style={buttonStyle} title="Location" subtitle={`${buttonSize}`}></HomeScreenActionButton>
        </View>
        <View style={rowStyle}>
            <View style={[MyStyleSheet.roundedEdge, { backgroundColor: C.backgroundSecondary, flexDirection: 'row', flexWrap: 0, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'space-evenly', width: '100%' }]}>
                <MyDashboardLinkButton style={{ flexBasis: 50, minWidth: 50, paddingHorizontal: 10 }} glyph="gear" title="View\nStart\nSettings"></MyDashboardLinkButton>
                <MyPrimaryDashboardButton style={{ flexGrow: 1, marginVertical: 10 }} glyph={engineStatus ? 'powerOff' : 'powerOn'} onPress={engineStatus ? remoteStop : remoteStart} title={engineStatus ? i18n.home.stopEngine : i18n.home.startEngine} />
                <MyDashboardLinkButton style={{ flexBasis: 50, minWidth: 50, paddingHorizontal: 10 }} glyph="filters" title="Climate\nPresets"></MyDashboardLinkButton>
            </View>
        </View>
        <View style={{flex: 1}}></View>
    </View>;
}
