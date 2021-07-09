package com.widgetpro;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;

import androidx.core.app.NotificationCompat;

import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;
import javax.annotation.Nullable;

public class EvaluationTaskService extends HeadlessJsTaskService {
    @Override
    protected @Nullable HeadlessJsTaskConfig getTaskConfig(Intent intent) {
        Bundle extras = intent.getExtras();
        if (extras != null) {
            return new HeadlessJsTaskConfig(
                    "EvaluationTask",
                    Arguments.fromBundle(extras),
                    5000, // timeout for the task
                    false // optional: defines whether or not  the task is allowed in foreground. Default is false
            );
        }
        return null;
    }

    // https://github.com/invertase/react-native-firebase/issues/906
    // https://codechacha.com/ko/invalid-channel-for-service-notification/
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        HeadlessJsTaskConfig taskConfig = getTaskConfig(intent);
        if (taskConfig != null) {

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                createNotificationChannel();
                NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder(this, "widgetPro")
                        .setSmallIcon(R.mipmap.ic_launcher)
                        .setContentTitle("WidgetPro")
                        .setContentText("WidgetPro js")
                        .setPriority(NotificationCompat.PRIORITY_HIGH)
                        .setCategory(NotificationCompat.CATEGORY_CALL);

                Notification notification = notificationBuilder.build();
                int NOTIFICATION_ID = 12345;
                startForeground(NOTIFICATION_ID, notification);
                startTask(taskConfig);
            } else {
                startTask(taskConfig);
            }

            return START_REDELIVER_INTENT;
        }
        return START_NOT_STICKY;
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationManager manager = getBaseContext().getSystemService(NotificationManager.class);

            NotificationChannel serviceChannel = new NotificationChannel(
                    "widgetPro",
                    "widgetPro",
                    NotificationManager.IMPORTANCE_NONE
            );
            manager.createNotificationChannel(serviceChannel);
        }
    }
}