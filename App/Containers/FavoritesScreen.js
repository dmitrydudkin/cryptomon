import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { ActivityIndicator } from 'react-native'

import { Container, Header, Content,
  Left, Right, Body, Title } from 'native-base';

import FirebaseActions from '../Redux/FirebaseRedux'

import CurrenciesList from '../Components/CurrenciesList'

class FavoritesScreen extends Component {
  render () {
    const { fetching, currencies, favorites } = this.props

    return (
      <Container>
        <Header>
          <Left/>
          <Body>
            <Title>Favorites</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          { (fetching || !Object.keys(currencies).length)
            ? <ActivityIndicator />
            : <CurrenciesList currencies={currencies} favorites={favorites} remove/>
          }
        </Content>
    </Container>
    )
  }
}

const mapStateToProps = ({ currencies, firebase }) => ({
  fetching: currencies.fetching,
  currencies: currencies.currencies,
  favorites: firebase.favorites
})

const mapDispatchToProps = (dispatch) => ({
  getFavorites: () => dispatch(FirebaseActions.getFavorites())
})

FavoritesScreen.propTypes = {
  fetching: PropTypes.bool,
  favorites: PropTypes.array,
  currencies: PropTypes.object,
  getFavorites: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen)
