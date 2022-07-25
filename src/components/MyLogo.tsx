import React from 'react';
import { Image, View } from 'react-native';
import { MyAppIcon } from './MyAppIcon';
import { useColorSchemeDynamic } from './MyColors';

/** MySubaru logo */
export const MyLogo = () => {
    const isDarkMode = useColorSchemeDynamic() === 'dark';
    const source = isDarkMode ? require("../../assets/images/mysubaru-logo-white.png") : require("../../assets/images/mysubaru-logo-black.png");
    return <View style={{ justifyContent: "center", height: 60 }}>
        <Image style={{ width: 120, height: 41 }} source={source}></Image>
    </View>;
}
