import React, { useState } from 'react';
import { Button, Text, View, SafeAreaView } from 'react-native';
import { Palette, useColors } from './MyColors';
import { MyAlternateButton, MyPrimaryButton, MyLinkButton } from './MyButton';
import { MyCheckBox } from './MyCheckbox';
import { MyTextInput } from './MyTextInput'
import { MyText } from './MyText';
import { net_getEnviroment, net_login } from './NETLogin';

// TODO: MySubaru Logo
// TODO: Helvetica Neue Font Collection
// TODO: Form binding
// TODO: Network
// TODO: Safe Area
// TODO: Actual app version
// TODO: Environment select
// TODO: Need native hooks to password apps

const Login = () => {
    const Colors: Palette = useColors();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const [res, setRes] = useState('empty');

    const onPressLogin = async () => {
        setRes("ok, button");
        const response = await net_login(net_getEnviroment());
        if (response.data == null) {
            setRes("response.data == null");
        } else {
            setRes(JSON.stringify(response.data.account));
        }
        
    };

    return (
        <View style={{ backgroundColor: Colors.background, flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{color: Colors.copyPrimary, paddingVertical: 40, fontSize: 34}}>// MySUBARU Logo //</Text>
            <MyTextInput label="Username" text={username} onChangeText={text => setUsername(text)} autoCapitalize='none' autoCorrect={false}></MyTextInput>
            <MyTextInput label="Password" text={password} onChangeText={text => setPassword(text)} secureTextEntry={true} paddingBottom={false}></MyTextInput>
            <MyCheckBox label="Remember Username/Password" checked={rememberMe} onChangeValue={(value) => setRememberMe(value)}></MyCheckBox>
            <MyPrimaryButton onPress={onPressLogin} style={{width: 350}} title="Log In"></MyPrimaryButton>
            <MyLinkButton style={{width: 350}} title="Forgot Something?"></MyLinkButton>
            <View style={{flexGrow:1}}></View>
            <MyText>V. 2.0.0c-longVersion</MyText>
            <View style={{width: 350, paddingVertical: 20}}>
                <View style={{flexDirection: 'row', justifyContent: "space-between", alignItems: "center"  }}>
                    <MyAlternateButton key="demo" title="Try it in\nDemo Mode"></MyAlternateButton>
                    <MyAlternateButton key="chat" title="Need Assistance?\nTap Here to Chat."></MyAlternateButton>
                </View>
            </View>
            <Text style={{width: 350, paddingVertical: 20}}>{res}</Text>
            
        </View>
    );
};

export default Login;