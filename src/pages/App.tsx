// TODO: Connect navigator for subsequent screens

import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Dashboard } from './Dashboard';
import { ForgotInfo } from './ForgotInfo';
import { setInitialValue, useItem } from '../stores/Local';
import Login from './Login';
import { Palette, useColorSchemeDynamic, useColors } from '../components/MyColors'
import { PINCheck } from './PINCheck';
import { TwoStepVerify } from './TwoStepVerify';
import { SessionData, useSession } from '../stores/Session';

type AppState = 'login' | '2fa' | 'forgot' | 'pin' | 'dashboard' ;

// App Defaults
setInitialValue("appState", "login"); // TODO: Replace with navigation / session data
setInitialValue("environment", "cloudqa");
setInitialValue("invalidVINs", []);
setInitialValue("language", "en"); // TODO: Infer or load

const App = () => {
    const Colors: Palette = useColors();
    const isDarkMode = useColorSchemeDynamic() === "dark";
    const appState: AppState = useItem("appState");
    const session: SessionData = useSession();
    const content = (() => {
        switch (appState) {
            case "login": return <Login />;
            case "2fa": return <TwoStepVerify />;
            case "forgot": return <ForgotInfo />;
            case "pin": return <PINCheck />;
            case "dashboard": return <Dashboard />;
        }
    })();

    return (<SafeAreaView key={appState} style={{ backgroundColor: Colors.background, flex: 1 }}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        {content}
    </SafeAreaView>);
};

export default App;
