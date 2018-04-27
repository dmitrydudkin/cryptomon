import { call, put } from 'redux-saga/effects'
import { AsyncStorage }  from 'react-native'

export function * addToFavorite({ currency }) {
  yield call(AsyncStorage.setItem, currency)
  yield put({ type: 'ADDED_TO_FAVORITES', currency })
}
