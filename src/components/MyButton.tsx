import React, { useState } from 'react';
import { Text } from 'react-native';
import { MyAppIcon, MyAppIconGlyph } from './MyAppIcon';
import { useColors, Palette, staticWhite, staticMidnight } from './MyColors';
import { MyPressable } from './MyPressable';
import { MyStyleSheet } from './MyStyles';
import { MyText } from './MyText';

export interface MyButtonProps {
    title?: string
    glyph?: MyAppIconGlyph
    onPress?: () => void
    subtitle?: string
    key?: string
    style?: any
    textStyle?: any
}

/** Primary (blue, filled) button. Use in layouts with 2-3 buttons */
export const MyPrimaryButton = (props: MyButtonProps) => {
    const Colors: Palette = useColors();
    const [pressed, setPressed] = useState(false);
    const [onPressIn, onPressOut] = [() => setPressed(true), () => setPressed(false)];

    return (<MyPressable onPressIn={onPressIn} onPressOut={onPressOut} {...props} style={[MyStyleSheet.roundedEdge, MyStyleSheet.buttonMinSize, { backgroundColor: Colors.buttonPrimary }, props.style]}>
        <Text style={[MyStyleSheet.buttonText, { color: staticWhite }, props.textStyle]}>{props.title}</Text>
    </MyPressable>);
}

/** Secondary (blue, outline) button. Use in layouts with 2-3 buttons */
export const MySecondaryButton = (props: MyButtonProps) => {
    const Colors: Palette = useColors();
    const [pressed, setPressed] = useState(false);
    const [onPressIn, onPressOut] = [() => setPressed(true), () => setPressed(false)];

    return (<MyPressable onPressIn={onPressIn} onPressOut={onPressOut} {...props} style={[MyStyleSheet.roundedEdge, MyStyleSheet.buttonMinSize, { borderColor: Colors.buttonSecondary, borderWidth: 1 }, props.style]}>
        <Text style={[MyStyleSheet.buttonText, { color: Colors.buttonSecondary }, props.textStyle]}>{props.title}</Text>
    </MyPressable>);
}

/** Tappable link */
export const MyLinkButton = (props: MyButtonProps) => {
    const C: Palette = useColors();
    const [pressed, setPressed] = useState(false);
    const [onPressIn, onPressOut] = [() => setPressed(true), () => setPressed(false)];
    const color = pressed ? C.copySecondary : C.buttonSecondary;

    return (<MyPressable onPressIn={onPressIn} onPressOut={onPressOut} {...props} style={[MyStyleSheet.buttonMinSize, props.style]}>
        {props.glyph ? <MyAppIcon glyph={props.glyph} style={{ color: color }}></MyAppIcon> : null}
        {props.title ? <Text style={[MyStyleSheet.buttonText, { color: color }, props.textStyle]}>{props.title}</Text> : null}
    </MyPressable>);
}

/** Alternate (gray, filled) button */
export const MyAlternateButton = (props: MyButtonProps) => {
    const Colors: Palette = useColors();
    const [pressed, setPressed] = useState(false);
    const [onPressIn, onPressOut] = [() => setPressed(true), () => setPressed(false)];
    const lines = (props.title?.split('\\n') ?? []).map((line, i) => {
        return <Text key={i} style={[MyStyleSheet.buttonText, { color: staticWhite }, props.textStyle]}>{line}</Text>
    })

    return (<MyPressable onPressIn={onPressIn} onPressOut={onPressOut} {...props} style={[MyStyleSheet.roundedEdge, MyStyleSheet.buttonMinSize, { backgroundColor: Colors.copySecondary  }, props.style]}>
        {lines}
    </MyPressable>);
}

/** Secondary action button for dashboard
 *
 * Used for various vehicle commands.
 */
export const MySecondaryDashboardButton = (props: MyButtonProps) => {
    const Colors: Palette = useColors();
    const [pressed, setPressed] = useState(false);
    const [onPressIn, onPressOut] = [() => setPressed(true), () => setPressed(false)];
    const lines = (props.title?.split('\\n') ?? []).map((line, i) => {
        return <Text key={i} style={[MyStyleSheet.buttonText, { color: staticWhite }, props.textStyle]}>{line}</Text>
    })
    return (<MyPressable onPressIn={onPressIn} onPressOut={onPressOut} {...props} style={[MyStyleSheet.roundedEdge, { backgroundColor: Colors.copySecondary, minWidth: 72, minHeight: 72 }, props.style]}>
        {props.glyph ? <MyAppIcon glyph={props.glyph} style={{color: staticWhite}}></MyAppIcon> : null}
        {lines}
    </MyPressable>);
}

