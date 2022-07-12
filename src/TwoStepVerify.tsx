import React from 'react';
import { View } from 'react-native';
import { setItem } from './Local';
import { MyLinkButton } from './MyButton';
import { MyText } from './MyText';

// TODO: TwoStepVerify

export const TwoStepVerify = () => {
    return <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
        <MyLinkButton onPress={() => setItem("appState", "login")} title= "< Login"></MyLinkButton>
        <MyText>Device Not Registered :: Proceed to 2FA</MyText>
    </View>
}
