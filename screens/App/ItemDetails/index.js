import React, {useEffect, useState} from 'react';
import ThemeOne from './ThemeOneItemDetails';

import {useSelector, useDispatch} from 'react-redux';
import {getProductDetail, getProductReview} from '../../../services/Product';
import {getComboDetails, getCombos} from '../../../services/Discount';
import {addToCart} from '../../../store/Cart/action';

import {successMessage} from '../../../utils/Toast';
import {
  addProductReview,
  updateProductReview,
  addProductReviewReply,
} from '../../../services/Product';

export default function index(props) {
  const themeNumber = useSelector((state) => state.themeReducer.themeNumber);
  const language = useSelector((state) => state.userReducer.language);

  const {id} = props.route.params.item;
  const isCombo = props?.route?.params?.isFromCombo
    ? props?.route?.params?.isFromCombo
    : false;
  const [buttonLoader, setbuttonLoader] = useState(false);
  const dispatchAction = useDispatch();
  //REIVEW GETTING API
  const [reviewsLoader, setreviewsLoader] = useState(false);
  const [reviews, setreviews] = useState([]);
  const [reviewsPageNo, setreviewsPageNo] = useState(1);

  const [showReviewModal, setshowReviewModal] = useState(false);
  const [addReviewLoader, setAddReviewLoader] = useState(false);

  //Details Api
  const [details, setdetails] = useState([]);
  const [detailsLoader, setdetailsLoader] = useState(false);

  const [selectedVariation, setSelectedVariation] = useState(
    props.route.params.item.variation || undefined,
  );

  // Product Review API
  useEffect(() => {
    setreviewsLoader(true);

    getProductReview(id)
      .then((res) => {
        if (res.status == 200) {
          setreviewsLoader(false);
          setreviews(res.data.data);
        }
      })
      .catch((err) => {
        setreviewsLoader(false);
        console.error(err);
      });
  }, []);

  useEffect(() => {
    setdetailsLoader(true);
    if (isCombo) {
      getComboDetails(id)
        .then((res) => {
          setdetailsLoader(false);
          setdetails(res.data.data);
        })
        .catch((error) => {
          setdetailsLoader(false);
        });
    } else {
      getProductDetail(id)
        .then((res) => {
          setdetailsLoader(false);
          setdetails(res.data.data);
          setDefaultSelectedVariation(res.data.data);
        })
        .catch((err) => {
          setdetailsLoader(false);
        });
    }
  }, []);

  // useEffect(() => {
  //   setDefaultSelectedVariation();
  // }, [details]);

  const setDefaultSelectedVariation = (variations) => {
    console.log('______VARIATIONS_____:', details?.variations);
    console.log('_____SELECTED_VARIATION_____:', selectedVariation);

    let variationFromDetails = variations ? variations : details;
    console.log('_____variationFromDetails_____:', variationFromDetails);
    console.log(
      '_____greater length_____:',
      variationFromDetails?.variations?.length,
    );

    if (
      (selectedVariation == null || selectedVariation == undefined) &&
      variationFromDetails?.variations?.length > 0
    ) {
      setSelectedVariation(variationFromDetails?.variations[0]);
    }
  };

  const addReviewAPICall = (params) => {
    showAddReview();
    setAddReviewLoader(true);
    addProductReview(params)
      .then((response) => {
        console.log('addReviewAPICall', response);
        if (response.status == 200) {
          handleReviewResponse(response, params, true);
        }
      })
      .catch((error) => {
        // console.log('error',error);
        // hideAddReview();
        setAddReviewLoader(false);
      });
  };

  const updateReviewAPICall = (params) => {
    setAddReviewLoader(true);
    updateProductReview(params)
      .then((response) => {
        console.log('updateReviewAPICall', response);
        if (response.status == 200) {
          handleReviewResponse(response, params, false);
        } else {
          // alert('tada');
        }
      })
      .catch((error) => {
        setAddReviewLoader(false);
      });
  };

  const handleReviewResponse = (response, params, isNewRep) => {
    // var tempReviews = [...reviews];
    // const review = response?.data?.data;

    // if (isNewRep) {
    //   tempReviews.push(response.data.data);
    // } else {
    //   const toUpdateIndex = tempReviews.findIndex(
    //     (item, index) => item.id === params.review_id,
    //   );
    //   if (toUpdateIndex > -1) {
    //     let i = 0;
    //     if (tempReviews[toUpdateIndex].replies) {
    //       i = tempReviews[toUpdateIndex].replies + 1;
    //     } else {
    //       i = 1;
    //     }
    //     let reviewObj = {
    //       ...tempReviews[toUpdateIndex],
    //       rating: review.rating,
    //       replies: i,
    //     };

    //     tempReviews[toUpdateIndex] = reviewObj;
    //   }
    // }
    // setreviews(tempReviews);

    hideAddReview();
    setAddReviewLoader(false);

    if (isNewRep) {
      setTimeout(() => {
        successMessage('We have recieved your feedback, and its in review.');
      }, 700);
    } else {
      setTimeout(() => {
        successMessage('Your review has been updated successfully');
      }, 700);
    }
  };

  const onBackDropPress = () => {
    setshowReviewModal(false);
  };

  const showAddReview = () => {
    setshowReviewModal(true);
  };

  const hideAddReview = () => {
    setshowReviewModal(false);
  };

  const showEditReview = () => {
    setshowReviewModal(true);
  };

  const hideEditReview = () => {
    setshowReviewModal(false);
  };

  const onAddToCartPress = (data) => {
    console.log('=data te ye araharar====', {data});
    dispatchAction(addToCart(data));
    // setbuttonLoader(true);
    // addToCart(data)
    //   .then((res) => {
    //     dispatchAction(setCart(res.data.data));
    //     setbuttonLoader(false);
    //     successMessage('Item added to the cart');

    //     // Navigator.navigate(ScreenConst.addToCart);
    //   })
    //   .catch((err) => setbuttonLoader(false));
  };

  switch (themeNumber) {
    case 1:
      return (
        <ThemeOne
          reviews={reviews}
          onAddToCartPress={onAddToCartPress}
          details={details}
          detailsLoader={detailsLoader}
          reviewsLoader={reviewsLoader}
          language={language}
          buttonLoader={buttonLoader}
          selectedVariation={selectedVariation}
          setSelectedVariation={setSelectedVariation}
          setDefaultSelectedVariation={setDefaultSelectedVariation}
          selectedAddons={props.route.params.item.add_ons || []}
          selectedCombos={props.route.params.item.combos || []}
          initialDescription={props.route.params.item.special_instruction || ''}
          initialQuantity={props.route.params.item.quantity || 1}
          addReviewAPICall={addReviewAPICall}
          updateReviewAPICall={updateReviewAPICall}
          addReviewLoader={addReviewLoader}
          showReviewModal={showReviewModal}
          showAddReview={showAddReview}
          onBackDropPress={() => onBackDropPress()}
          showEditReview={showEditReview}
          hideEditReview={hideEditReview}
          isCombo={isCombo}
          // addReplyToReviewAPICall= {addReplyToReviewAPICall}
          {...props}></ThemeOne>
      );

    default:
      return (
        <ThemeOne
          reviews={reviews}
          onAddToCartPress={onAddToCartPress}
          details={details}
          detailsLoader={detailsLoader}
          reviewsLoader={reviewsLoader}
          language={language}
          buttonLoader={buttonLoader}
          selectedVariation={selectedVariation}
          setSelectedVariation={setSelectedVariation}
          setDefaultSelectedVariation={setDefaultSelectedVariation}
          selectedAddons={props.route.params.item.add_ons || []}
          selectedCombos={props.route.params.item.combos || []}
          initialDescription={props.route.params.item.special_instruction || ''}
          initialQuantity={props.route.params.item.quantity || 1}
          addReviewLoader={addReviewLoader}
          addReviewAPICall={addReviewAPICall}
          updateReviewAPICall={updateReviewAPICall}
          showAddReview={showAddReview}
          onBackDropPress={onBackDropPress}
          showEditReview={showEditReview}
          hideEditReview={hideEditReview}
          addReplyToReviewAPICall={addReplyToReviewAPICall}
          isCombo={isCombo}
          {...props}></ThemeOne>
      );
  }
}
