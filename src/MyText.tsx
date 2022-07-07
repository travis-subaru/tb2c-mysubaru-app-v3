import React from 'react';
import { Text } from 'react-native';
import { useColors, Palette } from './MyColors';

// TODO: Primary / Secondary styling
// TODO: Size groups

export const baseFontSize = 14;

export interface MyTextProps {
    children?: any;
}

export const MyText = (props: MyTextProps) => {
    const Colors: Palette = useColors();
    return (<Text style={{ color: Colors.copyPrimary}}>
        {props.children}
    </Text>);
}