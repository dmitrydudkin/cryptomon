import { all, takeLatest, takeEvery } from 'redux-saga/effects'

import { addToFavorite, getFavorites } from './FirebaseSaga'
import { FirebaseTypes } from '../Redux/FirebaseRedux'

export default function * root () {
  yield all([
    takeEvery(FirebaseTypes.ADD_TO_FAVORITE, addToFavorite),
    takeLatest(FirebaseTypes.GET_FAVORITES, getFavorites)
  ])
}
