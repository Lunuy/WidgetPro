package com.widgetpro;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ActivityNotFoundException;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.widget.RemoteViews;
import android.widget.Toast;

import androidx.annotation.RequiresApi;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.CatalystInstance;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.common.ArrayUtils;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.StringJoiner;
import java.util.stream.IntStream;

import static android.content.Intent.FLAG_ACTIVITY_NEW_TASK;

class DBHelper extends SQLiteOpenHelper {
    public DBHelper(Context context, String name, SQLiteDatabase.CursorFactory factory, int version) {
        super(context, name, factory, version);
    }
    @Override
    public void onCreate(SQLiteDatabase db) {}
    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {}
}

enum WidgetTypeColumnIndex {
    id(0),
    name(1),
    code(2),
    bgColor(3),
    textColor(4),
    buttonText(5);

    private final int value;
    private WidgetTypeColumnIndex(int value) {
        this.value = value;
    }
    public int v() {
        return value;
    }
}


/**
 * Implementation of App Widget functionality.
 */
public class ButtonWidget extends AppWidgetProvider {
    private static final String OnClick = "OnClick";

    private String id;

    private JSONObject getData(Context context) throws JSONException {
        SharedPreferences sharedPref = context.getSharedPreferences("DATA", Context.MODE_PRIVATE);
        String appString = sharedPref.getString("appData", "{}");
        JSONObject appData = new JSONObject(appString);
        return appData;
    }

    private Cursor getWidgetTypeData(Context context, String widgetTypeId) {
        SQLiteOpenHelper dbHelper = new DBHelper(context, "widgetPro"
                , null, 1);
        SQLiteDatabase db = dbHelper.getWritableDatabase();

        Cursor c = db.rawQuery("SELECT * FROM widgetType WHERE id=?", new String[]{widgetTypeId});
        c.moveToNext();

        return c;
    }

    private void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.button_widget);

        try {
            JSONObject data = getData(context);

            if (data.has(Integer.toString(appWidgetId))) {
                String widgetTypeId = data.getString(Integer.toString(appWidgetId));

                Cursor c = getWidgetTypeData(context, widgetTypeId);

                String bgColor = c.getString(WidgetTypeColumnIndex.bgColor.v());
                String textColor = c.getString(WidgetTypeColumnIndex.textColor.v());
                String text = c.getString(WidgetTypeColumnIndex.buttonText.v());

                views.setInt(R.id.box, "setBackgroundColor", Color.parseColor(bgColor));
                views.setTextColor(R.id.appwidget_text, Color.parseColor(textColor));
                views.setTextViewText(R.id.appwidget_text, text);
            } else {
                views.setTextViewText(R.id.appwidget_text, "CLICK TO SETUP");
            }
            views.setOnClickPendingIntent(R.id.box, getPendingSelfIntent(context, OnClick, appWidgetId));
        } catch(JSONException e) {
            Toast.makeText(context, "UpdateWidget JSON ERROR", Toast.LENGTH_SHORT).show();
        }

        appWidgetManager.updateAppWidget(appWidgetId, views);
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);
        if(OnClick.equals(intent.getAction())) {
            int widgetId = intent.getIntExtra("widgetId", -1);

            try {
                JSONObject data = getData(context);
                if(!data.has(Integer.toString(widgetId))) {
                    Intent mainIntent = new Intent(context, MainActivity.class);
                    mainIntent.putExtra("setupWidget", widgetId);
                    mainIntent.addFlags(FLAG_ACTIVITY_NEW_TASK);
                    context.startActivity(mainIntent);
                } else {
                    String widgetTypeId = data.getString(Integer.toString(widgetId));
                    Cursor c = getWidgetTypeData(context, widgetTypeId);

                    String code = c.getString(WidgetTypeColumnIndex.code.v());

                    // send to React Native
                    Intent service = new Intent(context, EvaluationTaskService.class);
                    Bundle bundle = new Bundle();

                    bundle.putString("code", code);
                    service.putExtras(bundle);

                    context.startForegroundService(service);
                }
            } catch(JSONException e) {
                Toast.makeText(context, "UpdateWidget JSON ERROR", Toast.LENGTH_SHORT).show();
            }
        }
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        // There may be multiple widgets active, so update all of them
        for (int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId);
        }
    }

    @Override
    public void onEnabled(Context context) {
        // Enter relevant functionality for when the first widget is created
    }

    @Override
    public void onDisabled(Context context) {
        // Enter relevant functionality for when the last widget is disabled
    }

    // https://stackoverflow.com/questions/23220757/android-widget-onclick-listener-for-several-buttons/27398043
    // https://devmingsa.tistory.com/11
    protected PendingIntent getPendingSelfIntent(Context context, String action, int widgetId) {
        Intent intent = new Intent(context, getClass());
        intent.setAction(action);
        intent.putExtra("widgetId", widgetId);
        return PendingIntent.getBroadcast(context, widgetId, intent, PendingIntent.FLAG_CANCEL_CURRENT);
    }
}