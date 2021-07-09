
import { ToastAndroid } from 'react-native';
import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';
SQLite.enablePromise(true);

// const DB: { db: SQLiteDatabase } = { db: null as any };

// (
//     SQLite.openDatabase({
//         name: 'widgetPro',
//         location: 'default',
//         createFromLocation: '~www/widgetPro.db'
//     }, ()=>{}, ()=>{}) as unknown as Promise<SQLiteDatabase>
// ).then(db => DB.db = db);

// export default DB;

export const db = (
    SQLite.openDatabase({
        name: 'widgetPro',
        location: 'default',
        createFromLocation: '~www/widgetPro.db'
    }, ()=>{}, ()=>{}) as unknown as Promise<SQLiteDatabase>
);