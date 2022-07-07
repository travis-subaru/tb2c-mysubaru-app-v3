import React from 'react';
import { Button, View, Pressable } from 'react-native';
import { useColors, Palette } from './MyColors';

// TODO: Primary / Secondary styling

const MyButton = (props) => {
    const Colors: Palette = useColors();
    return (<Button style={{}} {...props}>{props.children}</Button>);
}

export { MyButton }; 