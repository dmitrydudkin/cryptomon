import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { List, ListItem, Icon } from 'react-native-elements'
import FirebaseActions from '../Redux/FirebaseRedux'

class CurrenciesList extends Component {
  _getPriceColor(flag) {
    switch(flag) {
      case 1: return 'green' // PRICEUP
      case 2: return 'red'   // PRICEDOWN
      case 4: return 'grey'      // PRICEUNCHANGED
    }
  }

  processFavorite(remove, hash, favorites){
    if (remove) this.props.removeFormFavorites(hash, favorites)
    else this.props.addToFavorites(hash, favorites)
  }

  render() {
    const { currencies, favorites, remove } = this.props

    let items = []

    for (let from in currencies) {
      // https://www.cryptocompare.com/api#-api-web-socket-current-
      //
      // '{Type}~{ExchangeName}~{FromCurrency}~{ToCurrency}~{Flag}~{Price}~{LastUpdate}
      // ~{LastVolume}~{LastVolumeTo}~{LastTradeId}~{Volume24h}~{Volume24hTo}~{MaskInt}'
      const [,,,to, flag, price] = currencies[from]
      const hash = `${from}-${to}`

      if (!price || (remove && !favorites.includes(hash))) continue

      items.push({
        from, to, price, flag
      })
    }

    return (
      <List>
        {
          items.map((c, i) => {
            const hash = `${c.from}-${c.to}`
            let iconName = remove
              ? 'remove'
              : favorites.includes(hash) ? 'star': 'star-o'

            return (
              <ListItem
                key={i}
                rightIcon={<Icon name={iconName} type='font-awesome' />}
                rightTitle={Number(c.price).toFixed(2)}
                rightTitleStyle={{ color: this._getPriceColor(+c.flag)}}
                onPress={() => this.processFavorite(remove, hash, favorites)}
                title={`${c.from}`}
              />
            )
          })
        }
      </List>
    )
  }
}

const mapStateToProps = () => ({

})

const mapDispatchToProps = (dispatch) => ({
  addToFavorites: (currency, favorites) => dispatch(
    FirebaseActions.addToFavorite(currency, favorites)
  ),
  removeFormFavorites: (currency, favorites) => dispatch(
    FirebaseActions.removeFromFavorite(currency, favorites)
  ),
})

CurrenciesList.propTypes = {
  currencies: PropTypes.object,
  favorites: PropTypes.array,
  addToFavorites: PropTypes.func,
  removeFormFavorites: PropTypes.func,
  remove: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrenciesList)

