import React, { useState } from 'react';
import { Text  } from 'react-native';
import { MyAppIcon, MyAppIconGlyph } from './MyAppIcon';
import { useColors, Palette, staticWhite, staticMidnight } from './MyColors';
import { MyPressable } from './MyPressable';
import { MyStyleSheet } from './MyStyles';

export interface MyButtonProps {
    title?: string
    glyph?: MyAppIconGlyph
    onPress?: () => void
    subtitle?: string
    imageName?: string
    key?: string
    style?: any
}

/** Primary (blue, filled) button. Use in layouts with 2-3 buttons */
export const MyPrimaryButton = (props: MyButtonProps) => {
    const Colors: Palette = useColors();
    const [pressed, setPressed] = useState(false);
    const [onPressIn, onPressOut] = [() => setPressed(true), () => setPressed(false)];

    return (<MyPressable onPressIn={onPressIn} onPressOut={onPressOut} {...props} style={[MyStyleSheet.roundedEdge, { backgroundColor: Colors.buttonPrimary }, props.style]}>
        <Text style={[MyStyleSheet.buttonText, { color: staticWhite }]}>{props.title}</Text>
    </MyPressable>);
}

/** Secondary (blue, outline) button. Use in layouts with 2-3 buttons */
export const MySecondaryButton = (props: MyButtonProps) => {
    const Colors: Palette = useColors();
    const [pressed, setPressed] = useState(false);
    const [onPressIn, onPressOut] = [() => setPressed(true), () => setPressed(false)];

    return (<MyPressable onPressIn={onPressIn} onPressOut={onPressOut} {...props} style={[{ borderColor: Colors.buttonSecondary }, MyStyleSheet.roundedEdge, props.style]}>
        <Text style={[MyStyleSheet.buttonText, { color: Colors.buttonSecondary }]}>{props.title}</Text>
    </MyPressable>);
}

/** Tappable link */
export const MyLinkButton = (props: MyButtonProps) => {
    const Colors: Palette = useColors();
    const [pressed, setPressed] = useState(false);
    const [onPressIn, onPressOut] = [() => setPressed(true), () => setPressed(false)];

    return (<MyPressable onPressIn={onPressIn} onPressOut={onPressOut} {...props} style={[props.style]}>
        <Text style={[MyStyleSheet.buttonText, { color: Colors.buttonSecondary }]}>{props.title}</Text>
    </MyPressable>);
}

/** Alternate (gray, filled) button */
export const MyAlternateButton = (props: MyButtonProps) => {
    const Colors: Palette = useColors();
    const [pressed, setPressed] = useState(false);
    const [onPressIn, onPressOut] = [() => setPressed(true), () => setPressed(false)];
    const lines = (props.title?.split('\\n') ?? []).map((line, i) => {
        return <Text key={i} style={[MyStyleSheet.buttonText, { color: staticWhite }]}>{line}</Text>
    })

    return (<MyPressable onPressIn={onPressIn} onPressOut={onPressOut} {...props} style={[MyStyleSheet.roundedEdge, { backgroundColor: Colors.copySecondary }, props.style]}>
        {lines}
    </MyPressable>);
}

/** Primary action button for dashboard
 *
 * Used for engine start / stop.
 */
 export const MyPrimaryDashboardButton = (props: MyButtonProps) => {
    const C: Palette = useColors();
    const [pressed, setPressed] = useState(false);
    const [onPressIn, onPressOut] = [() => setPressed(true), () => setPressed(false)];
    const backgroundColor = pressed ? staticMidnight : C.buttonPrimary;
    const borderColor = pressed ? C.buttonPrimary : staticWhite;
    const textColor = staticWhite;
    const lines = (props.title?.split('\\n') ?? []).map((line, i) => {
        return <Text key={i} style={[MyStyleSheet.buttonText, { color: textColor }]}>{line}</Text>
    });
    const size = 150;
    const style = { backgroundColor: backgroundColor, borderColor: borderColor, borderRadius: size / 2, borderWidth: 10, minWidth: size, minHeight: size };
    return (<MyPressable onPressIn={onPressIn} onPressOut={onPressOut} {...props} style={[style, props.style]}>
        {props.glyph ? <MyAppIcon glyph={props.glyph} style={{color: textColor}}></MyAppIcon> : null}
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
        return <Text key={i} style={[MyStyleSheet.buttonText, { color: staticWhite }]}>{line}</Text>
    })

    return (<MyPressable onPressIn={onPressIn} onPressOut={onPressOut} {...props} style={[MyStyleSheet.roundedEdge, { backgroundColor: Colors.copySecondary, minWidth: 100, minHeight: 100 }, props.style]}>
        {props.glyph ? <MyAppIcon glyph={props.glyph} style={{color: staticWhite}}></MyAppIcon> : null}
        {lines}
    </MyPressable>);
}

/** Links for dashboard
 *
 * Designed to flank engine start.
 */
export const MyDashboardLinkButton = (props: MyButtonProps) => {
    const Colors: Palette = useColors();
    const [pressed, setPressed] = useState(false);
    const [onPressIn, onPressOut] = [() => setPressed(true), () => setPressed(false)];

    return (<MyPressable onPressIn={onPressIn} onPressOut={onPressOut} {...props} style={[props.style]}>
        <Text style={[MyStyleSheet.buttonText, { color: Colors.buttonSecondary }]}>{props.title}</Text>
    </MyPressable>);
}
