import React, { useState } from 'react';
import { Text  } from 'react-native';
import { useColors, Palette, staticWhite } from './MyColors';
import { MyPressable } from './MyPressable';
import { MyStyles } from './MyStyles';
import { baseFontSize } from './MyText';

export interface MyButtonProps {
    title?: string
    subtitle?: string
    imageName?: string
    style?: any
}

/** Primary (blue, filled) button. Use in layouts with 2-3 buttons */
export const MyPrimaryButton = (props: MyButtonProps) => {
    const Colors: Palette = useColors();
    const [pressed, setPressed] = useState(false);
    const [onPressIn, onPressOut] = [() => setPressed(true), () => setPressed(false)];

    return (<MyPressable onPressIn={onPressIn} onPressOut={onPressOut} style={[MyStyles.roundedEdge, { backgroundColor: Colors.buttonPrimary }, props.style]}>
        <Text style={{color: staticWhite, fontSize: baseFontSize, fontWeight: 'bold'}}>{props.title}</Text>
    </MyPressable>);
}

/** Secondary (blue, outline) button. Use in layouts with 2-3 buttons */
export const MySecondaryButton = (props: MyButtonProps) => {
    const Colors: Palette = useColors();
    const [pressed, setPressed] = useState(false);
    const [onPressIn, onPressOut] = [() => setPressed(true), () => setPressed(false)];

    return (<MyPressable onPressIn={onPressIn} onPressOut={onPressOut} style={[{ borderColor: Colors.buttonSecondary }, MyStyles.roundedEdge, props.style]}>
        <Text style={{color: Colors.buttonSecondary, fontSize: baseFontSize, fontWeight: 'bold'}}>{props.title}</Text>
    </MyPressable>); 
}

/** Tappable link */
export const MyLinkButton = (props: MyButtonProps) => {
    const Colors: Palette = useColors();
    const [pressed, setPressed] = useState(false);
    const [onPressIn, onPressOut] = [() => setPressed(true), () => setPressed(false)];

    return (<MyPressable onPressIn={onPressIn} onPressOut={onPressOut} style={[,props.style]}>
        <Text style={{color: Colors.buttonSecondary, fontSize: baseFontSize, fontWeight: 'bold'}}>{props.title}</Text>
    </MyPressable>); 
}

/** Alternate (gray, filled) button */
export const MyAlternateButton = (props: MyButtonProps) => {
    const Colors: Palette = useColors();
    const [pressed, setPressed] = useState(false);
    const [onPressIn, onPressOut] = [() => setPressed(true), () => setPressed(false)];

    return (<MyPressable onPressIn={onPressIn} onPressOut={onPressOut} style={[MyStyles.roundedEdge, { backgroundColor: Colors.copySecondary }, props.style]}>
        <Text style={{color: staticWhite, fontSize: baseFontSize, fontWeight: 'bold'}}>{props.title}</Text>
    </MyPressable>); 
}
