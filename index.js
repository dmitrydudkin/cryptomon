import './App/Config/ReactotronConfig'
import { AppRegistry } from 'react-native'
import App from './App/Containers/App'

// disable warnings
// because reactnavigation use
// deprecated componentWillMount handler
// FIXME: remove this after update reactnavigation to v2.0
console.disableYellowBox = true;

AppRegistry.registerComponent('cryptomon', () => App)
