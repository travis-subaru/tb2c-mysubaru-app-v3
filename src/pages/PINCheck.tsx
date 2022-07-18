import React from 'react';
import { View } from 'react-native';
import { MySimpleNavBar } from '../components/MySimpleNavBar';
import { MyStyleSheet } from '../components/MyStyles';
import { MyText } from '../components/MyText';

// TODO: PIN Check

export const PINCheck = () => {
    return <View style={MyStyleSheet.screenOuter}>
        <MySimpleNavBar>

        </MySimpleNavBar>
        <View style={MyStyleSheet.screenInner}>
            <MyText>Check or Set PIN</MyText>
        </View>
    </View>
}
