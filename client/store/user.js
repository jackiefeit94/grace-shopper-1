import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

//one user
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const ADD_TO_CART = 'ADD_TO_CART'
//edit user
const UPDATE_USER = 'UPDATE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const addToCart = () => ({type: ADD_TO_CART})

/**
 * THUNK CREATORS
 */
export const me = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/auth/me')

      dispatch(getUser(res.data || defaultUser))
    } catch (err) {
      console.error(err)
    }
  }
}

export const add = (userId, productId) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/users/${userId}/${productId}/add`)
      dispatch(addToCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const auth = (
  email,
  password,
  method,
  firstName,
  lastName
) => async dispatch => {
  let res
  let object

  if (method === 'login') {
    object = {email, password}
  } else {
    object = {email, password, firstName, lastName}
  }

  try {
    res = await axios.post(`/auth/${method}`, object)
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

//edit user
export const updateUser = (id, stateObj) => {
  return async (dispatch, getState) => {
    try {
      await axios.put(`/auth/me`, stateObj)
      dispatch({
        type: UPDATE_USER,
        id,
        stateObj,
        state: getState
      })
    } catch (err) {
      console.log(err)
    }
  }
}

/**
 * REDUCER
 */
export default function userReducer(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case ADD_TO_CART:
      return {...state, user: action.user}
    case UPDATE_USER:
      return {
        ...state,
        firstName: action.stateObj.firstName,
        lastName: action.stateObj.lastName,
        email: action.stateObj.email,
        imageUrl: action.stateObj.imageUrl
      }
    default:
      return state
  }
}
