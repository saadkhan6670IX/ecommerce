import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ThemeOneIntro from './ThemeOneIntro';
import {useSelector, useDispatch} from 'react-redux';

import {getIntro} from '../../services/AppSettings';
import {Loader} from '../../components';
import SplashLoader from '../../components/SplashLoader/ThemeOneSplashLoader';
import NoInternet from '../../components/NoInternet';

export default function index(props) {
  const themeNumber = useSelector((state) => state.themeReducer.themeNumber);
  const language = useSelector((state) => state.userReducer.language);

  const logo = useSelector((state) => state.themeReducer.logo);
  const [introData, setintroData] = useState([]);
  const [loading, setloading] = useState(true);
  const [noInternet, setnoInternet] = useState(false);

  useEffect(() => {
    getIntro()
      .then((response) => {
        //serializing object
        setnoInternet(false);
        setloading(false);
        var slides = response.data.data.map((val, index) => {
          return {
            key: 'key' + index,
            title: val.title[language],
            text: val.sub_title[language],
            image: {uri: val.image[language]},
          };
        });
        setintroData(slides);
      })
      .catch((err) => {
        if (err.status === 408) {
          setnoInternet(true);
          setloading(false);
        }
      });
  }, []);

  if (loading) {
    return <Loader containerStyle={{backgroundColor: 'white'}}></Loader>;
  }

  if (noInternet) {
    return <NoInternet></NoInternet>;
  }
  console.log('LOGO: -->', logo);

  return (
    <ThemeOneIntro
      data={introData}
      logo={logo}
      language={language}
      {...props}></ThemeOneIntro>
  );
}

const styles = StyleSheet.create({});
