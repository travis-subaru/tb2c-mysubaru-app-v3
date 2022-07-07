import React, { useState } from 'react';
import { Button, Text, View, SafeAreaView } from 'react-native';
import { Palette, useColors } from './MyColors';
import { MyAlternateButton, MyPrimaryButton, MyLinkButton } from './MyButton';
import { MyCheckBox } from './MyCheckbox';
import { MyTextInput } from './MyTextInput'
import { MyText } from './MyText';

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
    return (
        <View style={{ backgroundColor: Colors.background, flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{color: Colors.copyPrimary, padding: 20, fontSize: 34}}>// MySUBARU Logo //</Text>
            <MyTextInput label="Username" text={username} onChangeText={text => setUsername(text)} autoCapitalize='none' autoCorrect={false}></MyTextInput>
            <MyTextInput label="Password" text={password} onChangeText={text => setPassword(text)} secureTextEntry={true}></MyTextInput>
            <MyCheckBox label="Remember Username/Password" checked={rememberMe} onChangeValue={(value) => setRememberMe(value)}></MyCheckBox>
            <MyPrimaryButton style={{width: 350}} title="Log In"></MyPrimaryButton>
            <MyLinkButton style={{width: 350}} title="Forgot Something?"></MyLinkButton>
            <MyAlternateButton style={{width: 350}} title="Try it in Demo Mode"></MyAlternateButton>
            <MyText>V. 2.0.0c</MyText>
        </View>
    );
};

export default Login;