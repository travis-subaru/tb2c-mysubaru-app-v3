import React from 'react';
import { View } from 'react-native';
import { setItem } from '../stores/Local';
import { MyLinkButton } from '../components/MyButton';
import { MyText } from '../components/MyText';

// TODO: Dashboard

export const Dashboard = () => {
    return <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
        <MyLinkButton onPress={() => setItem("appState", "login")} title= "< Login"></MyLinkButton>
        <MyText>Device Registered :: Proceed to App</MyText>
    </View>
}
