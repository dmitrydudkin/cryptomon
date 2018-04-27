import React from 'react'

import { TabNavigator } from 'react-navigation'
import { Button, Text, Footer, FooterTab } from 'native-base'

import LaunchScreen from '../Containers/LaunchScreen'
import FavoritesScreen from '../Containers/FavoritesScreen'

const buttons = ['Coins', 'Favorites']
const screens = {
  'Coins': 'LaunchScreen',
  'Favorites': 'FavoritesScreen',
}

export default TabNavigator({
  LaunchScreen: { screen: LaunchScreen },
  FavoritesScreen: { screen: FavoritesScreen },
}, {
  tabBarPosition: 'bottom',
  tabBarComponent: ({ navigationState, navigation }) => {
    const activeTab = navigationState.index;

    const tabs = buttons.map((title, idx) => {

      const isActive = activeTab === idx
      return (
        <Button
          key={idx}
          vertical
          active={isActive}
          onPress={()=>{navigation.navigate(screens[title])}}>
          <Text>{title}</Text>
        </Button>
      )
    })

    return (
      <Footer>
        <FooterTab>
          { tabs }
        </FooterTab>
      </Footer>
    )
  }
});
