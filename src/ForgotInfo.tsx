import React from 'react';
import { View } from 'react-native';
import { MyText } from './MyText';

export const ForgotInfo = () => {
    return <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
        <MyText>Device Not Registered :: Proceed to 2FA</MyText>
    </View>
}
