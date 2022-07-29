import React from 'react';
import { Text } from 'react-native';
import { useColors, Palette } from './MyColors';

export interface MyTextProps {
    key?: string
    style?: any
    children?: any
}

export const decodeString = (text: string) => {
    text = text.replace("<br />", "\n");
    text = text.replace("<br />", "\n");
    text = text.replace("<nobr>", "");
    text = text.replace("</nobr>", "");
    text = text.replace("&nbsp;", " ");
    text = text.replace("&amp;", "&");
    // TODO: Bold support
    text = text.replace("<strong>", "");
    text = text.replace("</strong>", "");
    // TODO: Links
    text = text.replace("<a href=\"tel:1(800) 782-2783\" class=\"text-link\">(800) 782-2783</a>", "(800) 782-2783");
    return text;
}

export const MyText = (props: MyTextProps) => {
    let text: string = props.children ? decodeString(props.children) : "";

    if (text.includes("\\n")) {
        return <>
            {text.split("\\n").map((line, i) => {
                return <MyText {...props} key={i.toString()}>{line}</MyText>;
            })}
        </>
    }
    const Colors: Palette = useColors();
    return <Text style={[{ color: Colors.copyPrimary }, props.style]}>
        {text}
    </Text>;
}
