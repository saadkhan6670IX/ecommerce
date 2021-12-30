import { Dimensions, Platform, PixelRatio, StyleSheet } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

// export const colors = {
//   primary: '#FFC700',
//   primaryLight: 'rgba(255,199,0,0.1)',
//   secondary: '#000000',
//   third: 'rgb(245,245,245)',
//   background: '#F3F5F9',
//   button: '#7b4df8',
//   darkBackground: '#24292e',
//   lightBackground: 'rgb(248,248,248)',
//   grey: '#a3a3a3',
//   error: '#A62122',
//   yellow: 'rgb(254,239,93)',
//   borderColor: 'grey',
//   lightGrey: 'rgb(245,245,245)',
//   darkGray: 'rgb(216,216,216)',
//   rating: '#ffdd65',
//   blue: 'rgb(57,198,192)',
//   greyText: '#8D8080',
//   inputGreyBg: '#F9F9F9',
//   authBackground: 'white',
// };

export const FontClass = (function Fonts() {

  this.fontsObj = {
    light: 'Graphik-Light',
    medium: 'Graphik-Medium',
    regular: 'Graphik-Regular',
    semibold: 'Graphik-Semibold',
    bold: 'Graphik-Bold',
  };

  updateFonts = (object) => {
    Object.assign(this.fontsObj, object);
  };

  const getFonts = () => {
    return this.fontsObj;
  };

  return {
    updateFonts,
    getFonts,
  };
})();

export const fonts = FontClass.getFonts();

export const ColorClass = (function Colors() {
  this.obj = {
    primary: '#000000',
    primaryLight: '#000000',
    primaryBtnBackcolor: '#FFC700',
    primaryBtnTextcolor: '#000000',
    secondaryBtnBackcolor: '#FFC700',
    secondaryBtnTextcolor: '#000000',
    secondary: '#000000',
    third: 'rgb(245,245,245)',
    background: '#F3F5F9',
    button: '#7b4df8',
    darkBackground: '#24292e',
    lightBackground: 'rgb(248,248,248)',
    grey: '#a3a3a3',
    error: '#A62122',
    yellow: 'rgb(254,239,93)',
    borderColor: 'grey',
    lightGrey: 'rgb(245,245,245)',
    darkGray: 'rgb(216,216,216)',
    rating: '#ffdd65',
    blue: 'rgb(57,198,192)',
    greyText: '#8D8080',
    inputGreyBg: '#F9F9F9',
    authBackground: 'white',
    delivered: '#02CC40',
    onRoute: '#0A3AD9',
    pending: '#FF9901',
    cancelled: '#FD838A',
    placeHolder: 'black',
    introTitle: '#3A3A3A',
    introDescription: '#989898',
    greyishBlack: '#59666C',
    transparent: '#66000000',
  };

  updateColors = (object) => {
    Object.assign(this.obj, object);
  };

  const getColors = () => {
    return this.obj;
  };

  return {
    updateColors,
    getColors,
  };
})();

export const colors = ColorClass.getColors();
// export const colors = ColorClass.getColors();

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const metrics = {
  width: width,
  height: height,
  defaultMargin: Dimensions.get('window').width * 0.04,
  smallMargin: width * 0.03,
  largeMargin: width * 0.08,
};

export const scaleFont = (size) => RFValue(size);

// export const fonts = {
//   primary: Platform.select({
//     android: '',
//     ios: 'Avenir-Medium',
//   }),
//   primaryBold: Platform.select({
//     android: '',
//     ios: 'MyanmarSangamMN-Bold',
//   }),
//   secondary: Platform.select({
//     android: '',
//     ios: 'Avenir-Medium',
//   }),
//   secondaryBold: Platform.select({
//     android: '',
//     ios: 'Avenir-Medium',
//   }),
// };

export const text = {
  largeheading: {
    fontSize: RFValue(25),
    // fontWeight: '700',
  },
  heading: {
    fontSize: RFValue(20),
    // fontWeight: '700',
    marginHorizontal: metrics.defaultMargin,
    marginTop: metrics.defaultMargin,
    marginBottom: metrics.smallMargin,
    color: colors.secondary,
  },
  subheading: {
    fontSize: RFValue(18),
    // color: colors.primary,
    // fontWeight: 'bold',
  },
  caption: {
    fontSize: RFValue(18),
    color: colors.greyText,
    // fontWeight: 'bold',
  },
};

export const commonstyles = {
  container: {
    marginHorizontal: metrics.width * 0.02,
  },
  VerticalListContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: '5%',
    marginHorizontal: 8,
    // borderRadius: 10,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  xxlText: {
    fontSize: RFValue(35),
    // fontWeight: '700',
    textAlign: 'center',
  },
  xlText: {
    fontSize: RFValue(30),
    // fontWeight: '700',
    textAlign: 'center',
  },
  largeText: {
    fontSize: RFValue(25),
    // fontWeight: '600',
    textAlign: 'center',
  },
  heading: {
    fontSize: RFValue(25),
    // fontWeight: '600',
    textAlign: 'center',
  },
  smallheading: {
    fontSize: RFValue(22),
    // fontWeight: '600',
    textAlign: 'center',
  },
  subheading: {
    fontSize: RFValue(22),
    // fontWeight: '300',
    color: colors.greyText,
    textAlign: 'center',
  },
  smallText: {
    fontSize: RFValue(18),
    // fontWeight: 'bold',
  },
  smallText16: {
    fontSize: RFValue(16),
  },

  xsText: {
    fontSize: RFValue(14),
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingVertical: metrics.smallMargin,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coloumnCenter: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoStyle: {
    width: metrics.width * 0.2,
    height: metrics.width * 0.2,
    alignSelf: 'center',
    marginVertical: metrics.defaultMargin * 2,
  },
  customerSupportText: {
    fontSize: scaleFont(13),
    color: colors.primaryLight,
    lineHeight: metrics.width / 15,
  },
};
