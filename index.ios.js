'use strict';
import React, {
  AppRegistry,
  Component,
} from 'react-native';

import App from './app/';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as reducers from './app/reducers/';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

class Weekly75 extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}



AppRegistry.registerComponent('Weekly75', () => Weekly75);
