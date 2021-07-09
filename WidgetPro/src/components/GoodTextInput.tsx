import React, { MutableRefObject, useRef } from "react";
import { StyleSheet } from "react-native";
import { TextInputProps } from "react-native";
import { TextInput } from "react-native";

const styles = StyleSheet.create({
    textInput: {
        borderBottomWidth: 1,
        borderColor: 'gray',
        borderStyle: 'solid'
    }
});

const GoodTextInput = ({ textRef, ...props }: { textRef: MutableRefObject<string> }&TextInputProps) => {
    function onChangeText(text: string) {
        textRef.current = text;
    }
    return (
        <TextInput style={styles.textInput} onChangeText={onChangeText} defaultValue={textRef.current} {...props}/>
    )
};

export default GoodTextInput;