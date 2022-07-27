import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import { MyAppIcon, MyAppIconGlyph } from './MyAppIcon';
import { useColors, Palette } from './MyColors';
import { MyPressable } from './MyPressable';
import { MyStyleSheet } from './MyStyles';

// TODO: Disabled fields, Multiline, Character count

export const textInputBottomPadding = 20;

export interface MyTextErrors {
    name: string
    description: string
}

export interface MyTextInputProps {
    onChangeText: (text: string) => void
    /** Return any appropriate error messages */
    validate?: () => string[];
    text?: string
    name?: string
    label?: string
    errors?: MyTextErrors[]
    autoCapitalize?: string // Used by Username
    autoCorrect?: boolean  // Used by Username
    secureTextEntry?: boolean // Used by Password
    style?: any
    usePaddingBottom?: boolean
    trailingAccessory?: MyAppIconGlyph
    trailingAccessoryOnPress?: () => void
}

export const MyTextInput = (props: MyTextInputProps) => {
    const C: Palette = useColors();
    const [isFocused, setIsFocused] = useState(false);
    // TODO: Merge inline validation and form errors
    const formErrors = (props.errors ?? []).filter(error => props.name === null || error.name === props.name).map(error => error.description);
    const inlineErrors = props.validate ? props.validate() : [];
    const errors = formErrors.concat(inlineErrors);
    const text = props.text ?? '';
    const textRingColor = errors.length > 0 ? C.error : isFocused ? C.link : C.copyPrimary;
    const textStyle = { position: 'absolute', top: -12, left: 25, backgroundColor: C.background, color: C.copyPrimary, paddingHorizontal: 5 };
    const textInputStyle = { position: 'absolute', top: 5, left: 25, right: 25, bottom: 5, color: C.copyPrimary };
    const textViewStyle = { alignItems: 'center', borderColor: textRingColor, borderWidth: 1, color: C.copyPrimary, justifyContent: 'center', width: 350, minHeight: 50 };
    // Use a label or a placeholder but not both
    const [label, placeholder] = (() => {
        if (props.label && (isFocused || text.length > 0)) {
            return [<Text style={[MyStyleSheet.bodyText, textStyle]}>{props.label}</Text>, null];
        } else {
            return [null, props.label];
        }
    })();
    const errorControl = (() => {
        if (errors.length == 0) { return null; }
        return <View style={{ paddingTop: 10}}>
            {errors.map((line, i) => <Text key={i} style={{color: C.error}}>{line}</Text>)}
        </View>
    })();
    const onBlur = () => setIsFocused(false);
    const onFocus = () => setIsFocused(true);
    return (<View style={props.style}>
        <View style={[MyStyleSheet.roundedEdge, textViewStyle]}>
            {label}
            <TextInput onBlur={onBlur} onFocus={onFocus} placeholder={placeholder} placeholderTextColor={C.copySecondary} selectionColor={C.link} {...props} style={[MyStyleSheet.bodyText, textInputStyle]}>{text}</TextInput>
            {props.trailingAccessory ? <MyPressable onPress={props.trailingAccessoryOnPress} style={{ position: 'absolute', top: 3, right: 3, width: 44, height: 44 }}>
                <MyAppIcon glyph={props.trailingAccessory}></MyAppIcon>
            </MyPressable> : null}
        </View>
        {errorControl}
    </View>);
}

export const MyPassword = (props: MyTextInputProps) => {
    const [hide, setHide] = useState(true);
    return <MyTextInput {...props} secureTextEntry={hide} trailingAccessory={hide ? "eyeBlocked" : "eye1"} trailingAccessoryOnPress={() => setHide(!hide)}></MyTextInput>;
}
