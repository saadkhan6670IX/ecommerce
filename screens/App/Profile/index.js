import React, {useEffect, useState} from 'react';
import ThemeOneProfile from './ThemeOneProfile';
import NotLoggedIn from '../../Auth/NotLoggedIn';
import {getUserProfile, updateUserProfile} from '../../../services/Account';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../../../store/User/action';
import {successMessage} from '../../../utils/Toast';

export default function index(props) {
  const loggedInUser = useSelector((state) => state.userReducer.user);

  const [loader, setloader] = useState(false);
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);
  const dispatchAction = useDispatch();
  const [base64image, setbase64image] = useState(null);
  const [imageSource, setImageSource] = React.useState(null);

  useEffect(() => {
    // setloader(true);
    if (isLoggedIn) {
      getUserProfile()
        .then((response) => {
          if (response.status == 200) {
            dispatchAction(setUser(response.data.data));
          }

          // setloader(false);
        })
        .catch((error) => {
          // setloader(false);
        });
    }
  }, []);

  const updateProfileAction = (user) => {
    setloader(true);
    updateUserProfile(user)
      .then((response) => {
        setloader(false);
        if (response.status == 200) {
          dispatchAction(setUser(response.data.data));
          setImageSource(null);
          setbase64image(null);
          successMessage('Profile Updated Successfully');
        }
      })
      .catch((error) => {
        setloader(false);
      });
  };

  const showUserProfile = () => {
    return (
      <ThemeOneProfile
        onButtonPress={updateProfileAction}
        loader={loader}
        base64image={base64image}
        setbase64image={setbase64image}
        imageSource={imageSource}
        setImageSource={setImageSource}
        user={loggedInUser}
        updateProfileAction={updateProfileAction}
        {...props}></ThemeOneProfile>
    );
  };

  const showIsNotLoggedIn = () => {
    return <NotLoggedIn></NotLoggedIn>;
  };

  return isLoggedIn ? showUserProfile() : showIsNotLoggedIn();
}
