import React, { MutableRefObject, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInputProps } from "react-native";
import { TextInput } from "react-native";
import GoodTextInput from "./GoodTextInput";

const styles = StyleSheet.create({
    view: {
    },
    labelText: {
        paddingTop: 15
    }
});

const LabeledTextInput = ({ label, ...props }: { label: string }&Parameters<typeof GoodTextInput>[0]) => {
    return (
        <View style={styles.view}>
            <Text style={styles.labelText}>{label}</Text>
            <GoodTextInput {...props}/>
        </View>
    )
};

export default LabeledTextInput;