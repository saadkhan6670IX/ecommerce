import React, { useEffect, useState } from 'react';
import ThemeOneNotification from './ThemeOneNotification';
import { useSelector, useDispatch } from 'react-redux';
import {
  getNotifications,
  markNotificationsAsRead,
} from '../../../services/Notification';
import { setNotificationCount } from '../../../store/User/action';
import { LayoutAnimation } from 'react-native';

export default function index() {
  const themeNumber = useSelector((state) => state.themeReducer.themeNumber);
  const language = useSelector((state) => state.userReducer.language);
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);
  const [paginationLoader, setpaginationLoader] = useState(false);
  const [pageNo, setpageNo] = useState(1);
  const [totalPages, settotalPages] = useState(1);

  const notification_count = useSelector(
    (state) => state.userReducer.notification_count,
  );
  const [notificatoins, setnotificatoins] = useState([]);
  const [loader, setloader] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const notification_count_temp = notification_count;
    dispatch(setNotificationCount(0));
    if (isLoggedIn) {
      markNotificationsAsRead()
        .then((res) => {
          if (res.status !== 200) {
            dispatch(setNotificationCount(notification_count_temp));
          }
        })
        .catch((err) => {
          console.log(err);
          dispatch(setNotificationCount(notification_count_temp));
        });
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setpaginationLoader(true);

      setloader(true);
      getNotifications(pageNo).then((res) => {
        setloader(false);
        console.log('getNotifications', res);
        settotalPages(res.data.total_pages);
        dispatch(setNotificationCount(res.data.total));
        const data = res.data.data.map((val) => {
          return {
            id: val.id,
            title: val.message[language],
            time: val.time,
            description: val.description[language],
          };
        });


        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear)
        if (pageNo === 1) {
          setnotificatoins(data);
        } else {
          setnotificatoins([...notificatoins, ...data]);
        }

        setpaginationLoader(false);
      });
    }
  }, [pageNo]);

  switch (themeNumber) {
    case 1:
      return (
        <ThemeOneNotification
          setpageNo={setpageNo}
          pageNo={pageNo}
          totalPages={totalPages}
          paginationLoader={paginationLoader}
          isLoggedIn={isLoggedIn}
          data={notificatoins}
          loader={loader}></ThemeOneNotification>
      );

    default:
      return (
        <ThemeOneNotification
          setpageNo={setpageNo}
          pageNo={pageNo}
          totalPages={totalPages}
          paginationLoader={paginationLoader}
          isLoggedIn={isLoggedIn}
          data={notificatoins}
          loader={loader}></ThemeOneNotification>
      );
  }
}
