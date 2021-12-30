import React from 'react';
import ThemeOneCategoryCard from './ThemeOneCateogryCard';
import {useSelector} from 'react-redux';
import Navigator from '../../utils/Navigator';
import ScreenConst from '../../constants/ScreenConst';

export default function index(props) {
  const themeNumber = useSelector((state) => state.themeReducer.themeNumber);
  const language = useSelector((state) => state.userReducer.language);

  const onCardPress = () => {
    const hasSubCategories = props.item?.sub_filter?.length > 0;
    if (hasSubCategories) {
      Navigator.push(ScreenConst.subCategories, {
        headerTitle: props.item.name[language],
        subCategories: props.item.sub_filter,
      });
    } else {
      Navigator.navigate(ScreenConst.allProducts, {
        category: props.item,
        headerTitle: props.item.name[language],
      });
    }
  };

  switch (themeNumber) {
    case 1:
      return (
        <ThemeOneCategoryCard
          onPress={onCardPress}
          language={language}
          {...props}></ThemeOneCategoryCard>
      );

    default:
      return (
        <ThemeOneCategoryCard
          onPress={onCardPress}
          language={language}
          {...props}></ThemeOneCategoryCard>
      );
  }
}
