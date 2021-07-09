import React from "react";

export interface WidgetInfo {
    setupWidget: number | undefined;
}

export const WidgetContext = React.createContext<WidgetInfo>({
    setupWidget: undefined
});