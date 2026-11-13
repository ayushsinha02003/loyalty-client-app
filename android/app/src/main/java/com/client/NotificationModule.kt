package com.client

import android.Manifest
import android.app.AlarmManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class NotificationModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "NotificationModule"

    init {
        NotificationHelper.createNotificationChannel(reactContext)
    }

    @ReactMethod
    fun showNotification(id: Double, title: String, message: String, promise: Promise) {
        try {
            val notificationId = id.toInt()
            NotificationHelper.showNotification(reactContext, notificationId, title, message)
            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("NOTIFICATION_ERROR", e.message, e)
        }
    }

    @ReactMethod
    fun scheduleNotification(
        id: Double,
        title: String,
        message: String,
        delaySeconds: Double,
        promise: Promise
    ) {
        try {
            val notificationId = id.toInt()
            val intent = Intent(reactContext, NotificationPublisher::class.java).apply {
                putExtra(NotificationPublisher.NOTIFICATION_ID, notificationId)
                putExtra(NotificationPublisher.NOTIFICATION_TITLE, title)
                putExtra(NotificationPublisher.NOTIFICATION_MESSAGE, message)
            }

            val pendingIntent = PendingIntent.getBroadcast(
                reactContext,
                notificationId,
                intent,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )

            val alarmManager = reactContext.getSystemService(Context.ALARM_SERVICE) as? AlarmManager
            val triggerTime = System.currentTimeMillis() + (delaySeconds * 1000).toLong()

            if (alarmManager != null) {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                    alarmManager.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, triggerTime, pendingIntent)
                } else {
                    alarmManager.set(AlarmManager.RTC_WAKEUP, triggerTime, pendingIntent)
                }
            }
            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("SCHEDULE_ERROR", e.message, e)
        }
    }

    @ReactMethod
    fun cancelNotification(id: Double, promise: Promise) {
        try {
            val notificationId = id.toInt()
            val intent = Intent(reactContext, NotificationPublisher::class.java)
            val pendingIntent = PendingIntent.getBroadcast(
                reactContext,
                notificationId,
                intent,
                PendingIntent.FLAG_NO_CREATE or PendingIntent.FLAG_IMMUTABLE
            )

            if (pendingIntent != null) {
                val alarmManager = reactContext.getSystemService(Context.ALARM_SERVICE) as? AlarmManager
                alarmManager?.cancel(pendingIntent)
                pendingIntent.cancel()
            }
            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("CANCEL_ERROR", e.message, e)
        }
    }

    @ReactMethod
    fun checkPermission(promise: Promise) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            val status = ContextCompat.checkSelfPermission(
                reactContext,
                Manifest.permission.POST_NOTIFICATIONS
            )
            promise.resolve(status == PackageManager.PERMISSION_GRANTED)
        } else {
            promise.resolve(true)
        }
    }

    @ReactMethod
    fun requestPermission(promise: Promise) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            val activity = currentActivity
            if (activity != null) {
                val status = ContextCompat.checkSelfPermission(
                    reactContext,
                    Manifest.permission.POST_NOTIFICATIONS
                )
                if (status != PackageManager.PERMISSION_GRANTED) {
                    activity.requestPermissions(
                        arrayOf(Manifest.permission.POST_NOTIFICATIONS),
                        101
                    )
                }
                promise.resolve(true)
            } else {
                promise.resolve(false)
            }
        } else {
            promise.resolve(true)
        }
    }
}

