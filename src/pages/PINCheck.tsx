import React from 'react';
import { View } from 'react-native';
import { MyStyleSheet } from '../components/MyStyles';
import { MyText } from '../components/MyText';

// TODO: PIN Check

export const PINCheck = () => {
    return <View style={MyStyleSheet.screen}>
        <MyText>Check or Set PIN</MyText>
    </View>
}
