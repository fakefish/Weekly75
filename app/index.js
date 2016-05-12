'use strict';

import React,{
  Component,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as settorActions from './actions/settorActions';
import WeeklyApp from './common/WeeklyApp';


class WeeklyContainer extends Component {
  render() {
    const { state, actions } = this.props;
    return (
      <WeeklyApp
        settor={state}
        {...actions} />
    )
  }
}

export default connect( (state) => ({
  state: state.settor
}), (dispatch) => ({
  actions: bindActionCreators(settorActions, dispatch)
}))(WeeklyContainer);
