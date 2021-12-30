import React, {useState, useRef} from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';
import Modal from 'react-native-modal';
import {colors, commonstyles, metrics, scaleFont} from '../../utils/Theme';
import {Rating, AirbnbRating} from 'react-native-elements';
import {Button, Input, Text} from '../../components';
import Toast, {DURATION} from 'react-native-easy-toast';
import {useTranslation} from 'react-i18next';
import {RootSiblingParent} from 'react-native-root-siblings';
import {errorMessage} from '../../utils/Toast';

export default function index(props) {
  const {
    isVisible,
    onFinishRating,
    editRating,
    onSendReviewPress,
    addReviewLoader,
    productID,
    onBackDropPress,
    initialRating,
    reviewItem,
  } = props;

  console.log('REVIEW ITEM:', reviewItem);

  const toastRef = useRef(null);

  const [rating, setRating] = useState(initialRating || 2.5);
  const [review, setReview] = useState('');
  const {t} = useTranslation();

  const sendReview = () => {
    if (rating > 0 && review.length > 0) {
      var params = {
        product_id: productID,
        rating: rating,
        comment: review,
      };

      if (editRating) {
        params = {...params, review_id: reviewItem?.id};
        console.log('REVIEW UPDATE :', params);
      }

      onSendReviewPress(params);
    } else {
      // Keyboard.dismiss()
      errorMessage(t('pleaseAddSomething'));

      // toastRef.current.show(t('pleaseAddSomething'));
    }
  };

  return (
    <View style={{flex: 1}}>
      <Modal
        onModalWillHide={() => {
          setReview('');
          setRating(1);
        }}
        onBackdropPress={() => {
          onBackDropPress();
        }}
        avoidKeyboard
        style={{margin: 0}}
        isVisible={isVisible}
        {...props}>
        <RootSiblingParent>
          <View
            style={{
              backgroundColor: 'white',
              position: 'absolute',
              bottom: 0,
              flex: 1,
              width: '100%',
              padding: metrics.largeMargin,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <Text style={styles.text}>
              {editRating
                ? t('pleaseUpdateYourRatingBelow')
                : t('whatIsYourRating')}
            </Text>

            <Rating
              type={'custom'}
              readonly={editRating && !reviewItem?.rating_allow}
              ratingColor={colors.primaryBtnBackcolor}
              tintColor={'white'}
              ratingBackgroundColor={colors.darkGray}
              ratingCount={5}
              imageSize={40}
              minValue={1}
              startingValue={initialRating}
              onFinishRating={(rating) => {
                setRating(rating);
              }}
              style={{paddingVertical: 10}}
            />
            <Text style={styles.text}>
              {editRating
                ? t('pleaseShareYourRevisedThoughts')
                : t('pleaseShareYourOpinionAbout')}
            </Text>
            <Input
              style={{
                height: metrics.height * 0.15,
                paddingVertical: scaleFont(8),
                height: 150,
                overflow: 'hidden',
              }}
              inputStyle={{height: 150}}
              multiline={true}
              onChangeText={(text) => {
                setReview(text);
              }}
              value={review}
              textAlignVertical={'top'}
              placeholder={t('writeYourReviewHere')}></Input>

            <Button
              onPress={sendReview}
              loading={addReviewLoader}
              text={editRating ? t('updateRating') : t('sendReview')}></Button>
          </View>
          {/* <Toast ref={toastRef} /> */}
        </RootSiblingParent>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: scaleFont(18),
    // fontWeight: 'bold',
    marginVertical: metrics.smallMargin,
  },
});
