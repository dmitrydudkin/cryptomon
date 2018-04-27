import { call, put } from 'redux-saga/effects'
import firebase from 'firebase';

import ReduxSagaFirebase from 'redux-saga-firebase';
import { AsyncStorage } from 'react-native'

import FirebaseActions from '../Redux/FirebaseRedux'

const myFirebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyB0ZBrhhsq6fHTusbCG0dWci93YP-wT13M',
  authDomain: 'coinmon-dc715.firebaseapp.com',
  databaseURL: 'https://coinmon-dc715.firebaseio.com',
  projectId: 'coinmon-dc715',
  storageBucket: 'coinmon-dc715.appspot.com',
  messagingSenderId: '1080803732707'
});

const reduxSagaFirebase = new ReduxSagaFirebase(myFirebaseApp)

export function* addToFavorite({ hash, favorites }) {
  console.log('addToFavorite', hash)

  try {
    let key = yield call(AsyncStorage.getItem, 'firebase:key')

    console.log('storage key', key)

    if (!key) {
      favorites = [hash]

      key = yield call(reduxSagaFirebase.database.create, 'favorites', favorites);
      yield call(AsyncStorage.setItem, 'firebase:key', key)
    } else {
      // allready added
      if (favorites.includes(hash))
        return

      const updatedFavorites = [...favorites, hash]

      yield call(reduxSagaFirebase.database.update, `favorites/${key}`, updatedFavorites);
    }

    yield put(FirebaseActions.addedToFavorites(hash));
  }
  catch(error) {
    // TODO: add handler
    // yield put(FirebaseActions.loginFailure({error}));
  }
}

export function* getFavorites() {
  let favorites = []

  // yield call(AsyncStorage.clear)

  try {
    let key = yield call(AsyncStorage.getItem, 'firebase:key')

    console.log('key', key)
    console.log('favorites', favorites)

    if (key)
      favorites = yield call(reduxSagaFirebase.database.read, `favorites/${key}`)

    yield put(FirebaseActions.favoritesFetched(favorites));
  }
  catch(error) {
    // TODO: add handler
    // yield put(FirebaseActions.loginFailure({error}));
  }
}

