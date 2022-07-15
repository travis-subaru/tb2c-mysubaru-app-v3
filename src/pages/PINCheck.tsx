import React from 'react';
import { View } from 'react-native';
import { MyStyleSheet } from '../components/MyStyles';
import { MyText } from '../components/MyText';

// TODO: PIN Check

export const PINCheck = () => {
    return <View style={MyStyleSheet.screenOuter}>
        <View style={MyStyleSheet.fauxNavBar}>

        </View>
        <View style={MyStyleSheet.screenInner}>
            <MyText>Check or Set PIN</MyText>
        </View>
    </View>
}
