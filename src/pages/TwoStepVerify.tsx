import React, { useState } from 'react';
import { View } from 'react-native';
import { setItem, useItem } from '../stores/Local';
import { MyLinkButton, MyPrimaryButton, MySecondaryButton } from '../components/MyButton';
import { MyText } from '../components/MyText';
import { Language, useLanguage } from '../components/MyLanguage';
import { MyStyles } from '../components/MyStyles';
import { MyRadioButton } from '../components/MyRadioButton';
import { MyCheckBox } from '../components/MyCheckbox';
import { TwoStepContactInfo } from '../net/TwoStepAuthContact';
import { requestTwoStepAuthSendVerification } from '../net/TwoStepAuthSendVerification';
import { MyTextInput } from '../components/MyTextInput';

export interface TwoStepsVerifyProps {
    contact?: TwoStepContactInfo
}

    // "twoStepAuthentication": {
     //     "authorizeDevice": "Authorize Device",
    //     "twoStepAuthenticationValidation": {
    //         "verificationCode": {
    //             "required": "Verification Code cannot be blank",
    //             "maxlength": "Verification code must be no more than 6 characters"
    //         }
    //     },

    //     "rememberDevice": "Remember this device",
    //     "rememberHelperText": "I am the only person that will log in to MySubaru with this device.",

    // },

export const TwoStepVerify = (props: TwoStepsVerifyProps) => {
    const i18n: Language = useLanguage();
    const [contactMethod, setContactMethod] = useState(undefined);
    const [verificationCode, setVerificationCode] = useState(undefined);
    const [showCodeEntry, setShowCodeEntry] = useState(false);
    const [rememberDevice, setRememberDevice] = useState(false);
    const languageCode = useItem("language");

    const sendCodeRequest = async () => {
        if (!contactMethod) { return }
        const ok = await requestTwoStepAuthSendVerification({contactMethod: contactMethod, verificationCode: verificationCode, languageCode: languageCode});
        debugger;
        setShowCodeEntry(ok);
    };

    if (!showCodeEntry) {
        return <View style={MyStyles.screen}>
            <MyLinkButton onPress={() => setItem("appState", "login")} title= "< Login"></MyLinkButton>
            <MyText style={MyStyles.headlineText}>{i18n.twoStepAuthentication.twoStepHeader}</MyText>
            <MyText>{i18n.twoStepAuthentication.dontRecognize}</MyText>
            <MyText>{i18n.twoStepAuthentication.pleaseVerify}</MyText>
            <MyText>{i18n.twoStepAuthentication.chooseContactMethod}</MyText>
            <MyRadioButton label={i18n.common.text + " " + props.contact?.phone} value="text" selected={contactMethod} onChangeValue={(value) => setContactMethod(value)}></MyRadioButton>
            <MyRadioButton label={i18n.common.email + " " + props.contact?.userName} value="email" selected={contactMethod} onChangeValue={(value) => setContactMethod(value)}></MyRadioButton>
            <MyPrimaryButton onPress={sendCodeRequest} title={i18n.common.next}></MyPrimaryButton>
            <MyLinkButton title={i18n.twoStepAuthentication.termsToggle}></MyLinkButton>
            <MyText>{i18n.forgotPasswordContactsPanel.termsConditions}</MyText>
        </View>
    } else {
        return <View style={MyStyles.screen}>
            <MyLinkButton onPress={() => setItem("appState", "login")} title= "< Login"></MyLinkButton>
            <MyText style={MyStyles.headlineText}>{i18n.twoStepAuthentication.twoStepHeader}</MyText>
            <MyText>{i18n.twoStepAuthentication.verifyInputTitle}</MyText>
            <MyText>{i18n.twoStepAuthentication.verifyInputSubTitle}</MyText>
            <MyTextInput label={i18n.twoStepAuthentication.verificationCodeLabel} onChangeText={text => setVerificationCode(text)}>{verificationCode}</MyTextInput>
            <MyCheckBox label={i18n.twoStepAuthentication.rememberDevice} checked={rememberDevice} onChangeValue={(value) => setRememberDevice(value)}></MyCheckBox>
            <MyText>{i18n.twoStepAuthentication.rememberHelperText}</MyText>
            <MyPrimaryButton onPress={sendCodeRequest} title={i18n.twoStepAuthentication.authorizeDevice}></MyPrimaryButton>
            <MySecondaryButton onPress={sendCodeRequest} title={i18n.twoStepAuthentication.resend}></MySecondaryButton>
        </View>
    }

}
