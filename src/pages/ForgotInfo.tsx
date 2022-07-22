import React, { useState } from 'react';
import { View } from 'react-native';
import { setItem, useItem } from '../stores/Local';
import { MyPrimaryButton } from '../components/MyButton';
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
import { useNetworkActivity } from '../stores/Response';
import { MySnackBar } from '../components/MySnackBar';
import { descriptionForCode, Error } from '../model/Code';

interface ForgotPasswordStateInitial { type: "initial" }
interface ForgotPasswordStateAccountsFound { type: "accountsFound"; accounts: string[] }
type ForgotPasswordState = ForgotPasswordStateInitial | ForgotPasswordStateAccountsFound | Error

const initialState: ForgotPasswordStateInitial = { type: "initial" };

export const ForgotInfo = () => {
    const i18n: Language = useLanguage();
    const C: Palette = useColors();
    const [username, setUsername] = useState(""); // mysubaruwatch@yahoo.com
    const [VIN, setVIN] = useState(""); // 4S3BMAA66D1038385
    const [state, setState] = useState<ForgotPasswordState>(initialState);
    const [activity, setActivity] = useNetworkActivity();
    const resetPassword = async () => {
        setState(initialState);
        // TODO: Reset Password calls
        setActivity(null);
    }
    const checkForAccount = async () => {
        setState(initialState);
        const vinOk = await requestVINVerify(VIN);
        if (vinOk) {
            const accounts = await requestForgotUsername(VIN);
            if (accounts.success && accounts.data.length > 0) {
                setState({type: "accountsFound", accounts: accounts.data})
            } else {
                setState({type: "error", code: "VINLookupFailed"});
            }
        } else {
            setState({type: "error", code: "VINLookupFailed"});
        }
        setActivity(null);
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
        if (username != "") {
            if (checkEmail(username) === "ok") {
                button = <MyPrimaryButton onPress={resetPassword} title="Reset Password" style={{ width: 350 }}></MyPrimaryButton>;
            } else {
                errors.push({name: "username", description: i18n.validation.email });
            }
        }
        return [button, errors];
    })();
    const resultPanel = ((state: ForgotPasswordState) => {
        switch (state.type) {
            case "initial":
                return (<View style={{ padding: 20, width: 350}}>
                    <MyText style={MyStyleSheet.boldCopyText}>What is my username?</MyText>
                    <MyText style={{ paddingBottom: 10 }}>Your username is the primary email address on your account.</MyText>
                    <MyText style={MyStyleSheet.boldCopyText}>How do I find my VIN?</MyText>
                    <MyText>{i18n.forgotUsernamePanel.vinDescription}</MyText>
                </View>);
            case "accountsFound":
                return (<View style={{ paddingVertical: 10, width: 350 }}>
                    <View style={[MyStyleSheet.roundedEdge, { padding: 10, backgroundColor: C.success }]}>
                        <MyText style={[ MyStyleSheet.boldCopyText, { color: staticWhite }]}>{i18n.forgotUsernameSuccessPanel.pageDescription}</MyText>
                        <MyText style={{ color: staticWhite, paddingVertical: 10 }}>{state.accounts.join("\n")}</MyText>
                        <MyText style={{ color: staticWhite }}>{i18n.forgotUsernameSuccessPanel.pageDescription2}</MyText>
                        <MyText style={[MyStyleSheet.boldCopyText, { color: staticWhite, paddingTop: 5 }]}>{i18n.modernizationNew.contactPhone}</MyText>
                    </View>
                </View>);
            case "error":
                return (<View style={{ paddingVertical: 10, width: 350 }}>
                    <View style={[MyStyleSheet.roundedEdge, { padding: 10, backgroundColor: C.error }]}>
                        <MyText style={{ color: staticWhite }}>{descriptionForCode(state, i18n)}</MyText>
                    </View>
                </View>);
        }
    })(state);
    return <View style={{ flex: 1, alignItems: 'center', justifyContent:'center' }}>
        <MySimpleNavBar>
            <MySimpleNavButtonBarItem onPress={() => setItem("appState", "login")} title= "< Login"></MySimpleNavButtonBarItem>
            <MyText style={MyStyleSheet.boldCopyText}>Forgot Something?</MyText>
        </MySimpleNavBar>
        <View style={{ flex: 1, alignItems: 'center', justifyContent:'flex-start', paddingHorizontal: 20 }}>
            <View style={{ paddingBottom: 10, alignItems: 'center' }}>
                <MyText>It happens sometimes.\nTell us what you can remember,\nand we'll look you up in our system.</MyText>
            </View>
            <MyTextInput name="username" label={i18n.login.username} errors={formErrors} text={username} onChangeText={text => setUsername(text)} autoCapitalize='none' autoCorrect={false} style={MyStyleSheet.paddingTextInputBottom}></MyTextInput>
            <MyTextInput name="vin" label={i18n.common.vin} errors={formErrors} text={VIN} onChangeText={text => setVIN(text)} autoCapitalize='none' autoCorrect={false} style={MyStyleSheet.paddingTextInputBottom}></MyTextInput>
            {actionButton}
            {resultPanel}
            <MySnackBar activity={activity} style={{ marginBottom: 10 }} onClose={() => setActivity(null)}></MySnackBar>
        </View>
    </View>
}
