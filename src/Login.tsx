import React, { useState } from 'react';
import { Button, Text, View, SafeAreaView } from 'react-native';
import { Palette, useColors } from './MyColors';
import { MyButton } from './MyButton';
import { MyCheckBox } from './MyCheckbox';
import { MyTextField } from './MyTextField'

// TODO: MySubaru Logo
// TODO: Helvetica Neue Font Collection
// TODO: Form binding
// TODO: Network
// TODO: Safe Area
// TODO: Actual app version

const Login = () => {
    const Colors: Palette = useColors();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    return (
        <View style={{ backgroundColor: Colors.background, flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{color: Colors.copyPrimary, padding: 20, fontSize: 34}}>// MySUBARU Logo //</Text>
            <MyTextField label="Username" text={username} onChangeText={text => setUsername(text)} autoCapitalize='none' autoCorrect={false}></MyTextField>
            <MyTextField label="Password" text={password} onChangeText={text => setPassword(text)} secureTextEntry={true}></MyTextField>
            <MyCheckBox label="Remember Username/Password"></MyCheckBox>
            <MyButton title="Log In"></MyButton>
            <MyButton title="Forgot Something?"></MyButton>
            <MyButton title="Try it in Demo Mode"></MyButton>
            <Text style={{ color: Colors.copyPrimary, padding: 20 }}>V. 2.0.0c</Text>
        </View>
    );
};

export default Login;