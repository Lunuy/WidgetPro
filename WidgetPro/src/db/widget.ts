import { WidgetTypeData } from "../components/WidgetTypeList";
import { db } from "./db";


export async function getWidgetTypes(): Promise<WidgetTypeData[]> {
    const result = await (await db).executeSql('SELECT * FROM widgetType');
    return result[0].rows.raw();
}

export async function insertWidgetType({ id, name, code, bgColor, textColor, buttonText }: WidgetTypeData) {
    await (await db).executeSql('INSERT INTO widgetType VALUES(?, ?, ?, ?, ?, ?)', [id, name, code, bgColor, textColor, buttonText]);
}

export async function updateWidgetType({ id, name, code, bgColor, textColor, buttonText }: WidgetTypeData) {
    await (await db).executeSql('UPDATE widgetType SET id=?, name=?, code=?, bgColor=?, textColor=?, buttonText=? WHERE id=?', [id, name, code, bgColor, textColor, buttonText, id])
}