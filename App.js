import React from 'react';
import MainTabNavigator from './src/router/MainTabNavigator';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './src/store/reducers/rootReducer';
import { Dimensions} from 'react-native';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {orientationData} from './src/store/actions/loginAction';
import SplashScreen from 'react-native-splash-screen'
const store = createStore(rootReducer, applyMiddleware(thunk))

class App extends React.Component {

  constructor(props){
    super (props);
    this.state={
      orientation:'portrait'
    }
  }

componentDidMount(){
  this.checkPermission ();
  this.getOrientation();
  SplashScreen.hide();
  Dimensions.addEventListener( 'change', () =>
  {
    this.getOrientation();
  });
}

  checkPermission = () =>{
    check(PERMISSIONS.IOS.LOCATION_ALWAYS)
      .then(result=>{
        switch (result) {
          case RESULTS.UNAVAILABLE:
            break;
          case RESULTS.DENIED:
            request(PERMISSIONS.IOS.LOCATION_ALWAYS).then(result => {
            }).catch(error=>{
              console.log(error)
            })
            break;
          case RESULTS.GRANTED:
            break;
          case RESULTS.BLOCKED:
            break;
        }
      }).catch(error=>{
        console.log(error)
      })
  }
  getOrientation = () =>
  {
    if( Dimensions.get('window').width < Dimensions.get('window').height )
    {
      this.setState({ orientation: 'portrait' },()=>{
        let data = 'portrait'
        store.dispatch(orientationData (data))
      });
    }
    else
    {
      this.setState({ orientation: 'landscape' }, ()=>{
        let data = 'landscape'
        store.dispatch(orientationData (data))
      });
    }
  }
  render (){
    return(
      <Provider store={store}>
        <MainTabNavigator />
      </Provider>
      )
  }
  
}


export default App;
