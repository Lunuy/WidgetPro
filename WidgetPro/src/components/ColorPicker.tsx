
import React, { useState } from 'react';
import { useEffect } from 'react';
import { View } from 'react-native';
//@ts-ignore
import HsvColorPicker from 'react-native-hsv-color-picker';
import convert from 'color-convert';

const ColorPicker = ({ onColorChange, initColor }: { onColorChange: (color: string) => void, initColor: string }) => {
    const initHSV = convert.hex.hsv(initColor.substr(1));
    const [hue, setHue] = useState(initHSV[0]);
    const [sat, setSat] = useState(initHSV[1]/100);
    const [val, setVal] = useState(initHSV[2]/100);

    useEffect(() => {
        onColorChange('#' + convert.hsv.hex([hue, sat*100, val*100]));
    }, [hue, sat, val]);


    function onHueChange({ hue }: { hue: number }) {
        setHue(hue);
    }
    function onSatValChange({ saturation, value }: { saturation: number, value: number }) {
        setSat(saturation);
        setVal(value);
    }

    return (
      <View>
        <HsvColorPicker
          huePickerHue={hue}
          onHuePickerDragMove={onHueChange}
          onHuePickerPress={onHueChange}
          satValPickerHue={hue}
          satValPickerSaturation={sat}
          satValPickerValue={val}
          onSatValPickerDragMove={onSatValChange}
          onSatValPickerPress={onSatValChange}
        />
      </View>
    );
}

export default ColorPicker;