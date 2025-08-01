// src/app/dashboard/settings/notifications.ts

type NotificationType = 'success' | 'error';

interface Notification {
  id: string;
  message: string;
  type: NotificationType;
}

class NotificationManager {
  private notifications: Notification[] = [];
  private nextId: number = 0;

  public addNotification(message: string, type: NotificationType): string {
    const id = `notification-${this.nextId++}`;
    this.notifications.push({ id, message, type });
    this.renderNotification(id);
    return id;
  }

  public removeNotification(id: string): void {
    this.notifications = this.notifications.filter(notification => notification.id !== id);
    this.clearNotification(id);
  }

  private renderNotification(id: string): void {
    const notificationElement = document.createElement('div');
    notificationElement.id = id;
    notificationElement.innerText = this.notifications.find(n => n.id === id)?.message;
    notificationElement.className = `notification ${this.notifications.find(n => n.id === id)?.type}`;
    
    document.body.appendChild(notificationElement);
    
    setTimeout(() => {
      this.removeNotification(id);
    }, 5000); // Auto-remove after 5 seconds
  }

  private clearNotification(id: string): void {
    const notificationElement = document.getElementById(id);
    if (notificationElement) {
      notificationElement.remove();
    }
  }
}

const notificationManager = new NotificationManager();

export const showSuccessNotification = (message: string) => {
  notificationManager.addNotification(message, 'success');
};

export const showErrorNotification = (message: string) => {
  notificationManager.addNotification(message, 'error');
};