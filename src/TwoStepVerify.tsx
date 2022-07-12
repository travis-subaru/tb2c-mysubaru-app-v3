import React from 'react';
import { View } from 'react-native';
import { MyText } from './MyText';

// TODO: TwoStepVerify

export const TwoStepVerify = () => {
    return <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
        <MyText>Device Not Registered :: Proceed to 2FA</MyText>
    </View>
}
