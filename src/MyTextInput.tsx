import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import { useColors, Palette } from './MyColors';
import { MyStyles } from './MyStyles';
import { baseFontSize } from './MyText';

// TODO: (Not used in login) Disabled fields, Multiline, Errors, Character count

export interface MyTextErrors {
    name: string
    description: string
}

export interface MyTextInputProps {
    onChangeText: (text: string) => void
    text?: string
    name?: string
    label?: string
    errors?: MyTextErrors[]
    autoCapitalize?: string // Used by Username
    autoCorrect?: boolean  // Used by Username
    secureTextEntry?: boolean // Used by Password
    paddingBottom?: boolean
}

export const MyTextInput = (props: MyTextInputProps) => {
    const Colors: Palette = useColors();
    const [isFocused, setIsFocused] = useState(false);
    const errors = (props.errors ?? []).filter(error => props.name === null || error.name === props.name).map(error => error.description);
    const text = props.text ?? '';
    const textRingColor = errors.length > 0 ? Colors.error : isFocused ? Colors.link : Colors.copyPrimary;
    const textStyle = { position: 'absolute', top: -12, left: 25, backgroundColor: Colors.background, color: Colors.copyPrimary, fontSize: baseFontSize, paddingHorizontal: 5 };
    const textInputStyle = { position: 'absolute', top: 5, left: 25, right: 25, bottom: 5, color: Colors.copyPrimary, fontSize: baseFontSize };
    const textViewStyle = { borderColor: textRingColor, color: Colors.copyPrimary, width: 350 };
    const paddingBottom = props.paddingBottom ?? true; // HACK: For last control
    // Use a label or a placeholder but not both
    const [label, placeholder] = (() => {
        if (isFocused || text.length > 0) {
            return [<Text style={textStyle}>{props.label}</Text>, null];
        } else {
            return [null, props.label];
        }
    })();
    const errorControl = (() => {
        if (errors.length == 0) { return null; }
        return <View style={{ paddingTop: 10}}>
            {errors.map((line, i) => <Text key={i} style={{color: Colors.error}}>{line}</Text>)}
        </View>
    })();
    const onBlur = () => setIsFocused(false);
    const onFocus = () => setIsFocused(true);
    return (<View style={{ paddingBottom: paddingBottom ? 20 : 0 }}>
        <View style={[MyStyles.roundedEdge, MyStyles.pressable, textViewStyle]}>
            {label}
            <TextInput onBlur={onBlur} onFocus={onFocus} placeholder={placeholder} selectionColor={Colors.link} {...props} style={textInputStyle}>{text}</TextInput>
        </View>
        {errorControl}
    </View>);
}
