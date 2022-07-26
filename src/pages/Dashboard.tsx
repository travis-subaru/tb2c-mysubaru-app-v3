import React, { useState } from 'react';
import { View } from 'react-native';
import { MyText } from '../components/MyText';
import { Palette, useColors } from '../components/MyColors';
import { Language, useLanguage } from '../model/Language';
import { MyAppIcon, MyAppIconGlyph } from '../components/MyAppIcon';
import { useNetworkActivity } from '../stores/Response';
import { MyNetworkSnackBar } from '../components/MySnackBar';
import { MyPressable } from '../components/MyPressable';
import { HomeTab } from './HomeTab';
import { AlertsTab } from './AlertsTab';
import { OffersTab } from './OffersTab';
import { SettingsTab } from './SettingsTab';
import { VehicleTab } from './VehicleTab';

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
    const [tab, setTab] = useState<DashboardTab>('home');
    return <View style={{ flex: 1, alignItems: 'center', justifyContent:'center' }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent:'flex-start' }}>
            {(() => { return (
                tab === 'home' ? <HomeTab /> :
                tab === 'alerts' ? <AlertsTab /> :
                tab === 'offers' ? <OffersTab /> :
                tab === 'settings' ? <SettingsTab /> :
                tab === 'vehicle' ? <VehicleTab /> :
                undefined
            )})()}
            <MyNetworkSnackBar></MyNetworkSnackBar>
            <View style={{ backgroundColor: C.backgroundSecondary, alignItems: 'center', flexDirection: 'row', height: 50 }}>
                <DashboardTabBarButton glyph="home" title="Home" isActive={tab === 'home'} onPress={() => setTab('home')} />
                <DashboardTabBarButton glyph="frontCar" title="Vehicles" isActive={tab === 'vehicle'} onPress={() => setTab('vehicle')} />
                <DashboardTabBarButton glyph="myRetailer" title="Offers" isActive={tab === 'offers'} onPress={() => setTab('offers')} />
                <DashboardTabBarButton glyph="alertInfo" title="Alerts" isActive={tab === 'alerts'} onPress={() => setTab('alerts')} />
                <DashboardTabBarButton glyph="gear" title={i18n.appSettings.title} isActive={tab === 'settings'} onPress={() => setTab('settings')} />
            </View>
        </View>
    </View>
}
