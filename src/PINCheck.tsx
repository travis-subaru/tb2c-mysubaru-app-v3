import React from 'react';
import { View } from 'react-native';
import { MyText } from './MyText';

// TODO: PIN Check

export const PINCheck = () => {
    return <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
        <MyText>Check or Set PIN</MyText>
    </View>
}
