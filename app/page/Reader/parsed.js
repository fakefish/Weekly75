import React,{
  Component,
  View,
  Text,
  StyleSheet,
  WebView,
  TouchableOpacity,
} from 'react-native';

import Dimensions from 'Dimensions';
import Blank from '../../common/icons/Blank';
import Title from '../../common/Title';
import template from './parsedHTMLBody.js';

class ContentView extends Component {
  constructor(props) {
    super(props);
    var domain = this.props.url.match(/https?:\/\/([^\/]+)\//i);
    if(domain) {
      if(domain[1]) {
        domain = domain[1];
      } else {
        domain = domain[0];
      }
    } else {
      domain = null;
    }
    this.state = {
      domain: domain,
      content: '转码中...',
      readabilityUrl: this.props.readability_url,
      originUrl: null,
      url: this.props.url,
    }
  }
  // componentWillUpdate() {
  //   console.log(this.state)
  // }
  componentDidMount() {
    this._fetchContent();
  }
  _fetchContent() {
    try {
      fetch(this.state.readabilityUrl)
        .then((response) => response.json())
        .then((responseData) => {
          if(responseData.errno == 0) {
            this.setState({
              content: responseData.data.content,
              originUrl: responseData.data.url,
            });
          } else {
            this.setState({
              content: '转码失败。'
            });
            this.props.failure();
          }
        })
        .done();
    } catch(e) {
      alert(e);
    }
  }
  render() {
    var showUrl = this.state.originUrl;
    if(!showUrl) showUrl = this.state.url;
    return (
      <View style={styles.loaded}>
        <Text style={styles.domain}>
          {`内容由 ${this.state.domain} 提供`}
        </Text>
        
        <WebView
          style={styles.webview}
          onError={()=>{ alert('无法打开页面') }}
          source={{
              html: template(this.state.content, showUrl)
          }}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  unLoaded: {
    backgroundColor: '#fff'
  },
  loaded: {
    backgroundColor: '#555'
  },
  domain: {
    paddingTop: 10,
    height: Dimensions.get('window').height - 64,
    textAlign: 'center',
    color: '#ccc'
  },
  webview: {
    position: 'absolute',
    top: -(Dimensions.get('window').height - 64),
    height: Dimensions.get('window').height - 64,
    width: Dimensions.get('window').width,
    backgroundColor: 'transparent',
  },
});

export default ContentView;
