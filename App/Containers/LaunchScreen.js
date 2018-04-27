import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'

import { Button, Container, Header, Content, Left, Right, Body,
  Title, Text } from 'native-base';

import FirebaseActions from '../Redux/FirebaseRedux'

import CurrenciesList from '../Components/CurrenciesList'

class LaunchScreen extends Component {
  componentDidMount(){
    this.props.getFavorites()
  }

  render () {
    const { fetching, currencies, favorites } = this.props

    return (
      <Container>
        <Header>
          <Left/>
          <Body>
            <Title>CoinMon</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          { (fetching || !Object.keys(currencies).length)
            ? <ActivityIndicator />
            : <CurrenciesList currencies={currencies} favorites={favorites}/>
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

LaunchScreen.propTypes = {
  fetching: PropTypes.bool,
  favorites: PropTypes.array,
  currencies: PropTypes.object,
  getFavorites: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
