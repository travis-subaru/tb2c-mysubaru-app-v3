import React, { useState } from 'react';
import { View } from 'react-native';
import { setItem, useItem } from '../stores/Local';
import { MyLinkButton, MyPrimaryButton } from '../components/MyButton';
import { Palette, useColors } from '../components/MyColors';
import { validateEmail } from '../model/Email';
import { Language, useLanguage } from '../components/MyLanguage';
import { MyStyles } from '../components/MyStyles';
import { MyText } from '../components/MyText';
import { MyTextErrors, MyTextInput } from '../components/MyTextInput';
import { validateVIN } from '../model/VIN';
import { requestVINVerify } from '../net/VINVerify';

export const ForgotInfo = () => {
    const L: Language = useLanguage();
    const C: Palette = useColors();
    const [username, setUsername] = useState("");
    const [VIN, setVIN] = useState(""); // 4S3BMAA66D1038385
    const invalidVINs: string[] = useItem("invalidVINs");

    const checkForAccount = async () => {
        const vinOk = await requestVINVerify(VIN);
        if (!vinOk) { return }
        const accounts = [];
    }
    const [actionButton, formErrors] = (() => {
        let button = <MyPrimaryButton title="Enter Email or VIN" style={{ width: 350, backgroundColor: C.copySecondary }}></MyPrimaryButton>;
        let errors: MyTextErrors[] = [];
        if (username != "") {
            if (validateEmail(username) === "ok") {
                button = <MyPrimaryButton title="Reset Password" style={{ width: 350 }}></MyPrimaryButton>;
            } else {
                errors.push({name: "username", description: L.validation.email });
            }
        }
        if (VIN != "") {
            switch (validateVIN(VIN)) {
                case "ok": {
                    button = <MyPrimaryButton onPress={checkForAccount} title="Check for Account" style={{ width: 350 }}></MyPrimaryButton>;
                    break;
                }
                case "length": {
                    errors.push({name: "vin", description: L.forgotSomethingPanel.forgotUsernameFormValidateMessages.vin.maxlength });
                    break;
                }
                case "checkdigit": {
                    errors.push({name: "vin", description: L.validation.vinUS1 });
                    break;
                }
            }
        }
        if (invalidVINs.includes(VIN)) {
            // ????: Is this the right message?
            errors.push({name: "vin", description: L.forgotSomethingPanel.forgotUsernameFormValidateMessages.vin.remote });
        }
        return [button, errors];
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
            <MyText>{L.forgotUsernamePanel.vinDescription}</MyText>
        </View>

    </View>
}
