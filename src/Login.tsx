import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Palette, staticWhite, useColors } from './MyColors';
import { MyAlternateButton, MyPrimaryButton, MyLinkButton } from './MyButton';
import { MyCheckBox } from './MyCheckbox';
import { MyTextErrors, MyTextInput } from './MyTextInput'
import { MyText } from './MyText';
import { net_login } from './NETLogin';
import { useLanguage, Language } from './MyLanguage';
import { setItem } from './Local';
import { MyStyles } from './MyStyles';

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
    const [active, setActive] = useState(false);

    const loading = (() => {
        if (!active) { return; }
        return (<View key="loading" style={[MyStyles.roundedEdge, { backgroundColor: Colors.copySecondary, justifyContent: "center", alignItems: "center", width: 350, padding: 20 }]}>
            <MyText  style={{ color: staticWhite }}>Show Login Progress</MyText>
        </View>);
    })();

    const otherErrors = (() => {
        const otherErrors = formErrors.filter(e => e.name != "username" && e.name != "password");
        if (otherErrors.length == 0) { return; }
        return (<View key="error" style={[MyStyles.roundedEdge, { backgroundColor: Colors.error, justifyContent: "center", alignItems: "center", width: 350, padding: 20 }]}>
            {otherErrors.map((e, i) => <MyText key={i} style={{ color: staticWhite }}>{e.description}</MyText>)}
        </View>);
    })()

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
            setActive(true);
            const response = await net_login({loginUsername: username, password: password, rememberUserCheck: rememberMe ? "on" : "off"});
            setActive(false);
            if (response.success && response.dataName == "sessionData") {
                if (response.data?.deviceRegistered) {
                    setItem("appState", "dashboard");
                } else {
                    setItem("appState", "2fa");
                }
            } else {
                localErrors.push({name: "login", description: response.errorCode ?? "unknownError"});
            }
        }
        setFormErrors(localErrors);
    };

    const onPressForgot = () => {
        setItem("appState", "forgot");
    };

    return (
        <View style={{ backgroundColor: Colors.background, flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: Colors.copyPrimary, paddingVertical: 40, fontSize: 34}}>// MySUBARU Logo //</Text>
            <MyTextInput name="username" label={L.login.username} errors={formErrors} text={username} onChangeText={text => setUsername(text)} autoCapitalize='none' autoCorrect={false}></MyTextInput>
            <MyTextInput name="password" label={L.login.password} errors={formErrors} text={password} onChangeText={text => setPassword(text)} secureTextEntry={true} style={{ paddingBottom: 0 }}></MyTextInput>
            <MyCheckBox label={L.login.rememberUsernamePassword} checked={rememberMe} onChangeValue={(value) => setRememberMe(value)}></MyCheckBox>
            <MyPrimaryButton onPress={onPressLogin} style={{width: 350}} title={L.login.logIn}></MyPrimaryButton>
            <MyLinkButton onPress={onPressForgot} style={{width: 350}} title={L.login.forgotSomething}></MyLinkButton>
            {loading}
            {otherErrors}
            <View style={{ flexGrow: 1 }} />
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
