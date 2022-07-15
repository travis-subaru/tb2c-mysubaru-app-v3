import React, { useState } from 'react';
import { View } from 'react-native';
import { setItem, useItem } from '../stores/Local';
import { MyLinkButton, MyPrimaryButton, MySecondaryButton } from '../components/MyButton';
import { MyText } from '../components/MyText';
import { Language, useLanguage } from '../components/MyLanguage';
import { MyStyleSheet} from '../components/MyStyles';
import { MyRadioButton } from '../components/MyRadioButton';
import { MyCheckBox } from '../components/MyCheckbox';
import { TwoStepContactInfo, requestTwoStepAuthSendVerification, requestTwoStepAuthVerify } from '../net/TwoStepAuth';
import { MyTextInput } from '../components/MyTextInput';
import { checkVerificationCode } from '../model/VerificationCode';

export interface TwoStepsVerifyProps {
    contact?: TwoStepContactInfo
}


export const TwoStepVerify = (props: TwoStepsVerifyProps) => {
    const i18n: Language = useLanguage();
    const [contactMethod, setContactMethod] = useState(undefined);
    const [verificationCode, setVerificationCode] = useState("");
    const [showCodeEntry, setShowCodeEntry] = useState(false);
    const [rememberDevice, setRememberDevice] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const languageCode = useItem("language"); // TODO: remove useItem call

    const sendCodeRequest = async () => {
        if (!contactMethod) { return }
        const ok = await requestTwoStepAuthSendVerification({contactMethod: contactMethod, verificationCode: verificationCode, languageCode: languageCode});
        setShowCodeEntry(ok);
    };

    const authorizeDevice = async () => {
        if (checkVerificationCode(verificationCode) !== "ok") { return; }
        await requestTwoStepAuthVerify({contactMethod: contactMethod, verificationCode: verificationCode, languageCode: languageCode});
    };

    const validateVerificationCode = (): string[] => {
        const result = checkVerificationCode(verificationCode);
        switch (result) {
            case "blank": return [i18n.twoStepAuthentication.twoStepAuthenticationValidation.verificationCode.required];
            case "partial": return []; // ????: Add error message
            case "tooLong": return [i18n.twoStepAuthentication.twoStepAuthenticationValidation.verificationCode.maxlength];
            case "ok": return [];
        }
    }

    if (!showCodeEntry) {
        return <View style={MyStyleSheet.screenOuter}>
            <View style={MyStyleSheet.fauxNavBar}>
                <MyLinkButton onPress={() => setItem("appState", "login")} title= "< Login"></MyLinkButton>
                <MyText>{i18n.twoStepAuthentication.twoStepHeader}</MyText>
                <MyLinkButton title= " "></MyLinkButton>
            </View>
            <View style={[MyStyleSheet.screenInner, {alignItems: 'flex-start'}]}>

                <MyText style={MyStyleSheet.boldCopyText}>{i18n.twoStepAuthentication.chooseContactMethod}</MyText>
                <MyRadioButton label={i18n.common.text + " " + props.contact?.phone} value="text" selected={contactMethod} onChangeValue={(value) => setContactMethod(value)}></MyRadioButton>
                <MyRadioButton label={i18n.common.email + " " + props.contact?.userName} value="email" selected={contactMethod} onChangeValue={(value) => setContactMethod(value)}></MyRadioButton>
                <MyPrimaryButton onPress={sendCodeRequest} style={{ width: 350 }} title={i18n.common.next}></MyPrimaryButton>
                <MyText style={[MyStyleSheet.boldCopyText, { paddingTop: 10 }]}>{i18n.twoStepAuthentication.dontRecognize}</MyText>
                <MyText>{i18n.twoStepAuthentication.pleaseVerify}</MyText>
                <View style={{ flexGrow: 1 }}></View>
                <MyLinkButton onPress={() => setShowTerms(!showTerms)} title={i18n.twoStepAuthentication.termsToggle}></MyLinkButton>
                <MyText>{showTerms ? i18n.forgotPasswordContactsPanel.termsConditions + '\n' : ''}</MyText>
            </View>

        </View>
    } else {
        return <View style={MyStyleSheet.screenOuter}>
            <View style={MyStyleSheet.fauxNavBar}>
                <MyLinkButton onPress={() => setShowCodeEntry(false)} title= "< Contact"></MyLinkButton>
                <MyText>{i18n.twoStepAuthentication.twoStepHeader}</MyText>
                <MyLinkButton title= ""></MyLinkButton>
            </View>
            <View style={[MyStyleSheet.screenInner, {alignItems: 'flex-start'}]}>
                <MyText style={MyStyleSheet.boldCopyText}>{i18n.twoStepAuthentication.verifyInputTitle}</MyText>
                <MyText>{i18n.twoStepAuthentication.verifyInputSubTitle}</MyText>
                <View style={{paddingTop: 10}}>
                    <MyTextInput label={i18n.twoStepAuthentication.verificationCodeLabel} onChangeText={text => setVerificationCode(text)} validate={validateVerificationCode}>{verificationCode}</MyTextInput>
                </View>
                <MyCheckBox label={i18n.twoStepAuthentication.rememberDevice} checked={rememberDevice} onChangeValue={(value) => setRememberDevice(value)}></MyCheckBox>
                <MyText>{i18n.twoStepAuthentication.rememberHelperText}</MyText>
                <View style={{paddingTop: 10}}>
                    <MyPrimaryButton style={{ width: 350 }} onPress={authorizeDevice} title={i18n.twoStepAuthentication.authorizeDevice}></MyPrimaryButton>
                </View>
                <View style={{paddingTop: 10}}>
                    <MySecondaryButton style={{ width: 350 }} onPress={sendCodeRequest} title={i18n.twoStepAuthentication.resend}></MySecondaryButton>
                </View>
            </View>
        </View>
    }

}
