import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import { useColors, Palette } from './MyColors';
import { MyStyles } from './MyStyles';
import { baseFontSize } from './MyText';

// TODO: (Not used in login) Disabled fields, Multiline, Errors, Character count 

export interface MyTextInputProps { 
    onChangeText: (text: string) => void
    text?: string
    label?: string
    autoCapitalize?: string // Used by Username
    autoCorrect?: boolean  // Used by Username
    secureTextEntry?: boolean // Used by Password
}

export const MyTextInput = (props: MyTextInputProps) => {
    const Colors: Palette = useColors();
    const [isFocused, setIsFocused] = useState(false);
    const text = props.text ?? '';
    const textStyle = { position: 'absolute', top: -12, left: 25, backgroundColor: Colors.background, color: Colors.copyPrimary, fontSize: baseFontSize, paddingHorizontal: 5 };
    const textInputStyle = { position: 'absolute', top: 5, left: 25, right: 25, bottom: 5, color: Colors.copyPrimary, fontSize: baseFontSize };
    const textViewStyle = { borderColor: isFocused ? Colors.link : Colors.copyPrimary, color: Colors.copyPrimary, width: 350 };
    // Use a label or a placeholder but not both
    const [label, placeholder] = (() => {
        if (isFocused || text.length > 0) {
            return [<Text style={textStyle}>{props.label}</Text>, null];
        } else {
            return [null, props.label];
        }

    })();
    const onBlur = () => setIsFocused(false);
    const onFocus = () => setIsFocused(true);
    return (<View style={{ paddingBottom: 20 }}>
        <View style={[MyStyles.roundedEdge, MyStyles.pressable, textViewStyle]}>
            {label}
            <TextInput onBlur={onBlur} onFocus={onFocus} placeholder={placeholder} selectionColor={Colors.link} style={textInputStyle} {...props}>{text}</TextInput>
        </View>
    </View>);
}