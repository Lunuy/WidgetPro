import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ColorPicker from "../components/ColorPicker";
import Space from '../components/Space';


const ColorPickerPage = ({ setColor, initColor }: { setColor: (color: string) => void, initColor: string }) => {
    function submit() {
        Actions.pop();
    }

    return (
        <View style={styles.view}>
            <ColorPicker onColorChange={setColor} initColor={initColor}/>
            <Space h={20}/>
            <Button title="OK" onPress={submit}/>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        paddingLeft: 10,
        paddingRight: 10
    }
})

export default ColorPickerPage;