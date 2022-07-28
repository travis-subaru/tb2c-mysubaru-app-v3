import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { ListenerID } from '../stores/Listener';
import { MyAppIcon } from './MyAppIcon';
import { MyPrimaryButton } from './MyButton';
import { staticMidnight, staticWhite } from './MyColors';
import { MyPressable } from './MyPressable';
import { MyStyleSheet } from './MyStyles';
import { MyText } from './MyText';

/** Representation for a selectable item */
export interface ListItem {
    value: string
    description: string
}

export interface MySimpleChoiceResult {
    type: "choice"
    selection: ListItem
}

/** View model to request a choice modal */
export interface MySimpleChoiceModalViewModel {
    type: "MySimpleChoice"
    items: ListItem[]
    title: string
}

export interface MySimpleChoiceModalProps {
    items?: ListItem[]
    onSelect?: (ListItem) => void
    onCancel?: () => void
    title?: string
}

export const MySimpleChoiceModal = (props: MySimpleChoiceModalProps) => {
    const textStyle = { color: staticWhite, paddingBottom: 10 };
    return <SafeAreaView style={{ backgroundColor: staticMidnight, position: 'absolute', width: '100%', height: "100%", zIndex: 9001 }}>
        <StatusBar barStyle={'light-content'} />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: staticMidnight }}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ width: 50 }} />
                    <MyText style={[MyStyleSheet.headlineText, { flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: 'center' }, textStyle]}>{props.title}</MyText>
                    <MyPressable onPress={props.onCancel} style={{ minWidth: 50, maxWidth: 50, width: 50}}>
                        <MyAppIcon glyph='closeCircle' style={[{ fontSize: 32 }, textStyle]} />
                    </MyPressable>
                </View>
            </View>
            <View style={{ marginTop: 20 }}>
                {props.items ? props.items.map((item) => {
                    return <MyPrimaryButton key={item.value} style={{ marginBottom: 10, width: 350 }} title={item.description} onPress={() => props.onSelect ? props.onSelect(item) : null}></MyPrimaryButton>
                }) : null}
            </View>
        </View>
    </SafeAreaView>
}
