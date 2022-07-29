import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Dashboard } from './Dashboard';
import { ForgotInfo } from './ForgotInfo';
import { AppState, useItem, Modal } from '../stores/Local';
import { Login } from './Login';
import { Palette, useColorSchemeDynamic, useColors } from '../components/MyColors'
import { PINCheck } from './PINCheck';
import { TwoStepVerify } from './TwoStepVerify';
import { Session, useSession } from '../stores/Session';
import { TwoStepContactInfo } from '../net/TwoStepAuth';
import { MySimpleChoiceModal } from '../components/MySimpleChoiceModal';

export const App = () => {
    const Colors: Palette = useColors();
    const isDarkMode = useColorSchemeDynamic() === "dark";
    const appState: AppState = useItem("appState");
    const contactInfo: TwoStepContactInfo = useItem("contactInfo");
    const modals: Modal[] = useItem("modals");
    const session: Session = useSession();
    const content = (() => {
        if (session?.deviceRegistered) {
            return <Dashboard />;
        } else if (session?.deviceRegistered == false && contactInfo) {
            return <TwoStepVerify contact={contactInfo} />;
        } else {
            switch (appState) {
                case "login": return <Login />;
                case "forgot": return <ForgotInfo />;
            }
        }
    })();
    return (<>
        <SafeAreaView key={appState} style={{ backgroundColor: Colors.background, flex: 1 }}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            {content}
        </SafeAreaView>
        {modals.map((m, i) => {
            const key = `${m.viewModel.type}-${i}`
            switch (m.viewModel.type) {
                case "MySimpleChoice":
                    return <MySimpleChoiceModal key={key} items={m.viewModel.items} title={m.viewModel.title} onCancel={() => m.resolver({type: "cancel"})} onSelect={(item) => m.resolver({type: "choice", selection: item})} />;
                case "PIN":
                    return <PINCheck key={key} onCancel={() => m.resolver({type: "cancel"})} onSelect={(pin) => m.resolver({type: "pin", pin: pin})}/>;
            }
        })}
    </>);
};

