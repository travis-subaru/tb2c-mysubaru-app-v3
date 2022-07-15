import React from 'react';
import { Text } from 'react-native';
import { useColors, Palette } from './MyColors';
import { MyStyleSheet } from './MyStyles';

export interface MyTextProps {
    key?: string
    style?: any
    children?: any
}

export const MyText = (props: MyTextProps) => {
    let text: string = props.children;
    text = text.replace("<br />", "\n");
    text = text.replace("<nobr>", "\n");
    text = text.replace("&nbsp;", " ");
    text = text.replace("&amp;", "&");


    if (text.includes("\\n")) {
        return text.split("\\n").map((line, i) => {
            return <MyText {...props} key={i}>{line}</MyText>
        });
    }
    const Colors: Palette = useColors();
    return (<Text style={[{ color: Colors.copyPrimary }, MyStyleSheet.text, props.style]}>
        {text}
    </Text>);
}
