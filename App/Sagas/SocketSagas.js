import SocketIOClient from 'socket.io-client';
import { eventChannel } from 'redux-saga'
import { call, put, take, race } from 'redux-saga/effects'

const currencies = [
  '2~Poloniex~BTC~USD',
  '2~Poloniex~ETH~USD',
  '2~Poloniex~EOS~USD',
  '2~Poloniex~XRP~USD',
  '2~Poloniex~LTC~USD',
  '2~Poloniex~BCH~USD',
  '2~Poloniex~TRX~USD',
  '2~Poloniex~HT~USD',
  '2~Poloniex~ETC~USD',
]

function websocketInitChannel(socket) {
  return eventChannel( emitter => {
    socket.on('m', data => {
      // dispatch an action with emitter
      return emitter( { type: 'CURRENCIES_RECEIVED', data } )
    })

    socket.on('connect', () => {
      console.log('connected')
      return emitter( { type: 'SUB_TO_CURRENCIES' } )
    })

    // TODO: make unsubscribe function
    return () => {
      console.log('unsubscribe. Closing ws...')
    }
  })
}

function* internalListener(socket) {
  while (true) {
    yield take('SUB_TO_CURRENCIES');

    socket.emit('SubAdd', { subs: currencies } )
  }
}

function* externalListener(channel) {
  while (true) {
    const action = yield take(channel)
    yield put(action)
  }
}

export default function* websocketSagas() {
  while (true) {
    yield take('START_WEBSOCKET');

    const socket = SocketIOClient('wss://streamer.cryptocompare.com');
    const socketChannel = yield call(websocketInitChannel, socket);

    const { cancel } = yield race({
      task: [
        call(externalListener, socketChannel),
        call(internalListener, socket)
      ],
      cancel: take('STOP_WEBSOCKET')
    });
    if (cancel) {
      socketChannel.close();
    }
  }
}
