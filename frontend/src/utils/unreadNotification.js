export const unreadNotificationsFunc = (notification) => {
    // only filter unread message
    return notification.filter((n) => n.isRead === false)
}