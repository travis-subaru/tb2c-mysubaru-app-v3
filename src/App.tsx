// TODO: Connect navigator for subsequent screens

import React from 'react';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
import Login from './Login';
import { Palette, useColorSchemeDynamic, useColors } from './MyColors';



 const App = () => {
   const C: Palette = useColors();
   const isDarkMode = useColorSchemeDynamic() === "dark";

   const backgroundStyle = { backgroundColor: C.background, flex: 1};

   // TODO: Adding safe area breaks login spacer
   return (<SafeAreaView style={backgroundStyle}>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <Login />
        </ScrollView>
    </SafeAreaView>);
};

export default App;
