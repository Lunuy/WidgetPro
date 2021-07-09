

import React, { useRef, useState } from 'react';
import { ScrollView, Text, ToastAndroid, View, Button, StyleSheet, BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';
import WidgetTypeList, { WidgetTypeData } from '../components/WidgetTypeList';
import { useEffect } from 'react';
import { useAsync } from 'react-use';
import { getWidgetTypes, insertWidgetType } from '../db/widget';
import { nanoid } from 'nanoid/non-secure';


function randomColor() {
    return "#" + Math.floor(Math.random()*(16**6)).toString(16).padStart(6, '0');
}


const WidgetTypeListPage = ({ refresh }: { refresh: number }) => {

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => { if(Actions.currentScene === 'WidgetTypeList') { BackHandler.exitApp(); } else { return false; } return true; }
        );

        return backHandler.remove;
    }, []);

    const [widgetTypeDatas, setWidgetTypeDatas] = useState<WidgetTypeData[]>([]);

    useEffect(() => {
        (async () => {
            setWidgetTypeDatas(await getWidgetTypes());
        })();
    }, [refresh]);

    async function addWidgetType() {
        const widgetTypeData: WidgetTypeData = {
            id: nanoid(),
            name: 'CLICK TO EDIT',
            code: '',
            bgColor: randomColor(),
            textColor: randomColor(),
            buttonText: ''
        };
        insertWidgetType(widgetTypeData);
        (async () => {
            setWidgetTypeDatas(await getWidgetTypes());
        })();
    }

    function openWidgetTypeEditor(widgetTypeData: WidgetTypeData) {
        Actions.EditWidget({ widgetTypeData });
    }

    return (
        <View style={{flex: 1}}>
            <WidgetTypeList widgetTypeDatas={widgetTypeDatas} onClickItem={openWidgetTypeEditor}/>
            <View style={{borderWidth:1,position:'absolute',bottom:0,alignSelf:'flex-end'}}>
                <Button
                    onPress={addWidgetType}
                    title=" + "
                    color="#555555"
                    accessibilityLabel="Press"/>
            </View>
        </View>
    )
};

export default WidgetTypeListPage;