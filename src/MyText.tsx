import React from 'react';
import { Text } from 'react-native';
import { useColors, Palette } from './MyColors';
import { MyStyles } from './MyStyles';

// TODO: Primary / Secondary styling
// TODO: Size groups

export const baseFontSize = 14;

export interface MyTextProps {
    key?: string
    style?: any
    children?: any
}

export const MyText = (props: MyTextProps) => {
    if (props.children.includes("\\n")) {
        return props.children.split("\\n").map((line, i) => {
            return <MyText {...props} key={i}>{line}</MyText>
        });
    }
    const Colors: Palette = useColors();
    return (<Text style={[{ color: Colors.copyPrimary }, MyStyles.text, props.style]}>
        {props.children}
    </Text>);
}
