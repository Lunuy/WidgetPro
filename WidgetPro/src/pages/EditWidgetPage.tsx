

import React, { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ColorInput from '../components/ColorInput';
import GoodTextInput from '../components/GoodTextInput';
import LabeledTextInput from '../components/LabeledTextInput';
import Space from '../components/Space';
import { WidgetTypeData } from '../components/WidgetTypeList';
import { updateWidgetType } from '../db/widget';
import { updateWidget } from '../widget/widget';

const EditWidgetPage = ({ widgetTypeData }: { widgetTypeData: WidgetTypeData }) => {
    const nameRef = useRef(widgetTypeData.name);
    const codeRef = useRef(widgetTypeData.code);
    const buttonTextRef = useRef(widgetTypeData.buttonText);
    const bgColorRef = useRef(widgetTypeData.bgColor);
    const textColorRef = useRef(widgetTypeData.textColor);

    async function submit() {
        await updateWidgetType({
            id: widgetTypeData.id,
            name: nameRef.current,
            code: codeRef.current,
            bgColor: bgColorRef.current,
            textColor: textColorRef.current,
            buttonText: buttonTextRef.current
        });
        updateWidget();
        Actions.pop();
        setTimeout(() => Actions.refresh({ refresh: Math.random() }), 0);
    }

    return (
        <View style={styles.view}>
            <LabeledTextInput label="Name" textRef={nameRef} placeholder="Widget name"/>
            <LabeledTextInput label="Code" textRef={codeRef} multiline={true} placeholder="Widget main code"/>
            <LabeledTextInput label="Button text" textRef={buttonTextRef} multiline={true} placeholder="Button text"/>
            <ColorInput label="Text color" colorRef={textColorRef}/>
            <ColorInput label="Background color" colorRef={bgColorRef}/>

            <Space h={20}/>
            <Button title="OK" onPress={submit}/>
        </View>
    )
};

const styles = StyleSheet.create({
    view: {
        padding: 10,
        paddingTop: 0
    }
});

export default EditWidgetPage;