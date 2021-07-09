import React from "react";
import { useContext } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { setupWidget } from "../widget/widget";
import { WidgetContext } from "./WidgetContext";
import { WidgetTypeData } from "./WidgetTypeList";


const WidgetType = ({ widgetTypeData: { bgColor, textColor, name, id }, onClick }: { widgetTypeData: WidgetTypeData, onClick: ()=>void }) => {
    const widgetContext = useContext(WidgetContext);

    function setWidget() {
        setupWidget(widgetContext.setupWidget as number, id);
    }

    const onClickF = (widgetContext.setupWidget !== undefined && widgetContext.setupWidget !== null) ? setWidget : onClick;

    return (
        <View>
            <TouchableHighlight onPress={onClickF} activeOpacity={0.9}>
                <View style={{
                    ...styles.outerBox,
                    backgroundColor: bgColor
                }}>
                    <Text style={{ color: textColor }}>{name}</Text>
                </View>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    outerBox: {
        height: 80,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        borderStyle: 'solid',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    b: {
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10
    },
});

export default WidgetType;