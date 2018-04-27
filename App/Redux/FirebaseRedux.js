import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  login: null,
  loginSuccess: ['data'],
  loginFailure: ['error'],
  addToFavorite: ['hash', 'favorites'],
  removeFromFavorite: ['hash', 'favorites'],
  addedToFavorites: ['currency'],
  getFavorites: null,
  favoritesFetched: ['favorites']
})

export const FirebaseTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  fetching: false,
  favorites: []
})

export const login = (state, { data }) => {
  return state
}

export const success = (state, { data }) => {
  return state
}

export const failure = (state, { data }) => {
  return state
}

export const addToFavorite = (state, { data }) => {
  return state
}

export const addedToFavorites = (state, { currency }) => {
  return state.merge({
    favorites: [
      ...state.favorites,
      currency
    ]
  })
}

export const removeFromFavorite = (state, { hash }) => {
  const idx = state.favorites.indexOf(hash)
  console.log('removeFromFavorite', hash)
  console.log('removeFromFavorite', state.favorites)
  console.log('idx', idx)
  return state.merge({
    favorites: [
      ...state.favorites.slice(0, idx),
      ...state.favorites.slice(idx + 1)
    ]
  })
}

export const favoritesFetched = (state, { favorites }) => {
  return state.merge({ favorites })
}

export const getFavorites = (state) => {
  return state
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN]: login,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.ADD_TO_FAVORITE]: addToFavorite,
  [Types.REMOVE_FROM_FAVORITE]: removeFromFavorite,
  [Types.GET_FAVORITES]: getFavorites,
  [Types.ADDED_TO_FAVORITES]: addedToFavorites,
  [Types.FAVORITES_FETCHED]: favoritesFetched
})
