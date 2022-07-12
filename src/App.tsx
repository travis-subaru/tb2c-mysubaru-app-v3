// TODO: Connect navigator for subsequent screens

import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import Login from './Login';
import { Palette, useColorSchemeDynamic, useColors } from './MyColors';



 const App = () => {
   const Colors: Palette = useColors();
   const isDarkMode = useColorSchemeDynamic() === "dark";

   return (<SafeAreaView style={{ backgroundColor: Colors.background, flex: 1 }}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Login />
    </SafeAreaView>);
};

export default App;
