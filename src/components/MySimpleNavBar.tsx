import React from 'react';
import { View } from 'react-native';
import { MyLinkButton } from './MyButton';
import { MyRule } from './MyRule';
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
    return <View style={[{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }, props.style]} {...props}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 44, width: '100%' }}>
            {(() => {
                if (!props.children || props.children.length == 0) {
                    return <>
                        <View style={leftStyle}><MySimpleNavButtonBarItem title=" "></MySimpleNavButtonBarItem></View>
                        <View style={titleStyle}><MyText>Untitled</MyText></View>
                        <View style={rightStyle}><MySimpleNavButtonBarItem title=" "></MySimpleNavButtonBarItem></View>
                    </>;
                } else if (props.children.length == 1) {
                    return <>
                        <View style={rightStyle}><MySimpleNavButtonBarItem title=" "></MySimpleNavButtonBarItem></View>
                        <View style={titleStyle}>{props.children[0]}</View>
                        <View style={rightStyle}><MySimpleNavButtonBarItem title=" "></MySimpleNavButtonBarItem></View>
                    </>;
                } else if (props.children.length == 2) {
                    return <>
                        <View style={leftStyle}>{props.children[0]}</View>
                        <View style={titleStyle}>{props.children[1]}</View>
                        <View style={rightStyle}><MySimpleNavButtonBarItem title=" "></MySimpleNavButtonBarItem></View>
                    </>;
                } else {
                    return <>
                        <View style={leftStyle}>{props.children[0]}</View>
                        <View style={titleStyle}>{props.children[1]}</View>
                        <View style={rightStyle}>{props.children[2]}</View>
                    </>;
                }
            })()}
        </View>
        <MyRule direction="horizontal"></MyRule>
    </View>;

}

export const MySimpleNavButtonBarItem = (props) => {
    return <MyLinkButton {...props} style={[props.style, {minWidth: 50, maxWidth: 100}]}></MyLinkButton>;
}
