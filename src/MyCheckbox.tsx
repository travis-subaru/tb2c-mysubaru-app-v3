import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { useColors, Palette } from './MyColors';

// TODO: Pressable
// TODO: Toggle state
// TODO: Draw checkbox
// TODO: Color

const MyCheckBox = (props) => {
    const Colors: Palette = useColors();
    return (<View style={{flexDirection: 'row'}}>
        <Text>{props.checked ? "[X]" : "[_]"}</Text>
        <Text>{props.label}</Text>
    </View>);
}

export { MyCheckBox }; 