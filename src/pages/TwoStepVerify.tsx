import React, { useState } from 'react';
import { View } from 'react-native';
import { setItem } from '../stores/Local';
import { MyLinkButton, MyPrimaryButton } from '../components/MyButton';
import { MyText } from '../components/MyText';
import { Language, useLanguage } from '../components/MyLanguage';
import { MyStyles } from '../components/MyStyles';
import { MyRadioButton } from '../components/MyRadioButton';
import { TwoStepContactInfo } from '../net/TwoStepAuthContracts';

export interface TwoStepsVerifyProps {
    contact: TwoStepContactInfo
}

export const TwoStepVerify = (props: TwoStepsVerifyProps) => {
    const i18n: Language = useLanguage();
    const [contactMethod, setContactMethod] = useState(undefined);
    return <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
        <MyLinkButton onPress={() => setItem("appState", "login")} title= "< Login"></MyLinkButton>
        <MyText style={MyStyles.headlineText}>{i18n.twoStepAuthentication.twoStepHeader}</MyText>
        <MyText>{i18n.twoStepAuthentication.dontRecognize}</MyText>
        <MyText>{i18n.twoStepAuthentication.pleaseVerify}</MyText>
        <MyText>{i18n.twoStepAuthentication.chooseContactMethod}</MyText>
        <MyRadioButton label={i18n.common.text} value="text" selected={contactMethod} onChangeValue={(value) => setContactMethod(value)}></MyRadioButton>
        <MyRadioButton label={i18n.common.email} value="email" selected={contactMethod} onChangeValue={(value) => setContactMethod(value)}></MyRadioButton>
        <MyPrimaryButton title={i18n.common.next}></MyPrimaryButton>
        <MyLinkButton title={i18n.twoStepAuthentication.termsToggle}></MyLinkButton>
        <MyText>{i18n.forgotPasswordContactsPanel.termsConditions}</MyText>
    </View>
}
