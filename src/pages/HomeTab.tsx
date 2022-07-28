import React, { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { MyButtonProps } from '../components/MyButton';
import { MyText } from '../components/MyText';
import { Session, useSession } from '../stores/Session';
import { MyStyleSheet } from '../components/MyStyles';
import { Palette, staticMidnight, staticWhite, useColors } from '../components/MyColors';
import { Language, useLanguage } from '../model/Language';
import { MyAppIcon } from '../components/MyAppIcon';
import { descriptionForUnlockDoorType, executeRemoteLock, executeRemoteStart, executeRemoteStop, executeRemoteUnlock, UnlockDoorType } from '../net/RemoteCommand';
import { MyPressable } from '../components/MyPressable';
import { presentModal } from '../stores/Local';
import { ListItem } from '../components/MySimpleChoiceModal';

/** Primary action button for dashboard
 *
 * Used for engine start / stop.
 */
 export const MyPrimaryDashboardButton = (props: MyButtonProps) => {
    const C: Palette = useColors();
    const [pressed, setPressed] = useState(false);
    const [onPressIn, onPressOut] = [() => setPressed(true), () => setPressed(false)];
    const backgroundColor = pressed ? staticMidnight : C.buttonPrimary;
    const borderColor = pressed ? C.buttonPrimary : staticWhite;
    const textColor = staticWhite;
    const lines = (props.title?.split('\\n') ?? []).map((line, i) => {
        return <Text key={i} style={[MyStyleSheet.buttonText, { color: textColor }, props.textStyle]}>{line}</Text>
    });
    const size = 150;
    const style = { backgroundColor: backgroundColor, borderColor: borderColor, borderRadius: size / 2, borderWidth: 10, width: size, height: size };
    return (<MyPressable onPressIn={onPressIn} onPressOut={onPressOut} {...props} style={[style, props.style]}>
        {props.glyph ? <MyAppIcon glyph={props.glyph} style={{color: staticWhite}}></MyAppIcon> : null}
        {lines}
    </MyPressable>);
}

/** Links for dashboard
 *
 * Designed to flank engine start.
 */
 export const MyDashboardLinkButton = (props: MyButtonProps) => {
    const C: Palette = useColors();
    const [pressed, setPressed] = useState(false);
    const [onPressIn, onPressOut] = [() => setPressed(true), () => setPressed(false)];
    const color = pressed ? C.copyPrimary : C.buttonSecondary

    return (<MyPressable onPressIn={onPressIn} onPressOut={onPressOut} {...props} style={[props.style]}>
        {props.glyph ? <MyAppIcon glyph={props.glyph} style={{color: color }}></MyAppIcon> : null}
        <MyText style={[MyStyleSheet.buttonText, { textAlign: 'center', color: color, }, props.textStyle]}>{props.title}</MyText>
    </MyPressable>);
}

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
        const pinResult = await presentModal({ type: "PIN" });
        if (pinResult.type !== "pin") { return; }
        const resp = await executeRemoteStart({pin: pinResult.pin, delay: 0, unlockDoorType: "ALL_DOORS_CMD", name: "Summer Time", runTimeMinutes: "10", climateZoneFrontTemp: "65", climateZoneFrontAirMode: "FEET_FACE_BALANCED", climateZoneFrontAirVolume: "7", outerAirCirculation: "outsideAir", heatedRearWindowActive: "false", heatedSeatFrontLeft: "HIGH_COOL", heatedSeatFrontRight: "HIGH_COOL", airConditionOn: "false", canEdit: "true", disabled: "false", presetType: "userPreset", startConfiguration: "START_ENGINE_ALLOW_KEY_IN_IGNITION"});
        if (resp.success) { setEngineStatus(true); }
    };
    // TODO: Remove hardcoded params
    const remoteStop = async () => {
        const pinResult = await presentModal({ type: "PIN" });
        if (pinResult.type !== "pin") { return; }
        const resp = await executeRemoteStop({pin: pinResult.pin, delay: 0, unlockDoorType: "ALL_DOORS_CMD"});
        if (resp.success) { setEngineStatus(false); }
    };
    const remoteLock = async () => {
        if (!vehicle) { return; }
        const pinResult = await presentModal({ type: "PIN" });
        if (pinResult.type !== "pin") { return; }
        const resp = await executeRemoteLock({pin: pinResult.pin, delay: 0, forceKeyInCar: false, vin: vehicle.vin });
        if (resp.success) { setLocked(true); }
    };
    const remoteUnlock = async () => {
        if (!vehicle) { return; }
        const unlockTypes: UnlockDoorType[] = ["ALL_DOORS_CMD", "FRONT_LEFT_DOOR_CMD", "TAILGATE_DOOR_CMD"];
        const unlockItems: ListItem[] = unlockTypes.map((u) => { return {value: u, description: descriptionForUnlockDoorType(i18n, u)}; })
        const choiceResult = await presentModal({ type: "MySimpleChoice", title: i18n.home.unlockDoors, items: unlockItems });
        if (choiceResult.type !== "choice") { return; }
        // @ts-ignore unlockTypes is type constrained
        const unlockDoorType: UnlockDoorType = choiceResult.selection.value;
        const pinResult = await presentModal({ type: "PIN" });
        if (pinResult.type !== "pin") { return; }
        const resp = await executeRemoteUnlock({pin: pinResult.pin, delay: 0, unlockDoorType: unlockDoorType, vin: vehicle.vin });
        if (resp.success) { setLocked(false); }
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
            <HomeScreenActionButton glyph="mapMarker" style={buttonStyle} title="Location"></HomeScreenActionButton>
        </View>
        <View style={rowStyle}>
            <View style={[MyStyleSheet.roundedEdge, { backgroundColor: C.backgroundSecondary, flexDirection: 'row', flexWrap: 0, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'space-evenly', width: '100%' }]}>
                <MyDashboardLinkButton style={{ paddingHorizontal: 10 }} glyph="gear" title="View\nStart\nSettings"></MyDashboardLinkButton>
                <MyPrimaryDashboardButton style={{ marginVertical: 10 }} glyph={engineStatus ? 'powerOff' : 'powerOn'} onPress={engineStatus ? remoteStop : remoteStart} title={engineStatus ? i18n.home.stopEngine : i18n.home.startEngine} />
                <MyDashboardLinkButton style={{ paddingHorizontal: 10 }} glyph="filters" title="Climate\nPresets"></MyDashboardLinkButton>
            </View>
        </View>
        <View style={{flex: 1}}></View>
    </View>;
}
