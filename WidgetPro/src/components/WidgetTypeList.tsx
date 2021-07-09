

import React, { useRef, useState } from 'react';
import { ScrollView, Text, ToastAndroid, View } from 'react-native';
import WidgetType from './WidgetType';

export interface WidgetTypeData {
    id: string;
    name: string;
    code: string;
    bgColor: string;
    textColor: string;
    buttonText: string;
};

const WidgetTypeList = ({ widgetTypeDatas, onClickItem }: { widgetTypeDatas: WidgetTypeData[], onClickItem: (widgetTypeData: WidgetTypeData) => void }) => {
    return (
        <ScrollView>
            {
                widgetTypeDatas.map(widgetTypeData =>
                    <WidgetType key={widgetTypeData.id} widgetTypeData={widgetTypeData} onClick={() => {
                        onClickItem(widgetTypeData);
                    }}/>
                )
            }
        </ScrollView>
    )
};

export default WidgetTypeList;