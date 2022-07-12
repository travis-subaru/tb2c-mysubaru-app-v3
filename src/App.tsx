// TODO: Connect navigator for subsequent screens

import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { setItem, useItem } from './Local';
import Login from './Login';
import { Palette, useColorSchemeDynamic, useColors } from './MyColors';
import { TwoStepVerify } from './TwoStepVerify';

type AppState = 'login' | '2fa';

// App Defaults
setItem("appState", "2fa"); // TODO: Replace with navigation / session data
setItem("language", "en"); // TODO: Infer or load


const App = () => {
    const Colors: Palette = useColors();
    const isDarkMode = useColorSchemeDynamic() === "dark";
    const appState: AppState = useItem("appState");
    const content = (() => {
        switch (appState) {
            case "login": return <Login />;
            case "2fa": return <TwoStepVerify />;
        }
    })();

    return (<SafeAreaView style={{ backgroundColor: Colors.background, flex: 1 }}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        {content}
    </SafeAreaView>);
};

export default App;
