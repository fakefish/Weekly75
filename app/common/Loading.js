'use strict';

var React = require('react-native');

var {
  StyleSheet,
  ActivityIndicatorIOS,
} = React;

module.exports = React.createClass({
  render: function() {
    return (
      <ActivityIndicatorIOS 
        color="#666" 
        style={{marginVertical: 30,marginBottom: 30}} />
    );
  }
})