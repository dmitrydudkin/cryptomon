import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  currenciesReceived: ['data'],
})

export const CurrenciesTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  currencies: {},
  fetching: true,
})

export const received = (state, { data }) => {
  const LOADCOMPLETE = 3
  const PRICE_UNCHANGED = 4

  data = data.split('~')
  const [type,,fromCurrency,,flag] = data

  if (type == LOADCOMPLETE || flag == PRICE_UNCHANGED)
    return state

  return state.merge({
    fetching: false,
    currencies: {
      ...state.currencies,
      [fromCurrency]: data
    }
  })
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CURRENCIES_RECEIVED]: received
})
