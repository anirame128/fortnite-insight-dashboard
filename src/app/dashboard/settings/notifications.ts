// src/app/dashboard/settings/notifications.ts

type NotificationType = 'success' | 'error';

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
}

class NotificationManager {
  private notifications: Notification[] = [];

  public addNotification(type: NotificationType, message: string): void {
    const id = this.generateId();
    this.notifications.push({ id, type, message });
    this.displayNotification({ id, type, message });
  }

  public removeNotification(id: string): void {
    this.notifications = this.notifications.filter(notification => notification.id !== id);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private displayNotification(notification: Notification): void {
    // Implement the logic to display the notification to the user
    // This could be a toast, modal, etc.
    console.log(`${notification.type.toUpperCase()}: ${notification.message}`);
    
    // Automatically remove the notification after a timeout
    setTimeout(() => this.removeNotification(notification.id), 5000);
  }
}

const notificationManager = new NotificationManager();

export const notifySuccess = (message: string) => {
  notificationManager.addNotification('success', message);
};

export const notifyError = (message: string) => {
  notificationManager.addNotification('error', message);
};