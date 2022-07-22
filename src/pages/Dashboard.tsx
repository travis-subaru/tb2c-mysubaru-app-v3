import React, { useState } from 'react';
import { View } from 'react-native';
import { MySecondaryDashboardButton, MyLinkButton, MyPrimaryButton, MyPrimaryDashboardButton, MyDashboardLinkButton, MyButtonProps } from '../components/MyButton';
import { MyText } from '../components/MyText';
import { logout, Session, setSession, useSession } from '../stores/Session';
import { MyStyleSheet } from '../components/MyStyles';
import { Palette, staticWhite, useColors } from '../components/MyColors';
import { Language, useLanguage } from '../components/MyLanguage';
import { MySimpleNavBar, MySimpleNavButtonBarItem } from '../components/MySimpleNavBar';
import { MyAppIcon, MyAppIconGlyph } from '../components/MyAppIcon';
import { executeRemoteStart, executeRemoteStop } from '../net/EngineStartStop';
import { useNetworkActivity } from '../stores/Response';
import { MySnackBar } from '../components/MySnackBar';
import { withPINCheck } from './PINCheck';
import { MyPressable } from '../components/MyPressable';
import { HomeTab } from './HomeTab';
import { AlertsTab } from './AlertsTab';
import { OffersTab } from './OffersTab';
import { SettingsTab } from './SettingsTab';
import { VehicleTab } from './VehicleTab';

// TODO: Tab Bar
// TODO: Cancel all commands on logout

export type DashboardTab = 'home' | 'vehicle' | 'offers' | 'alerts' | 'settings'

export interface DashboardTabBarButtonProps {
    title?: string
    glyph?: MyAppIconGlyph
    onPress?: () => void
    isActive: boolean
}

const DashboardTabBarButton = (props: DashboardTabBarButtonProps) => {
    const C: Palette = useColors();
    const color = props.isActive ? C.buttonPrimary : C.copySecondary;
    return <MyPressable style={{ minWidth: '100%', maxWidth: '20%', width: '100%', flexDirection: 'column' }} {...props}>
        {props.glyph ? <MyAppIcon glyph={props.glyph} style={{ color: color }}></MyAppIcon> : null}
        <MyText style={{ color: color, fontFamily: 'Helvetica Neue', fontSize: 10 }}>{props.title}</MyText>
    </MyPressable>;
}

export const Dashboard = () => {
    const i18n: Language = useLanguage();
    const C: Palette = useColors();
    const session: Session = useSession();
    const [engineStatus, setEngineStatus] = useState(false); // TODO: Listen on VehicleStatus channel
    const [activity, setActivity] = useNetworkActivity();
    const [tab, setTab] = useState<DashboardTab>('home');
    const vehicle = session?.vehicles[session?.currentVehicleIndex];
    const rowStyle = { flexDirection: 'row', flexWrap: 1, justifyContent: 'space-evenly', paddingTop: 10, paddingHorizontal: 20, width: '100%' };
    const onLogout = () => {
        logout();
    };
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
    return <View style={{ flex: 1, alignItems: 'center', justifyContent:'center' }}>
        <MySimpleNavBar style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <MySimpleNavButtonBarItem style={{flexDirection: 'row', justifyContent: 'flex-start'}} onPress={onLogout} title= "Logout"></MySimpleNavButtonBarItem>
            <MyText>Home</MyText>
            <MySimpleNavButtonBarItem style={{flexDirection: 'row', justifyContent: 'flex-end'}} onPress={onLogout} title= "Vehicles"></MySimpleNavButtonBarItem>
        </MySimpleNavBar>
        <View style={{ flex: 1, alignItems: 'center', justifyContent:'flex-start' }}>
            {(() => { return (
                tab === 'home' ? <HomeTab /> :
                tab === 'alerts' ? <AlertsTab /> :
                tab === 'offers' ? <OffersTab /> :
                tab === 'settings' ? <SettingsTab /> :
                tab === 'vehicle' ? <VehicleTab /> :
                undefined
            )})()}
            <MySnackBar activity={activity} style={{}} onClose={() => setActivity(null)}></MySnackBar>
            <View style={{ backgroundColor: C.backgroundSecondary, flexDirection: 'row', height: 50 }}>
                <DashboardTabBarButton glyph="home" title="Home" isActive={tab === 'home'} onPress={() => setTab('home')} />
                <DashboardTabBarButton glyph="frontCar" title="Vehicles" isActive={tab === 'vehicle'} onPress={() => setTab('vehicle')} />
                <DashboardTabBarButton glyph="shoppingCart" title="Offers" isActive={tab === 'offers'} onPress={() => setTab('offers')} />
                <DashboardTabBarButton glyph="alertInfo" title="Alerts" isActive={tab === 'alerts'} onPress={() => setTab('alerts')} />
                <DashboardTabBarButton glyph="gear" title="Settings" isActive={tab === 'settings'} onPress={() => setTab('settings')} />
            </View>
        </View>
    </View>
}
