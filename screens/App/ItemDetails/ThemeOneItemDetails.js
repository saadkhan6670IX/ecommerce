import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  RootView,
  Header,
  Tab,
  Input,
  QuantityView,
  Button,
  Loader,
} from '../../../components';
import { Text } from '../../../components';

import { commonstyles, metrics, scaleFont, colors } from '../../../utils/Theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//screen Specific Components
import CheckboxGroup from '../../../components/CheckboxGroup';
import CheckboxMultiSelectGroup from '../../../components/CheckboxMultiSelectGroup';
import ReviewCard from '../../../components/ReviewCard';
import AddReviewModal from '../../../components/AddReviewModal';
import ReviewThreadModal from '../../../components/ReviewThreadModal';
import { successMessage, errorMessage } from '../../../utils/Toast';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Navigator from '../../../utils/Navigator';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { color } from 'react-native-reanimated';
import ImageConst from '../../../constants/ImageConst';
import { formateNumber } from '../../../utils/Helpers';

export default function ThemeOneItemDetails(props) {
  const {
    language,
    reviews,
    details,
    detailsLoader,
    reviewsLoader,
    buttonLoader,
    onAddToCartPress,
    selectedVariation,
    setSelectedVariation,
    showReviewModal,
    showAddReview,
    addReviewAPICall,
    updateReviewAPICall,
    addReviewLoader,
    onBackDropPress,
    showEditReview,
    hideEditReview,
    addReplyToReviewAPICall,
    setAddReviewLoader,
    isCombo,
    setDefaultSelectedVariation,
  } = props;

  const { item } = props.route.params;

  const { id, image } = item;

  const description = details?.description
    ? details?.description
    : item.description;

  const name = details?.name ? details?.name : item?.name ? item?.name : '';
  const sale_price = details?.sale_price
    ? details?.sale_price
    : item?.sale_price
      ? item?.sale_price
      : '';
  const price = details?.price ? details?.price : item.price ? item?.price : '';
  const rating = details?.rating
    ? details?.rating
    : item?.rating
      ? item?.rating
      : '';
  const offer_text = details?.offer_text
    ? details?.offer_text
    : item?.offer_text
      ? item?.offer_text
      : '';

  const [canShowReply, setCanShowReply] = useState(false);

  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);
  const user = useSelector((state) => state.userReducer.user);
  const hasDiscount = Number(sale_price) !== Number(price);

  const ITEMTYPE = Object.freeze({ PRODUCT: 'product', COMBO: 'combo' });

  const callAddReviewAPICall = (params) => {
    addReviewAPICall(params);
  };

  const callupdateReviewAPICall = (params) => {
    reviews[selectedEditReview.index].rating = params.rating;
    updateReviewAPICall(params);
  };

  const cart = useSelector((state) =>
    console.log('Cart=> ', state.cartReducer.items),
  );

  const [activeTab, setactiveTab] = useState(0);

  // const [showReviewModal, setshowReviewModal] = useState(false);
  const [showReviewThreadModal, setshowReviewThreadModal] = useState(false);
  const [editReview, seteditReview] = useState(false);

  const [selectedAddons, setselectedAddons] = useState(props.selectedAddons);
  const [selectedCombos, setselectedCombos] = useState(props.selectedCombos);
  // const [variation, setvariation] = useState(props.selectedVariation);
  const [quantity, setquantity] = useState(props.initialQuantity);
  const [specialInstructions, setspecialInstructions] = useState(
    props.initialDescription,
  );

  const editCart = item?.uuid;
  const [reviewID, setreviewID] = useState(null);
  const [selectedEditReview, setSelectedEditReview] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    console.log('STATING VARIATION:', selectedVariation);
  }, []);

  const onPlusIconPress = () => {
    setquantity((prev) => prev + 1);
  };

  const onMinusIconPress = () => {
    if (quantity > 1) {
      setquantity((prev) => prev - 1);
    }
  };

  const clearState = () => {
    setquantity(1);
    setselectedAddons([]);
    setselectedCombos([]);
    setspecialInstructions('');
    setSelectedVariation(undefined);

  };

  useEffect(() => {
    setDefaultSelectedVariation(undefined);
  }, [selectedVariation]);

  // console.log('details', details);

  const onButtonPress = () => {
    // if (variation) {
    if (specialInstructions.length > 1000) {
      errorMessage(t('specialInstructionsLength'));
    } else {
      if (isCombo) {
        onAddToCartPress({
          // id: item.id,
          // product_id: item.id,
          // price: item.price,
          // name: item.name,
          // image: item.image,
          ...item,
          quantity: quantity,
          variation: [],
          add_ons: [],
          combos: [],
          special_instruction: specialInstructions,
          type: ITEMTYPE.COMBO,
          products: details?.products ? details?.products : [],
        });
        successMessage(
          editCart ? t('cartUpdatedSuccessfully') : t('itemAddSuccessFully'),
        );
      } else {
        if (selectedVariation) {
          onAddToCartPress({
            // id: item.id,
            // product_id: item.id,
            // price: item.price,
            // name: item.name,
            // image: item.image,
            ...item,
            category_id: details.category_id,
            sub_category_id: details.sub_category_id,
            quantity: quantity,
            variation: selectedVariation,
            add_ons: selectedAddons,
            combos: selectedCombos,
            special_instruction: specialInstructions,
            type: ITEMTYPE.PRODUCT,
          });
          successMessage(
            editCart ? t('cartUpdatedSuccessfully') : t('itemAddSuccessFully'),
          );
        } else {
          errorMessage(t('pleaseSelectVariation'));
        }
      }
      if (editCart) {
        Navigator.goBack();
      }

      clearState();
    }
    // } else {
    //   errorMessage(t('pleaseSelectVariation'));
    // }
  };

  //call this function when activeTab = 0
  const renderDetailsTab = () => {
    if (detailsLoader) {
      return (
        <View>
          <Loader></Loader>
        </View>
      );
    }

    const renderComboDeal = (comboProductsArray) => {
      return (
        <View>
          <Text style={styles.comboDetailTitle}>{t('ComboDeal')}</Text>
          <Text style={styles.comboDescription}>
            {comboProductsArray?.toString()}
          </Text>
        </View>
      );
    };

    return (
      <View
        style={{
          paddingHorizontal: metrics.defaultMargin,
          paddingBottom: metrics.defaultMargin,
        }}>
        {details?.calories && details.calories ? (
          <View
            style={{
              ...commonstyles.spaceBetween,
              marginVertical: metrics.smallMargin,
            }}>
            <Text
              style={{
                fontSize: scaleFont(15),
                color: colors.primary,
                // fontWeight: 'bold'
              }}>
              {t('caloriesKCal')}
            </Text>
            <Text style={{ fontSize: scaleFont(15), color: 'black' }}>
              {formateNumber(details?.calories)}
            </Text>
          </View>
        ) : null}

        {details.allergens && details?.allergens?.length > 0 && (
          <View
            style={{
              marginVertical: metrics.smallMargin,
            }}>
            <Text
              style={{
                fontSize: scaleFont(15),
                // fontWeight: 'bold',
                marginBottom: metrics.smallMargin,
                textAlign: 'left',
              }}>
              {t('allergen')}
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {details.allergens.map((val, index) => (
                <Text
                  key={index}
                  style={{
                    fontSize: scaleFont(15),
                    color: colors.primaryLight,
                    marginRight: 5,
                  }}>
                  {val.name[language]}
                  {details.allergens.length !== index + 1 && ','}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* //map the checkbox groups comming from api */}
        {details?.variations && details?.variations?.length > 0 && (
          <CheckboxGroup
            title={t('variation')}
            value={selectedVariation}
            getSelectedValue={(val) => {
              console.log('SELECTED VARIATION:', val);
              setSelectedVariation(val);
            }}
            items={details.variations}
            language={language}
          />
        )}

        {details.addons && details.addons.length > 0 && (
          <CheckboxMultiSelectGroup
            selectedValues={selectedAddons}
            title={t('addAddons')}
            getSelectedValue={(AddonsArray) => {
              if (AddonsArray.length <= details.addon_limit) {
                setselectedAddons(AddonsArray);
              } else {
                errorMessage(
                  `You are only allowed to add ${details.addon_limit} addons`,
                );
              }
            }}
            items={details.addons}
          />
        )}

        {details.combos && details.combos.length > 0 && (
          <CheckboxMultiSelectGroup
            selectedValues={selectedCombos}
            title={t('suggestionOnCombos')}
            getSelectedValue={(AddonsArray) => {
              setselectedCombos(AddonsArray);
            }}
            items={details.combos}
          />
        )}

        {details?.products && renderComboDeal(details?.products)}

        <Text
          style={{
            fontSize: scaleFont(17),
            // fontWeight: 'bold',
            textAlign: 'left',
          }}>
          {t('specialInstructions')}
        </Text>
        <Input
          inputStyle={{ height: '100%' }}
          value={specialInstructions}
          onChangeText={(text) => {
            setspecialInstructions(text);
          }}
          textAlignVertical={'top'}
          style={styles.input}
          multiline={true}></Input>

        <Text
          medium
          style={{
            fontSize: scaleFont(18),
            marginTop: metrics.width / 50,
            color: 'black',
          }}>
          {renderSubTotal()}
        </Text>

        <View style={{ ...commonstyles.spaceBetween }}>
          <View>
            <QuantityView
              scale={1.2}
              onMinus={onMinusIconPress}
              onAdd={onPlusIconPress}
              value={quantity}></QuantityView>
          </View>
          <View>
            <Button
              style={{ width: metrics.width * 0.4 }}
              loading={buttonLoader}
              onPress={onButtonPress}
              text={editCart ? t('updateCart') : t('addToCart')}></Button>
          </View>
        </View>
      </View>
    );
  };

  const renderSubTotal = () => {
    let subTotal = 0;
    if (hasDiscount) {
      subTotal += formateNumber(sale_price);
    } else {
      subTotal += formateNumber(price);
    }

    if (selectedVariation?.sale_price && selectedVariation?.price) {
      let price =
        selectedVariation?.sale_price === selectedVariation?.price
          ? selectedVariation?.price
          : selectedVariation?.sale_price;
      // console.log('PRICE:', selectedVariation.price);
      // console.log('SALE_PRICE:', selectedVariation.sale_price);
      // console.log('VARIATION:', selectedVariation);
      subTotal += formateNumber(price);
    }

    if (selectedAddons?.length > 0) {
      selectedAddons.forEach((element) => {
        subTotal += formateNumber(element.price);
      });
    }

    subTotal *= quantity;
    return 'Total ' + t('SR') + ' ' + formateNumber(subTotal);
  };

  const renderReviewsTab = () => {
    return (
      <View style={{ paddingHorizontal: metrics.defaultMargin }}>
        {reviews.length > 0 ? (
          reviews.map((item, index) => {
            return (
              <ReviewCard
                ratingBackgroundColor={colors.background}
                onEditIconPress={() => {
                  // seteditReview(true);
                  // setshowReviewModal(true);
                  seteditReview(true);
                  setSelectedEditReview({ ...item, index: index });
                  showEditReview();
                }}
                showRating
                showEditIcon={user?.id === item?.customer_id}
                // showMoreButton={false}
                onMoreButtonPress={() => {
                  setreviewID(item.id);
                  setCanShowReply(item.customer_id === user?.id ? true : false);
                  setshowReviewThreadModal(true);
                }}
                key={index}
                item={item}></ReviewCard>
            );
          })
        ) : (
            <View
              style={{
                marginTop: metrics.largeMargin,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: colors.primaryLight,
                  fontSize: scaleFont(16),
                  textAlign: 'center',
                  textTransform: 'capitalize',
                }}>
                Currently There are no reviews for this product
            </Text>
            </View>
          )}
      </View>
    );
  };

  return (
    <RootView>
      <Header
        showCartIcon
        showNotification
        title={activeTab === 0 ? 'Details' : 'Reviews'}></Header>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'always'}
        extraHeight={metrics.height * 0.2}>
        <FastImage
          style={styles.image}
          source={{ uri: item.image[language] }}></FastImage>

        {/* INFO VIEW */}
        <View
          style={{
            ...commonstyles.spaceBetween,
            paddingHorizontal: metrics.defaultMargin,
            paddingVertical: metrics.smallMargin,
            flexWrap: 'wrap',
          }}>
          <View style={commonstyles.rowCenter}>
            <Text medium style={{ ...commonstyles.smallheading }}>
              {name[language]}
            </Text>
            {!offer_text[language] ? null : (
              <View
                style={{
                  backgroundColor: colors.primary,
                  padding: 5,
                  borderRadius: 5,
                  marginLeft: metrics.width * 0.02,
                }}>
                <Text
                  medium
                  style={{
                    ...(commonstyles.smallheading / 2),
                    // fontWeight: 'bold',
                  }}>
                  {offer_text[language]}
                </Text>
              </View>
            )}
          </View>
          {rating && rating !== 0 ? (
            <View style={commonstyles.rowCenter}>
              <Text
                style={{
                  fontSize: scaleFont(15),
                  //  fontWeight: 'bold'
                }}>
                {rating}
              </Text>
              <Icon
                name={'star'}
                size={30}
                color={colors.primaryBtnBackcolor}></Icon>
            </View>
          ) : null}
          {/* <Rating value={rating}></Rating> */}
        </View>
        <View
          style={{
            ...commonstyles.spaceBetween,
            paddingHorizontal: metrics.defaultMargin,
          }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text
              medium
              style={[
                {
                  ...styles.priceText,
                  marginRight: 10,
                },
                hasDiscount && !detailsLoader && {
                  textDecorationLine: 'line-through',
                  color: colors.grey,
                },
              ]}>
              {t('SR') + ' ' + formateNumber(price)}
            </Text>
            {hasDiscount && !detailsLoader && (
              <Text medium style={{ ...styles.priceText }}>
                {t('SR') + ' ' + formateNumber(sale_price)}
              </Text>
            )}
          </View>
          <Text
            style={{
              fontSize: scaleFont(14),
              // fontWeight: '400'
            }}>
            {details?.reviews ? details?.reviews + ' ' + t('reviews') : ''}
          </Text>
        </View>

        {description && (
          <Text
            regular
            style={{ ...styles.description, color: colors.primaryLight }}>
            {description[language]}
          </Text>
        )}
        <Tab
          containerStyle={{ marginVertical: metrics.defaultMargin }}
          onTabPress={(tabId) => setactiveTab(tabId)}
          activeTab={activeTab}
          tabs={[
            { id: 0, title: t('details') },
            { id: 1, title: t('reviews') },
          ]}></Tab>

        {activeTab === 1 ? renderReviewsTab() : renderDetailsTab()}
      </KeyboardAwareScrollView>
      {activeTab === 1 && (
        <View
          style={{
            paddingTop: metrics.smallMargin,
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: Platform.OS === 'ios' ? 0 : metrics.defaultMargin,
          }}>
          {isLoggedIn && (
            <Button
              onPress={() => {
                setSelectedEditReview(null);
                seteditReview(false);
                showAddReview();
              }}
              text={t('addReview')}></Button>
          )}
        </View>
      )}
      <AddReviewModal
        editRating={editReview}
        isVisible={showReviewModal}
        onFinishRating={(rating) => { }}
        addReviewLoader={addReviewLoader}
        productID={id}
        reviewItem={selectedEditReview}
        onBackDropPress={() => {
          seteditReview(true);
          hideEditReview();
          onBackDropPress();
          setSelectedEditReview(null);
        }}
        initialRating={
          selectedEditReview?.rating != null ? selectedEditReview.rating : 2.5
        }
        onSendReviewPress={
          editReview ? callupdateReviewAPICall : callAddReviewAPICall
        }
      />

      {showReviewThreadModal && (
        <ReviewThreadModal
          onBackdropPress={() => setshowReviewThreadModal(false)}
          isVisible={showReviewThreadModal}
          reviewID={reviewID}
          productID={id}
          ratingBackgroundColor={'white'}
          addReviewLoader={addReviewLoader}
          canReply={canShowReply}
          // addReplyToReviewAPICall={addReplyToReviewAPICall}
          onSendReviewPress={(params) => {
            addReplyToReviewAPICall(params);
            // setshowReviewThreadModal(false);
          }}
        />
      )}
    </RootView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: metrics.height * 0.35,
    borderRadius: 10,
  },
  priceText: {
    fontSize: scaleFont(18),
    // fontWeight: '600',
    textAlign: 'center',
    color: 'black',
  },
  input: {
    height: metrics.height * 0.1,
    marginVertical: metrics.defaultMargin,
    borderWidth: 0.5,
    borderColor: colors.grey,
  },
  description: {
    fontSize: scaleFont(14),
    color: colors.primaryLight,
    margin: metrics.defaultMargin,
    marginBottom: 0,
  },
  comboDetailTitle: {
    fontSize: scaleFont(15),
    textAlign: 'left',
    marginBottom: metrics.smallMargin - 5,
  },
  comboDescription: {
    marginBottom: metrics.smallMargin - 5,
  },
});
