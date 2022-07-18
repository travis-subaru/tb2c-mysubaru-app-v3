import React from 'react';
import { View, Image } from 'react-native';
import { useColors, Palette } from './MyColors';
import { MyPressable } from './MyPressable';
import { MyText } from './MyText';

export interface MyRadioButtonProps {
    onChangeValue: (newValue: string) => void,
    label?: string,
    /** Value of *this* radio button. Reported on tap. */
    value?: string,
    /** Current selected value of the group.
     *
     * To make radio groups work, all controls in a group read from one value. */
    selected?: string,
};

export const MyRadioButton = (props: MyRadioButtonProps) => {
    const Colors: Palette = useColors();
    const isChecked = !!props.value && props.value === props.selected
    const innerColor = isChecked ? Colors.buttonPrimary : undefined;
    const outerColor = isChecked ? Colors.buttonPrimary : Colors.copySecondary;
    const image = isChecked ? <Image style={{ width: 20, height: 20 }} source={ require("../../assets/img/checkmark.png")}></Image> : undefined
    const onPress = () => {
        if (props.value) {
            props.onChangeValue(props.value);
        }
    }

    return (<MyPressable style={{ flexDirection: 'row', minHeight: 50 }} onPress={onPress}>
        <View style={{ width: 25, height: 25, backgroundColor: innerColor, borderColor: outerColor, borderWidth: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {image}
        </View>
        <View style={{ height: 25, flexDirection: 'column', justifyContent: 'center', paddingHorizontal: 10 }}>
            <MyText>{props.label}</MyText>
        </View>
    </MyPressable>);
}
