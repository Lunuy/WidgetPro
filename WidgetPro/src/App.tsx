/**
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useRef, useState } from 'react';
import {
    Modal,
    StyleSheet
} from 'react-native';
import { Router, Stack, Scene, Overlay } from 'react-native-router-flux';
import WidgetTypeListPage from './pages/WidgetTypeListPage';
import EditWidgetPage from './pages/EditWidgetPage';
import { WidgetContext } from './components/WidgetContext';
import ColorPickerPage from './pages/ColorPickerPage';

const App = ({ setupWidget }: { setupWidget?: number }) => { // setupWidget from Activity intent
    return (
        <WidgetContext.Provider value={{ setupWidget }}>
            <Router>
                <Overlay key="overlay">
                    <Modal key="modal"> 
                        <Scene key="root" hideNavBar>
                            <Scene key="WidgetTypeList" component={WidgetTypeListPage} initial={true} title="Widget type list" hideNavBar={false}></Scene>
                        </Scene>
                        <Scene key="EditWidget" component={EditWidgetPage} hideNavBar={false} title="Edit widget"></Scene>
                        <Scene key="ColorPicker" component={ColorPickerPage} hideNavBar={false} title="Color picker"></Scene>
                    </Modal>
                </Overlay>
            </Router>
        </WidgetContext.Provider>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default App;
function setText(text: string): void {
    throw new Error('Function not implemented.');
}

