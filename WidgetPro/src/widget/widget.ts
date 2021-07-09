import { BackHandler, ToastAndroid } from "react-native";
import { NativeModules } from 'react-native';

const SharedStorage = NativeModules.SharedStorage;

export async function setupWidget(widgetId: number, widgetTypeDataId: string) {
    const r = await SharedStorage.get();
    const data = JSON.parse(r);

    SharedStorage.set(
        JSON.stringify({
            ...data,
            [widgetId]: widgetTypeDataId
        })
    );

    BackHandler.exitApp();
}

export function updateWidget() {
    SharedStorage.update();
}