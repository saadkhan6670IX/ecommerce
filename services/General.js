import {useTranslation} from 'react-i18next';

export const getTranslatedText = (text) => {
  const {t} = useTranslation();
  return t(text);
};
