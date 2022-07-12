import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Palette, useColors } from './MyColors';
import { MyAlternateButton, MyPrimaryButton, MyLinkButton } from './MyButton';
import { MyCheckBox } from './MyCheckbox';
import { MyTextErrors, MyTextInput } from './MyTextInput'
import { MyText } from './MyText';
import { net_login } from './NETLogin';
import { useLanguage, Language } from './MyLanguage';

// TODO: MySubaru Logo
// TODO: Helvetica Neue Font Collection
// TODO: Actual app version
// TODO: Environment select
// TODO: Native hooks to password apps

const Login = () => {
    const Colors: Palette = useColors();
    const L: Language = useLanguage();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [formErrors, setFormErrors] = useState([]);

    const [res, setRes] = useState('empty');

    const onPressLogin = async () => {
        var localErrors: MyTextErrors[] = [];
        if (username == "") {
            localErrors.push({ name: "username", description: L.login.loginFormValidateMessages.loginUsername});
        }
        if (password == "") {
            localErrors.push({ name: "password", description: L.login.loginFormValidateMessages.password});
        }
        setFormErrors(localErrors);
        if (localErrors.length == 0) {
            setRes("ok, button");
            const response = await net_login({loginUsername: username, password: password, rememberUserCheck: rememberMe ? "on" : "off"});
            if (response.success && response.dataName == "sessionData") {
                setRes(response.data?.deviceRegistered ? "Device Registered :: Proceed to App" : "Device Not Registered :: Proceed to 2FA");
            } else {
                setRes(JSON.stringify(response));
            }
        }
    };

    return (
        <View style={{ backgroundColor: Colors.background, flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: Colors.copyPrimary, paddingVertical: 40, fontSize: 34}}>// MySUBARU Logo //</Text>
            <MyTextInput name="username" label={L.login.username} errors={formErrors} text={username} onChangeText={text => setUsername(text)} autoCapitalize='none' autoCorrect={false}></MyTextInput>
            <MyTextInput name="password" label={L.login.password} errors={formErrors} text={password} onChangeText={text => setPassword(text)} secureTextEntry={true} usePaddingBottom={false}></MyTextInput>
            <MyCheckBox label={L.login.rememberUsernamePassword} checked={rememberMe} onChangeValue={(value) => setRememberMe(value)}></MyCheckBox>
            <MyPrimaryButton onPress={onPressLogin} style={{width: 350}} title={L.login.logIn}></MyPrimaryButton>
            <MyLinkButton style={{width: 350}} title={L.login.forgotSomething}></MyLinkButton>
            <View style={{ flexGrow:1 }}></View>
            <View>
                <MyText>V. 2.0.0c-longVersion</MyText>
            </View>
            <View style={{width: 350, paddingVertical: 20}}>
                <View style={{flexDirection: 'row', justifyContent: "space-between", alignItems: "center"  }}>
                    <MyAlternateButton title={L.login.demoMode}></MyAlternateButton>
                    <MyAlternateButton title="Need Assistance?\nTap Here to Chat."></MyAlternateButton>
                </View>
            </View>
        </View>
    );
};

export default Login;
