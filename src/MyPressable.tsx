import React from 'react';
import { Pressable, View } from 'react-native';
import { MyStyles } from './MyStyles';

export const MyPressable = (props: any) => {
    return (<View>
        <Pressable {...props} style={[MyStyles.pressable, props.style]}>
            {props.children}
        </Pressable>
    </View>);
}