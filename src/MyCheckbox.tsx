import React from 'react';
import { Text, View, Pressable, Image } from 'react-native';
import { useColors, Palette } from './MyColors';

// TODO: Get checkmark from style assets

export interface MyCheckBoxProps {
    onChangeValue: (newValue: Boolean) => void, 
    label?: string, 
    checked?: boolean 
};

export const MyCheckBox = (props: MyCheckBoxProps) => {
    const Colors: Palette = useColors();
    const isChecked = props.checked ?? false
    const innerColor = isChecked ? Colors.buttonPrimary : undefined;
    const outerColor = isChecked ? Colors.buttonPrimary : Colors.copySecondary;
    const image = isChecked ? <Image style={{ width: 20, height: 20 }} source={ require("../img/checkmark.png")}></Image> : undefined

    return (<Pressable style={{ flexDirection: 'row', maxWidth: 350 }} onPress={() => props.onChangeValue(!isChecked)}>
        <View style={{ width: 25, height: 25, backgroundColor: innerColor, borderColor: outerColor, borderWidth: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {image}
        </View>
        <View style={{ height: 25, flexDirection: 'column', justifyContent: 'center', paddingHorizontal: 10 }}> 
            <Text style={{ color: Colors.copyPrimary }}>{props.label}</Text>
        </View>
    </Pressable>);
}