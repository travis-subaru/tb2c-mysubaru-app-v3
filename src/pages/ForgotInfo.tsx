import React, { useState } from 'react';
import { View } from 'react-native';
import { setItem, useItem } from '../stores/Local';
import { MyLinkButton, MyPrimaryButton } from '../components/MyButton';
import { Palette, staticWhite, useColors } from '../components/MyColors';
import { checkEmail } from '../model/Email';
import { Language, useLanguage } from '../components/MyLanguage';
import { MyStyleSheet } from '../components/MyStyles';
import { MyText } from '../components/MyText';
import { MyTextErrors, MyTextInput } from '../components/MyTextInput';
import { checkVIN } from '../model/VIN';
import { requestVINVerify } from '../net/VINVerify';
import { requestForgotUsername } from '../net/ForgotUsername';
import { MySimpleNavBar, MySimpleNavButtonBarItem } from '../components/MySimpleNavBar';


export const ForgotInfo = () => {
    const i18n: Language = useLanguage();
    const C: Palette = useColors();
    const [username, setUsername] = useState(""); // mysubaruwatch@yahoo.com
    const [VIN, setVIN] = useState(""); // 4S3BMAA66D1038385
    const invalidVINs: string[] = useItem("invalidVINs");
    const [foundAccounts, setFoundAccounts] = useState([]);
    const checkForAccount = async () => {
        const vinOk = await requestVINVerify(VIN);
        if (!vinOk) { return }
        const accounts = await requestForgotUsername(VIN);
        if (accounts.length > 0) {
            setFoundAccounts(accounts);
        } else {
            // TODO
        }
    }
    const [actionButton, formErrors] = (() => {
        let button = <MyPrimaryButton title="Enter Email or VIN" style={{ width: 350, backgroundColor: C.copySecondary }}></MyPrimaryButton>;
        let errors: MyTextErrors[] = [];
        if (VIN != "") {
            switch (checkVIN(VIN)) {
                case "ok": {
                    button = <MyPrimaryButton onPress={checkForAccount} title="Check for Account" style={{ width: 350 }}></MyPrimaryButton>;
                    break;
                }
                case "length": {
                    errors.push({name: "vin", description: i18n.forgotSomethingPanel.forgotUsernameFormValidateMessages.vin.maxlength });
                    break;
                }
                case "checkdigit": {
                    errors.push({name: "vin", description: i18n.validation.vinUS1 });
                    break;
                }
            }
        }
        if (invalidVINs.includes(VIN)) {
            // ????: Is this the right message?
            errors.push({name: "vin", description: i18n.forgotSomethingPanel.forgotUsernameFormValidateMessages.vin.remote });
        }
        if (username != "") {
            if (checkEmail(username) === "ok") {
                button = <MyPrimaryButton title="Reset Password" style={{ width: 350 }}></MyPrimaryButton>;
            } else {
                errors.push({name: "username", description: i18n.validation.email });
            }
        }
        return [button, errors];
    })();
    const resultPanel = (() => {
        if (foundAccounts.length > 0) {
            return (<View style={{ paddingVertical: 10, width: 350 }}>
                <View style={[MyStyleSheet.roundedEdge, { padding: 10, backgroundColor: C.success, borderColor: C.success, borderWidth: 1}]}>
                    <MyText style={[ MyStyleSheet.boldCopyText, { color: staticWhite }]}>{i18n.forgotUsernameSuccessPanel.pageDescription}</MyText>
                    <MyText style={{ color: staticWhite, paddingVertical: 10 }}>{foundAccounts.join("\n")}</MyText>
                    <MyText style={{ color: staticWhite }}>{i18n.forgotUsernameSuccessPanel.pageDescription2}</MyText>
                    <MyText style={[MyStyleSheet.boldCopyText, { color: staticWhite, paddingTop: 5 }]}>{i18n.modernizationNew.contactPhone}</MyText>
                </View>
            </View>);
        } else {
            return (<View style={{ padding: 20, width: 350}}>
                <MyText style={MyStyleSheet.boldCopyText}>What is my username?</MyText>
                <MyText style={{ paddingBottom: 10 }}>Your username is the primary email address on your account.</MyText>
                <MyText style={MyStyleSheet.boldCopyText}>How do I find my VIN?</MyText>
                <MyText>{i18n.forgotUsernamePanel.vinDescription}</MyText>
            </View>);
        }
    })();
    return <View style={MyStyleSheet.screenOuter}>
        <MySimpleNavBar>
            <MySimpleNavButtonBarItem onPress={() => setItem("appState", "login")} title= "< Login"></MySimpleNavButtonBarItem>
            <MyText style={MyStyleSheet.fauxNavTitle}>Forgot Something?</MyText>
        </MySimpleNavBar>
        <View style={MyStyleSheet.screenInner}>
            <View style={{ paddingBottom: 10, alignItems: 'center' }}>
                <MyText>It happens sometimes.\nTell us what you can remember,\nand we'll look you up in our system.</MyText>
            </View>
            <MyTextInput name="username" label={i18n.login.username} errors={formErrors} text={username} onChangeText={text => setUsername(text)} autoCapitalize='none' autoCorrect={false}></MyTextInput>
            <MyTextInput name="vin" label={i18n.common.vin} errors={formErrors} text={VIN} onChangeText={text => setVIN(text)} autoCapitalize='none' autoCorrect={false}></MyTextInput>
            {actionButton}
            {resultPanel}
        </View>
    </View>
}
