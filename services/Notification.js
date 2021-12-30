import {AuthAPI as NotificationAPI} from '../utils/Axios';

export const getNotifications = (page = 1) => {
  return NotificationAPI.get('/api/v1/customer/get-notifications?page=' + page);
};

export const markNotificationsAsRead = (page = 1) => {
  return NotificationAPI.get('/api/v1/customer/read-notification');
};
