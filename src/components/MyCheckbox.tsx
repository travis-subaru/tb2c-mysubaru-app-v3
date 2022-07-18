import React from 'react';
import { View, Image } from 'react-native';
import { useColors, Palette } from './MyColors';
import { MyPressable } from './MyPressable';
import { MyText } from './MyText';

// TODO: Get checkmark from style assets

export interface MyCheckBoxProps {
    onChangeValue: (newValue: boolean) => void,
    label?: string,
    checked?: boolean
};

export const MyCheckBox = (props: MyCheckBoxProps) => {
    const Colors: Palette = useColors();
    const isChecked = props.checked ?? false
    const innerColor = isChecked ? Colors.buttonPrimary : undefined;
    const outerColor = isChecked ? Colors.buttonPrimary : Colors.copySecondary;
    const image = isChecked ? <Image style={{ width: 20, height: 20 }} source={ require("../../assets/img/checkmark.png")}></Image> : undefined

    return (<MyPressable style={{ flexDirection: 'row', minHeight: 50 }} onPress={() => props.onChangeValue(!isChecked)}>
        <View style={{ width: 25, height: 25, backgroundColor: innerColor, borderColor: outerColor, borderWidth: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {image}
        </View>
        <View style={{ height: 25, flexDirection: 'column', justifyContent: 'center', paddingHorizontal: 10 }}>
            <MyText>{props.label}</MyText>
        </View>
    </MyPressable>);
}
