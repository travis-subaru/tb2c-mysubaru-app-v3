import React, { useState } from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import { MyAppIcon } from '../components/MyAppIcon';
import { MyButtonProps } from '../components/MyButton';
import { staticMidnight, staticWhite } from '../components/MyColors';
import { Language, useLanguage } from '../model/Language';
import { MyPressable } from '../components/MyPressable';
import { MyStyleSheet } from '../components/MyStyles';
import { MyText } from '../components/MyText';

// TODO: Set PIN
// TODO: Forgot PIN
// TODO: Check local storage
// TODO: Biometric pass through

export interface PINCheckResult {
    type: "pin"
    pin: string
}

/** View model to request a choice modal */
export interface PINViewModel {
    type: "PIN"
}

export const PINDigitIndicator = (props: {filled: boolean}) => {
    return <View style={{ margin: 5, width: 10, height: 10, borderColor: staticWhite, borderWidth: 1, borderRadius: 5, backgroundColor: props.filled ? staticWhite : staticMidnight }} />
}

export const PINButton = (props: MyButtonProps) => {
    const [pressed, setPressed] = useState(false);
    const [onPressIn, onPressOut] = [() => setPressed(true), () => setPressed(false)];
    const fillColor = pressed ? staticWhite : staticMidnight;
    const strokeColor = pressed ? staticMidnight : staticWhite;
    const style = { backgroundColor: fillColor, borderColor: strokeColor, borderWidth: 1, color: strokeColor, minWidth: 72, maxWidth: 72, minHeight: 72, maxHeight: 72, margin: 10 }

    return (<MyPressable onPressIn={onPressIn} onPressOut={onPressOut} {...props} style={[MyStyleSheet.roundedEdge, style, props.style]}>
        <Text style={[MyStyleSheet.headlineText, { color: strokeColor }, props.textStyle]}>{props.title}</Text>
    </MyPressable>);
}

export const PINCheck = (props: {onSelect: (string) => void, onCancel: () => void}) => {
    const i18n: Language = useLanguage();
    const textStyle = { color: staticWhite, paddingBottom: 10 };
    let [PIN, setPIN] = useState("");
    const pushDigit = async (digit: string) => {
        const newPIN = PIN + digit;
        await setPIN(newPIN);
        if (newPIN.length == 4) {
            props.onSelect(newPIN);
        }
    }
    return <SafeAreaView style={{ backgroundColor: staticMidnight, position: 'absolute', width: '100%', height: "100%", zIndex: 9999 }}>
        <StatusBar barStyle={'light-content'} />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: staticMidnight }}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ width: 50 }} />
                    <MyText style={[MyStyleSheet.headlineText, { flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: 'center' }, textStyle]}>{i18n.pinPanel.pinRequired}</MyText>
                    <MyPressable onPress={props.onCancel} style={{ minWidth: 50, maxWidth: 50, width: 50}}>
                        <MyAppIcon glyph='closeCircle' style={[{ fontSize: 32 }, textStyle]} />
                    </MyPressable>
                </View>
                <MyText style={[MyStyleSheet.text, textStyle]}>{i18n.pinPanel.enterYourPin}</MyText>
                <View style={{ flexDirection: 'row'}}>
                    <PINDigitIndicator filled={PIN.length >= 1} />
                    <PINDigitIndicator filled={PIN.length >= 2} />
                    <PINDigitIndicator filled={PIN.length >= 3} />
                    <PINDigitIndicator filled={PIN.length >= 4} />
                </View>
            </View>
            <View style={{ marginTop: 20 }}>
                <View style={{ flexDirection: 'row'}}>
                    <PINButton title="1" onPress={() => pushDigit('1')} />
                    <PINButton title="2" onPress={() => pushDigit('2')} />
                    <PINButton title="3" onPress={() => pushDigit('3')} />
                </View>
                <View style={{ flexDirection: 'row'}}>
                    <PINButton title="4" onPress={() => pushDigit('4')} />
                    <PINButton title="5" onPress={() => pushDigit('5')} />
                    <PINButton title="6" onPress={() => pushDigit('6')} />
                </View>
                <View style={{ flexDirection: 'row'}}>
                    <PINButton title="7" onPress={() => pushDigit('7')} />
                    <PINButton title="8" onPress={() => pushDigit('8')} />
                    <PINButton title="9" onPress={() => pushDigit('9')} />
                </View>
                <View style={{ flexDirection: 'row'}}>
                    <PINButton textStyle={MyStyleSheet.buttonText} title={i18n.pinPanel.clear} onPress={() => setPIN('')} />
                    <PINButton title="0" onPress={() => pushDigit('0')} />
                    {/* TODO Backspace symbol */}
                    <PINButton textStyle={MyStyleSheet.buttonText} title={"DEL"} onPress={() => setPIN(PIN.substring(0, PIN.length - 1))} />
                </View>
            </View>
        </View>
    </SafeAreaView>
}
