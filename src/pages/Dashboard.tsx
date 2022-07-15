import React from 'react';
import { View } from 'react-native';
import { setItem } from '../stores/Local';
import { MyLinkButton } from '../components/MyButton';
import { MyText } from '../components/MyText';
import { setSession } from '../stores/Session';
import { MyStyleSheet } from '../components/MyStyles';

// TODO: Dashboard

export const Dashboard = () => {
    const logout = () => {
        setItem("appState", "login");
        setSession(undefined);
    }

    return <View style={MyStyleSheet.screen}>
        <MyLinkButton onPress={logout} title= "< Login"></MyLinkButton>
        <MyText>Device Registered :: Proceed to App</MyText>
    </View>
}
