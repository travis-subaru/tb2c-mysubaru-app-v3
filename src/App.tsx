// TODO: Connect navigator for subsequent screens

import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Dashboard } from './Dashboard';
import { ForgotInfo } from './ForgotInfo';
import { setItem, useItem } from './Local';
import Login from './Login';
import { Palette, useColorSchemeDynamic, useColors } from './MyColors'
import { PINCheck } from './PINCheck';
import { TwoStepVerify } from './TwoStepVerify';

type AppState = 'login' | '2fa' | 'forgot' | 'pin' | 'dashboard' ;

// App Defaults
setItem("appState", "login"); // TODO: Replace with navigation / session data
setItem("environment", "cloudqa");
setItem("language", "en"); // TODO: Infer or load

const App = () => {
    const Colors: Palette = useColors();
    const isDarkMode = useColorSchemeDynamic() === "dark";
    const appState: AppState = useItem("appState");
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
