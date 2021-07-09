import React, { MutableRefObject, useState } from "react";
import { useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { Actions } from "react-native-router-flux";


const ColorInput = ({ label, colorRef }: { label: string, colorRef: MutableRefObject<string> }) => {
    const [color, setColor] = useState(colorRef.current);

    useEffect(() => {
        colorRef.current = color;
    }, [color]);

    function openColorPicker() {
        Actions.ColorPicker({ setColor, initColor: color });
    }

    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity style={{
                backgroundColor: color,
                height: 50,
                borderWidth: 1,
                borderColor: 'black'
            }} onPress={openColorPicker}/>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        paddingTop: 15
    }
})

export default ColorInput;