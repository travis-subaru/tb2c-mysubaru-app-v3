import React from 'react';
import { Pressable, View } from 'react-native';
import { MyStyleSheet } from './MyStyles';

export const MyPressable = (props: any) => {
    return (<View>
        <Pressable {...props} style={[MyStyleSheet.pressable, props.style]}>
            {props.children}
        </Pressable>
    </View>);
}
