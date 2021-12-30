import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {colors, commonstyles, metrics, scaleFont} from '../../utils/Theme';
import ReviewCard from '../../components/ReviewCard';
import {Button, Input, VerticalList} from '../../components';
import {ScrollView} from 'react-native-gesture-handler';
import {Text} from '../../components';
import {
  getProductReviewReplies,
  addProductReviewReply,
} from '../../services/Product';

import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {successMessage} from '../../utils/Toast';
import Toast, {DURATION} from 'react-native-easy-toast';
import {RootSiblingParent} from 'react-native-root-siblings';
import {errorMessage} from '../../utils/Toast';

export default function index(props) {
  const {
    isVisible,
    onFinishRating,
    onSendReviewPress,
    editRating,
    reviewID,
    productID,
    canReply,
  } = props;

  const toastRef = useRef(null);

  const {t} = useTranslation();

  const [replies, setReplies] = useState(null);
  const [reply, setReply] = useState(null);
  const [addReplyLoader, setReplyLoader] = useState(false);
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);

  // useEffect(() => {
  //   const temp = [...reviews];
  //   setdata(temp.reverse());
  // }, []);

  useEffect(() => {
    fetchProductReplies(reviewID);
  }, []);

  const sendReplyAPICall = () => {
    if (reply?.length > 0) {
      const params = {
        review_id: reviewID,
        product_id: productID,
        comment: reply,
      };
      addReplyToReviewAPICall(params);
    } else {
      errorMessage(t('pleaseAddReplyFirst'));
    }
  };

  const fetchProductReplies = (commentID) => {
    getProductReviewReplies(commentID)
      .then((response) => {
        // creating a object as temp then adding parent comment first then adding replies to it.
        const temp = response.data.data;
        const parentReview = {
          id: temp.id,
          customer_id: temp.customer_id,
          name: temp.name,
          image: temp.image,
          comments: temp.comments,
          datetime: temp.datetime,
          rating: temp.rating,
        };

        var replies = [];
        replies.push(parentReview);
        replies.push(...temp.replies);

        setReplies(replies.reverse());
      })
      .catch((error) => {
        console.log('REPLIES ERROR:', error);
      });
  };

  const addReplyToReviewAPICall = (params) => {
    setReplyLoader(true);
    addProductReviewReply(params)
      .then((response) => {
        console.log('REPLY RESPONSE:', response);
        if (response.status === 200) {
          const reply = response.data.data;
          var tempReplies = replies;
          tempReplies.unshift(reply);
          setReplies(tempReplies);

          setReplyLoader(false);
          setReply('');
          // errorMessage(t('feedbackInReview'))
        }
      })
      .catch((error) => {
        console.log('ERROR:', error);
        setReplyLoader(false);
      });
  };

  return (
    <View style={{flex: 1}}>
      <Modal
        propagateSwipe
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
              // flex: 1,
              width: '100%',

              padding: metrics.defaultMargin,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <Text style={styles.text}>{t('RatingAndReviews')}</Text>
            <View style={{maxHeight: metrics.height * 0.6}}>
              <VerticalList
                inverted
                data={replies}
                renderItem={({item, index}) => {
                  const isAdmin = item.type === 2 ? true : false;

                  return (
                    <ReviewCard
                      inverted={isAdmin}
                      textContainerStyle={{backgroundColor: colors.background}}
                      onEditIconPress={() => {}}
                      showMoreButton={false}
                      showEditIcon={false}
                      showRating={index === replies.length - 1}
                      item={item}></ReviewCard>
                  );
                }}></VerticalList>
            </View>
            {isLoggedIn && canReply && (
              <View
                style={{
                  backgroundColor: 'white',
                  paddingVertical: metrics.smallMargin,
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <View style={{flex: 1, marginRight: metrics.width * 0.02}}>
                  <Input
                    inputStyle={{backgroundColor: colors.background}}
                    placeholder={t('writeAReply')}
                    onChangeText={(text) => {
                      setReply(text);
                    }}
                    value={reply}
                    style={{marginBottom: 0}}></Input>
                </View>
                <Button
                  onPress={sendReplyAPICall}
                  loading={addReplyLoader}
                  text={t('send')}></Button>
              </View>
            )}
          </View>
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
    marginBottom: metrics.smallMargin,
  },
});
