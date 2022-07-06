import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import { useColors, Palette } from './MyColors';
import { baseFontSize } from './MyFonts';

// TODO: (Not used in login) Disabled fields, Multiline, Errors, Character count 

const MyTextField = (props) => {
    const Colors: Palette = useColors();
    const [isFocused, setIsFocused] = useState(false);
    const text = props.text ?? '';
    const textStyle = { position: 'absolute', top: -12, left: 25, backgroundColor: Colors.background, color: Colors.copyPrimary, fontSize: baseFontSize, paddingHorizontal: 5 };
    const textInputStyle = { position: 'absolute', top: 5, left: 25, right: 25, bottom: 5, color: Colors.copyPrimary, fontSize: baseFontSize };
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
    return (<View style={{  paddingBottom: 25 }}>
        <View style={{ borderColor: isFocused ? Colors.link : Colors.copyPrimary, borderRadius: 5, borderWidth: 1, color: Colors.copyPrimary, minHeight: 50, width: 350 }}>
            {label}
            <TextInput onBlur={onBlur} onFocus={onFocus} placeholder={placeholder} selectionColor={Colors.link} style={textInputStyle} {...props}>{text}</TextInput>
        </View>
    </View>);
}

export { MyTextField }; 