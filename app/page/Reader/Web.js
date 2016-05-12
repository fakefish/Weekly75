import React,{
  Component,
  WebView,
  View,
  Text,
  StyleSheet,
  ProgressViewIOS,
} from 'react-native';

import Dimensions from 'Dimensions';
// import Ellipsis from '../../common/icons/Ellipsis';
import Blank from '../../common/icons/Blank';
import Title from '../../common/Title';

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
      pageLoaded: false,
      domain: domain,
      progress: 0,
      title: null,
    }
  }

  componentDidMount() {
    this._updateProgress();
  }
  componentWillUnmount() {
    this.state.progress = 1;
  }
  _updateProgress() {
    if(this.state.progress > 0.95) {
      return;
    }

    var progress = this.state.progress + (1 - this.state.progress) * 0.008;
    this.setState({ progress });

    GLOBAL.requestAnimationFrame(() => this._updateProgress());
  }

  _getProgress(offset) {
    var progress = this.state.progress + offset;
    return progress;
  }
  _renderProgress() {
    if(!this.state.pageLoaded) {
      return <ProgressViewIOS
              refs='progress'
              style={styles.progress}
              progress={this._getProgress(0)}
              trackTintColor="transparent"/>
    }
  }
  render() {
    let {pageLoaded} = this.state;
    return (
      <View style={pageLoaded?styles.loaded:styles.unLoaded}>
        <Text style={styles.domain}>
          {pageLoaded?`网页由 ${this.state.domain} 提供`:''}
        </Text>
        
        <WebView
          automaticallyAdjustContentInsets={false}
          style={styles.webview}
          source={{ uri: this.props.url }}
          startInLoadingState={true}
          injectedJavaScript='document.body.style.backgroundColor="#fff"'
          javaScriptEnabled={true}
          domStorageEnabled={true}
          automaticallyAdjustContentInsets={false}
          scalesPageToFit={true}
          onError={()=>{ alert('无法打开页面') }}
          onNavigationStateChange={(navState)=>{
            if(typeof navState.navigationType == 'undefined') {
              this.setState({
                pageLoaded: true,
                title: navState.title,
                progress: 1,
              });
            }
          }}/>
          {this._renderProgress()}
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
    // backgroundColor: '555',
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
  progress: {
    position: 'absolute',
    top: 0,
    width: Dimensions.get('window').width,
    backgroundColor: 'transparent'
  }
});

export default ContentView;
