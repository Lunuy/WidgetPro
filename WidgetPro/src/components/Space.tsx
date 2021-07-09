import React from "react";
import { View } from "react-native";


const Space = ({ h }: { h: number }) => {
    return (
        <View style={{
            height: h
        }}/>
    );
}

export default Space;