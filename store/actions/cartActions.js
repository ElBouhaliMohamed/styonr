import commerce from '../../lib/commerce'

import {
  SET_CART_LOADING,
  RETRIEVE_CART_SUCCESS,
  RETRIEVE_CART_ERROR,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_ERROR,
  UPDATE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_ERROR,
  REMOVE_FROM_CART_SUCCESS,
  REMOVE_FROM_CART_ERROR,
} from './actionTypes';

// Create all Cart actions, define the callbacks to the reducers

/**
 * Set cart and update Redux store
 */
export const retrieveCartSuccess = (cart) => {
  return {
    type: RETRIEVE_CART_SUCCESS,
    payload: cart
  }
}

/**
 * Handle error on retrieve cart fail
 */
export const retrieveCartError = (error) => {
  console.log('Error retrieving cart', error)
  return {
    type: RETRIEVE_CART_ERROR,
  }
}

/**
 * Async retrieve cart from API
 */
export const retrieveCart = () => (dispatch) => {
  dispatch(setCartLoading(true));
  return commerce.cart.retrieve()
    .then(cart => {
      dispatch(setCartLoading(false));
      return dispatch(retrieveCartSuccess(cart))
    })
    .catch(error => {
      dispatch(setCartLoading(false));
      dispatch(retrieveCartError(error))
    });
}


/**
 * Handle add to cart success and update store
 */
export const addToCartSuccess = (product) => {
  return {
    type: ADD_TO_CART_SUCCESS,
    payload: product
  }
}

/**
 * Handle error on adding product to cart
 */
export const addToCartError = (error) => {
  console.log('Error adding product to cart', error);
  return {
    type: ADD_TO_CART_ERROR,
  }
}

export const setCartLoading = (value) => {
  return {
    type: SET_CART_LOADING,
    payload: value
  }
}

/**
 * Async add product to cart
 */
export const addToCart = (productId, quantity, selectedOption) => (dispatch) => {
  dispatch(setCartLoading(true));
  commerce.cart.add(productId, quantity, selectedOption)
    .then(product => {
      dispatch(addToCartSuccess(product))
      dispatch(setCartLoading(false));
    })
    .catch(error => {
      dispatch(addToCartError(error))
      dispatch(setCartLoading(false));
    });

}


/**
 * Handle update cart item success and update store
 */
export const updateCartItemSuccess = (item) => {
  return {
    type: UPDATE_CART_ITEM_SUCCESS,
    payload: item
  }
}

/**
 * Handle error on updating cart item
 */
export const updateCartItemError = (error) => {
  console.log('Error updating cart item', error);
  return {
    type: UPDATE_CART_ITEM_ERROR
  }
}

/**
 * Async update cart item
 */
export const updateCartItem = (lineItemId, quantity) => (dispatch) => {
  dispatch(setCartLoading(true));
  return commerce.cart.update(lineItemId, { quantity })
    .then(item => {
      dispatch(setCartLoading(false));
      dispatch(updateCartItemSuccess(item))
    })
    .catch(error => {
      dispatch(setCartLoading(false));
      dispatch(updateCartItemError(error))
    });
}

/**
 * Handle remove cart item success and update store
 */
export const removeFromCartSuccess = (resp) => {
  return {
    type: REMOVE_FROM_CART_SUCCESS,
    payload: resp
  }
}

/**
 * Handle remove cart item error
 */
export const removeFromCartError = (error) => {
  console.log('Error removing cart item', error)
  return {
    type: REMOVE_FROM_CART_ERROR
  }
}

/**
 * Async remove cart item
 */
export const removeFromCart = (lineItemId) => (dispatch) => {
  dispatch(setCartLoading(true));
  return commerce.cart.remove(lineItemId)
    .then(resp => {
      dispatch(setCartLoading(true));

      dispatch(removeFromCartSuccess(resp))
    })
    .catch(error => {
      dispatch(setCartLoading(true));
      dispatch(removeFromCartError(error))
    })
};
