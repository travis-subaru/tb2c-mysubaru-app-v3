import React from 'react';
import { View } from 'react-native';
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
    const isChecked = !!props.value && props.value === props.selected;
    const outerRingSize = 25;
    const innerRingSize = 17;
    const innerRing = (() => {
        if (isChecked) {
            return <View style={{ width: innerRingSize, height: innerRingSize, backgroundColor: Colors.buttonPrimary, borderRadius: innerRingSize/2, borderWidth: 0 }}></View>
        } else {
            return undefined;
        }
    })();
    const onPress = () => {
        if (props.value) {
            props.onChangeValue(props.value);
        }
    }
    return (<MyPressable style={{ flexDirection: 'row', minHeight: 50 }} onPress={onPress}>
        <View style={{ width: outerRingSize, height: outerRingSize, backgroundColor: Colors.background, borderColor: Colors.copySecondary, borderRadius: outerRingSize/2, borderWidth: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {innerRing}
        </View>
        <View style={{ height: outerRingSize, flexDirection: 'column', justifyContent: 'center', paddingHorizontal: 10 }}>
            <MyText>{props.label}</MyText>
        </View>
    </MyPressable>);
}
