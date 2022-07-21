import React from 'react';
import { Pressable, View } from 'react-native';

export const MyPressable = (props: any) => {
    return (<View>
        <Pressable {...props} style={[{ alignItems: 'center', justifyContent: 'center', minWidth: 150, maxWidth: 350, minHeight: 50 }, props.style]}>
            {props.children}
        </Pressable>
    </View>);
}
