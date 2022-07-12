import React, { useState } from 'react';
import { View } from 'react-native';
import { setItem } from './Local';
import { MyLinkButton, MyPrimaryButton } from './MyButton';
import { Palette, useColors } from './MyColors';
import { Language, useLanguage } from './MyLanguage';
import { MyStyles } from './MyStyles';
import { MyText } from './MyText';
import { MyTextInput } from './MyTextInput';

export const ForgotInfo = () => {
    const L: Language = useLanguage();
    const C: Palette = useColors();
    const [username, setUsername] = useState("");
    const [VIN, setVIN] = useState("");
    const [formErrors, setFormErrors] = useState([]); // TODO: Username / VIN validator
    const actionButton = (() => {
        if (username != "") {
            return <MyPrimaryButton title="Reset Password" style={{ width: 350 }}></MyPrimaryButton>
        }
        if (VIN != "") {
            return <MyPrimaryButton title="Check for Account" style={{ width: 350 }}></MyPrimaryButton>
        }
        return <MyPrimaryButton title="Enter Email or VIN" style={{ width: 350, backgroundColor: C.copySecondary }}></MyPrimaryButton>
    })();

    return <View style={{flex: 1, alignItems: 'center', justifyContent:'flex-start'}}>
        <MyLinkButton onPress={() => setItem("appState", "login")} title= "< Login"></MyLinkButton>
        <View style={{ paddingBottom: 10, alignItems: 'center' }}>
            <MyText style={MyStyles.headlineText}>Forgot Something?</MyText>
            <MyText>It happens sometimes.\nTell us what you can remember,\nand we'll look you up in our system.</MyText>
        </View>
        <MyTextInput name="username" label={L.login.username} errors={formErrors} text={username} onChangeText={text => setUsername(text)} autoCapitalize='none' autoCorrect={false}></MyTextInput>
        <MyTextInput name="vin" label={L.common.vin} errors={formErrors} text={VIN} onChangeText={text => setVIN(text)} autoCapitalize='none' autoCorrect={false}></MyTextInput>
        {actionButton}
        <View style={{ padding: 20, width: 350}}>
            <MyText style={MyStyles.boldCopyText}>What is my username?</MyText>
            <MyText style={{ paddingBottom: 10 }}>Your username is the primary email address on your account.</MyText>
            <MyText style={MyStyles.boldCopyText}>How do I find my VIN?</MyText>
            <MyText>Your VIN is the 17-character vehicle identification number that can be found on your vehicle registration, insurance card, or by looking through the windshield on the driver's side of the dashboard, or on a plate inside the doorjamb.</MyText>
        </View>

    </View>
}
