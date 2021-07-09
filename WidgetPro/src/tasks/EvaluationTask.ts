import { ToastAndroid, Vibration } from "react-native";
import Torch from 'react-native-torch';

export default async function evalCode({ code }: { code: string }) {
    try {
        eval(`
        ((ToastAndroid, fetch, Vibration, Torch) => {
        ${code}
        })
        `)(ToastAndroid, fetch, Vibration, Torch);
    } catch(e) {
        ToastAndroid.show(String(e), ToastAndroid.LONG);
    }
}