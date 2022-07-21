// TODO: Connect navigator for subsequent screens

import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Dashboard } from './Dashboard';
import { ForgotInfo } from './ForgotInfo';
import { AppState, useItem } from '../stores/Local';
import Login from './Login';
import { Palette, useColorSchemeDynamic, useColors } from '../components/MyColors'
import { PINCheck } from './PINCheck';
import { TwoStepVerify } from './TwoStepVerify';
import { Session, useSession } from '../stores/Session';
import { TwoStepContactInfo } from '../net/TwoStepAuth';

const App = () => {
    const Colors: Palette = useColors();
    const isDarkMode = useColorSchemeDynamic() === "dark";
    const appState: AppState = useItem("appState");
    const contactInfo: TwoStepContactInfo = useItem("contactInfo");
    const pinRequested: boolean = useItem('pinRequested');
    const session: Session = useSession();
    const content = (() => {
        debugger;
        if (session === undefined) {
            switch (appState) {
                case "login": return <Login />;
                case "forgot": return <ForgotInfo />;
            }
        } else {
            if (session.deviceRegistered) {
                return <Dashboard />;
            }
            if (contactInfo) {
                return <TwoStepVerify contact={contactInfo} />;
            }
        }
    })();

    return (<>
        <SafeAreaView key={appState} style={{ backgroundColor: Colors.background, flex: 1 }}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            {content}
        </SafeAreaView>
        {pinRequested && <PINCheck/>}
    </>);
};

export default App;
