import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { MyAppIcon, MyAppIconGlyph, MyAppIconGlyphMap } from '../components/MyAppIcon';
import { MyRule } from '../components/MyRule';
import { MyText } from '../components/MyText';
import { MyTextInput } from '../components/MyTextInput';

/** Documentation for all supported symbols in app */
export const MySymbols = () => {
    const [search, setSearch] = useState("");
    const symbols = (() => {
        // @ts-ignore :: key is already typechecked
        const all: MyAppIconGlyph[] = Object.keys(MyAppIconGlyphMap);
        if (search == "") {
            return all.sort();
        } else {
            return all.filter((s) => { return s.toLowerCase().includes(search.toLowerCase()); }).sort()
        }
    })();
    return <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minWidth: '100%' }}>
            <MyTextInput autoCapitalize='none' onChangeText={(text) => setSearch(text)}></MyTextInput>
        </View>
        <ScrollView>
            <View>
                {symbols.map((symbol) => {
                    return <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', minWidth: '100%' }}>
                            <MyAppIcon glyph={symbol} style={{padding: 10}} />
                            <View style={{ flex: 1}}/>
                            <MyText style={{padding: 10}}>{symbol}</MyText>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minWidth: '100%' }}>
                            <MyRule direction="horizontal" style={{ minWidth: '98%' }} />
                        </View>
                    </View>
                })}
            </View>
        </ScrollView>
    </View>;
}
