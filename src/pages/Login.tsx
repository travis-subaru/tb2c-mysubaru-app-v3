import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Palette, staticWhite, useColors } from '../components/MyColors';
import { MyAlternateButton, MyPrimaryButton, MyLinkButton } from '../components/MyButton';
import { MyCheckBox } from '../components/MyCheckbox';
import { MyTextErrors, MyTextInput } from '../components/MyTextInput'
import { MyText } from '../components/MyText';
import { requestLogin } from '../net/Login';
import { useLanguage, Language } from '../components/MyLanguage';
import { setItem } from '../stores/Local';
import { MyStyleSheet } from '../components/MyStyles';
import { SessionData } from '../stores/Session';
import { requestSelectVehicle } from '../net/SelectVehicle';
import { requestMySAlerts } from '../net/MySAlerts';
import { requestRefreshVehicles } from '../net/RefreshVehicles';
import { requestTwoStepAuthContact } from '../net/TwoStepAuth';
import { MySimpleNavBar, MySimpleNavButtonBarItem } from '../components/MySimpleNavBar';

// TODO: MySubaru Logo
// TODO: Helvetica Neue Font Collection
// TODO: Actual app version
// TODO: Environment select
// TODO: Native hooks to password apps

const Login = () => {
    const Colors: Palette = useColors();
    const i18n: Language = useLanguage();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [formErrors, setFormErrors] = useState([]);
    const [active, setActive] = useState(false);

    const loading = (() => {
        if (!active) { return; }
        return (<View key="loading" style={[MyStyleSheet.roundedEdge, { backgroundColor: Colors.copySecondary, justifyContent: "center", alignItems: "center", width: 350, padding: 20 }]}>
            <MyText style={{ color: staticWhite }}>Show Login Progress</MyText>
        </View>);
    })();

    const otherErrors = (() => {
        const otherErrors = formErrors.filter(e => e.name != "username" && e.name != "password");
        if (otherErrors.length == 0) { return; }
        return (<View key="error" style={[MyStyleSheet.roundedEdge, { backgroundColor: Colors.error, justifyContent: "center", alignItems: "center", width: 350, padding: 20 }]}>
            {otherErrors.map((e, i) => <MyText key={i} style={{ color: staticWhite }}>{e.description}</MyText>)}
        </View>);
    })()

    const onPressLogin = async () => {
        var localErrors: MyTextErrors[] = [];
        if (username == "") {
            localErrors.push({ name: "username", description: i18n.login.loginFormValidateMessages.loginUsername});
        }
        if (password == "") {
            localErrors.push({ name: "password", description: i18n.login.loginFormValidateMessages.password});
        }
        setFormErrors(localErrors);
        if (localErrors.length == 0) {
            setActive(true);
            const response = await requestLogin({loginUsername: username, password: password, rememberUserCheck: rememberMe ? "on" : "off"});
            if (response.success && response.dataName) {
                const session: SessionData = response.data;
                // ????: Following existing app, seems overkill
                if (session.currentVehicleIndex < session.vehicles.length) {
                    const vin = session.vehicles[session.currentVehicleIndex].vin;
                    await requestSelectVehicle(vin) && await requestMySAlerts() && await requestRefreshVehicles();
                    if (!session.deviceRegistered) {
                        const contactInfo = await requestTwoStepAuthContact();
                        setItem("contactInfo", contactInfo);
                    } else {
                        debugger;
                    }
                } else {
                    // ????: No vehicle error?
                }
            }
            setActive(false);
        }
    };

    const onPressForgot = () => {
        setItem("appState", "forgot");
    };

    return (
        <View style={MyStyleSheet.screenOuter}>
            <MySimpleNavBar>
                <MySimpleNavButtonBarItem title=" "></MySimpleNavButtonBarItem>
                <MyText style={MyStyleSheet.headlineText}>// MySUBARU //</MyText>
            </MySimpleNavBar>
            <View style={MyStyleSheet.screenInner}>
                <MyTextInput name="username" label={i18n.login.username} errors={formErrors} text={username} onChangeText={text => setUsername(text)} autoCapitalize='none' autoCorrect={false}></MyTextInput>
                <MyTextInput name="password" label={i18n.login.password} errors={formErrors} text={password} onChangeText={text => setPassword(text)} secureTextEntry={true} style={{ paddingBottom: 0 }}></MyTextInput>
                <MyCheckBox label={i18n.login.rememberUsernamePassword} checked={rememberMe} onChangeValue={(value) => setRememberMe(value)}></MyCheckBox>
                <MyPrimaryButton onPress={onPressLogin} style={{width: 350}} title={i18n.login.logIn}></MyPrimaryButton>
                <MyLinkButton onPress={onPressForgot} style={{width: 350}} title={i18n.login.forgotSomething}></MyLinkButton>
                {loading}
                {otherErrors}
                <View style={{ flexGrow: 1 }} />
                <View>
                    <MyText>V. 2.0.0c-longVersion</MyText>
                </View>
                <View style={{width: 350, paddingVertical: 20}}>
                    <View style={{flexDirection: 'row', justifyContent: "space-between", alignItems: "center"  }}>
                        <MyAlternateButton title={i18n.login.demoMode}></MyAlternateButton>
                        <MyAlternateButton title="Need Assistance?\nTap Here to Chat."></MyAlternateButton>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Login;
