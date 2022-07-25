import React from 'react';
import { Pressable, View } from 'react-native';

export const MyPressable = (props: any) => {
    return (<View>
        <Pressable {...props} style={[{ alignItems: 'center', justifyContent: 'center' }, props.style]}>
            {props.children}
        </Pressable>
    </View>);
}
