'use strict';

import React,{
  Component,
  Text,
  Navigator,
  TabBarIOS,
  View,
  StatusBar,
  AppState,
} from 'react-native';
import TabBarNavigator from 'react-native-tabbar-navigator';
import Dimensions from 'Dimensions';
import PixelRatio from 'PixelRatio';
import buildStyleInterpolator from 'buildStyleInterpolator';

import HomePage from '../page/Latest/';
import HistoryPage from '../page/History/';
import SearchPage from '../page/Search/';
import MinePage from '../page/Mine/';

import codePush from 'react-native-code-push';


var fadeToLeft = {
  transformTranslate: {
    from: {x: 0, y: 0, z: 0},
    to: {
      x: -Math.round(Dimensions.get('window').width * 0.3),
      y: 0,
      z: 0
    },
    min: 0,
    max: 1,
    type: 'linear',
  },
  opacity: {
    from: 1,
    to: 1,
    min: 1,
    max: 2,
    type: 'linear',
  },


};
Navigator.SceneConfigs.FloatFromRight.animationInterpolators.out = buildStyleInterpolator(fadeToLeft);



class Weekly extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home'
    }
  }
  componentDidMount() {
    codePush.sync({installMode: codePush.InstallMode.ON_NEXT_RESUME});
    AppState.addEventListener('change', this._handleAppStateChange);
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }
  _handleAppStateChange(appState) {
    if (appState === 'active') {
      codePush.sync({installMode: codePush.InstallMode.ON_NEXT_RESUME});
    }
  }
  render() {
    return (
      <TabBarNavigator
        navTintColor='#fff'
        navBarTintColor='#333'
        tabTintColor='#649F0C'
        tabBarTintColor='#f0f0f0'>
        <TabBarNavigator.Item title='最新' defaultTab icon={require('image!newest')}>
          <HomePage />
        </TabBarNavigator.Item>
        <TabBarNavigator.Item title='往期' icon={require('image!old')}>
          <HistoryPage />
        </TabBarNavigator.Item>
        <TabBarNavigator.Item title='搜索' icon={require('image!search')}>
          <SearchPage />
        </TabBarNavigator.Item>
        <TabBarNavigator.Item title='我的'  icon={require('image!my')}>
          <MinePage />
        </TabBarNavigator.Item>
      </TabBarNavigator>
    )
  }
}

export default Weekly;
