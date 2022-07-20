import React, { useState } from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import { MyButtonProps } from '../components/MyButton';
import { staticMidnight, staticWhite } from '../components/MyColors';
import { useLanguage } from '../components/MyLanguage';
import { MyPressable } from '../components/MyPressable';
import { MyStyleSheet } from '../components/MyStyles';
import { MyText } from '../components/MyText';
import { setItem } from '../stores/Local';

// TODO: PIN Check

export interface PINCheckResultFailed {
    ok: false
}

export interface PINCheckResultSuccess {
    ok: true
    pin: string
}

export type PINCheckResult = PINCheckResultFailed | PINCheckResultSuccess;

let resolver: (result: PINCheckResult) => void = (_) => {};

export const withPINCheck = async (): Promise<PINCheckResult> => {
    return new Promise((resolve, _) => {
        setItem('pinRequested', true);
        resolver = resolve;
    });
}

// "pinPanel": {
//     "pinRequired": "PIN Required",
//     "enterYourPin": "Enter Your PIN",
//     "clear": "CLEAR",
//     "setupTouchID": "Setup <span class=\"biometricsType\">Touch ID</span> for PIN",
//     "enterPinAbove": "Please enter your PIN above to complete setup."
// },

export const PINDigitIndicator = (props: {filled: boolean}) => {
    return <View style={{ margin: 5, width: 10, height: 10, borderColor: staticWhite, borderWidth: 1, borderRadius: 5, backgroundColor: props.filled ? staticWhite : staticMidnight }} />
}

export const PINButton = (props: MyButtonProps) => {
    const [pressed, setPressed] = useState(false);
    const [onPressIn, onPressOut] = [() => setPressed(true), () => setPressed(false)];
    const fillColor = pressed ? staticWhite : staticMidnight;
    const strokeColor = pressed ? staticMidnight : staticWhite;
    const style = { backgroundColor: fillColor, borderColor: strokeColor, color: strokeColor, minWidth: 50, maxWidth: 50, margin: 10 }

    return (<MyPressable onPressIn={onPressIn} onPressOut={onPressOut} {...props} style={[MyStyleSheet.roundedEdge, style, props.style]}>
        <Text style={[MyStyleSheet.buttonText, { color: staticWhite }]}>{props.title}</Text>
    </MyPressable>);
}

export const PINCheck = () => {
    const i18n = useLanguage();
    const textStyle = { color: staticWhite, paddingBottom: 10 };
    let [PIN, setPIN] = useState("");
    const pushDigit = async (digit: string) => {
        const newPIN = PIN + digit;
        await setPIN(newPIN);
        if (newPIN.length == 4) {
            checkPIN();
        }
    }
    const checkPIN = () => {
        // TODO: Actual check

        if (resolver) {
            resolver({ ok: true, pin: PIN});
            resolver = (_) => {};
        }

        setItem('pinRequested', false);
    }

    return <SafeAreaView style={{ backgroundColor: staticMidnight, position: 'absolute', width: '100%', height: "100%", zIndex: 9999 }}>
        <StatusBar barStyle={'light-content'} />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', backgroundColor: staticMidnight }}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <MyText style={[MyStyleSheet.headlineText, textStyle]}>{i18n.pinPanel.pinRequired}</MyText>
                <MyText style={[MyStyleSheet.text, textStyle]}>{i18n.pinPanel.enterYourPin}</MyText>
                <View style={{ flexDirection: 'row'}}>
                    <PINDigitIndicator filled={PIN.length >= 1} />
                    <PINDigitIndicator filled={PIN.length >= 2} />
                    <PINDigitIndicator filled={PIN.length >= 3} />
                    <PINDigitIndicator filled={PIN.length >= 4} />
                </View>
            </View>
            <View>
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
                    <PINButton title={i18n.pinPanel.clear} onPress={() => setPIN('')} />
                    <PINButton title="0" onPress={() => pushDigit('0')} />
                    {/* TODO Backspace symbol */}
                    <PINButton title={"DEL"} onPress={() => setPIN(PIN.substring(0, PIN.length - 1))} />
                </View>
            </View>
            <View>
                {/* Empty view for layout */}
            </View>
        </View>
    </SafeAreaView>
}
