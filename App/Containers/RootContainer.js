import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, StatusBar } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'

import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
  componentDidMount () {
    this.props.startup()
  }

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <ReduxNavigation />
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch({ type: 'START_WEBSOCKET' })
})

RootContainer.propTypes = {
  startup: PropTypes.func
};

export default connect(null, mapDispatchToProps)(RootContainer)
