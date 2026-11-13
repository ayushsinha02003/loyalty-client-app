package com.client

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent

class NotificationPublisher : BroadcastReceiver() {
    companion object {
        const val NOTIFICATION_ID = "notification_id"
        const val NOTIFICATION_TITLE = "notification_title"
        const val NOTIFICATION_MESSAGE = "notification_message"
    }

    override fun onReceive(context: Context, intent: Intent) {
        val id = intent.getIntExtra(NOTIFICATION_ID, 1001)
        val title = intent.getStringExtra(NOTIFICATION_TITLE) ?: "LoyaltyApp"
        val message = intent.getStringExtra(NOTIFICATION_MESSAGE) ?: "You have new updates in your loyalty wallet."

        NotificationHelper.showNotification(context, id, title, message)
    }
}

