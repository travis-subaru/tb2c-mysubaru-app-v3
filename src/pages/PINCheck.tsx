import React from 'react';
import { View } from 'react-native';
import { MyStyles } from '../components/MyStyles';
import { MyText } from '../components/MyText';

// TODO: PIN Check

export const PINCheck = () => {
    return <View style={MyStyles.screen}>
        <MyText>Check or Set PIN</MyText>
    </View>
}
