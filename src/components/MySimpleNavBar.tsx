import React, { useState } from 'react';
import { View } from 'react-native';
import { MyLinkButton } from './MyButton';
import { useColors, Palette, staticWhite } from './MyColors';
import { MyPressable } from './MyPressable';
import { MyStyleSheet } from './MyStyles';
import { MyText } from './MyText';

/** Placeholder for navigation until react-navigation is ready.
 *
 * Assumes props.children contains [left nav, title element, right nav]
 * If array has one or two children, first element is title, second is left nav.
 */
export const MySimpleNavBar = (props) => {
    const leftStyle = { paddingLeft: 20 };
    const titleStyle = { flex: 1, alignItems: 'center', justifyContent: 'center' };
    const rightStyle = { paddingRight: 20 };
    if (props.children.length == 0) {
        return <View {...props}>
            <View style={leftStyle}><MySimpleNavButtonBarItem title=" "></MySimpleNavButtonBarItem></View>
            <View style={titleStyle}><MyText>Untitled</MyText></View>
            <View style={rightStyle}><MySimpleNavButtonBarItem title=" "></MySimpleNavButtonBarItem></View>
        </View>;
    } else if (props.children.length == 1) {
        return <View {...props} style={[props.style, MyStyleSheet.fauxNavBar]}>
            <View style={leftStyle}><MySimpleNavButtonBarItem title=" "></MySimpleNavButtonBarItem></View>
            <View style={titleStyle}>{props.children[0]}</View>
            <View style={rightStyle}><MySimpleNavButtonBarItem title=" "></MySimpleNavButtonBarItem></View>
        </View>;
    } else if (props.children.length == 2) {
        return <View {...props} style={[props.style, MyStyleSheet.fauxNavBar]}>
            <View style={leftStyle}>{props.children[0]}</View>
            <View style={titleStyle}>{props.children[1]}</View>
            <View style={rightStyle}><MySimpleNavButtonBarItem title=" "></MySimpleNavButtonBarItem></View>
        </View>;
    } else {
        return <View {...props} style={[props.style, MyStyleSheet.fauxNavBar]}>
            <View style={leftStyle}>{props.children[0]}</View>
            <View style={titleStyle}>{props.children[1]}</View>
            <View style={rightStyle}>{props.children[2]}</View>
        </View>;
    }
}

export const MySimpleNavButtonBarItem = (props) => {
    return <MyLinkButton {...props} style={[props.style, {minWidth: 50, maxWidth: 100}]}></MyLinkButton>;
}
