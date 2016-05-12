import React, {
  View,
  AsyncStorage,
  StyleSheet,
  TouchableHighlight,
  Text,
  Dimensions,
} from 'react-native';
import storageKeys from '../../common/storageKeys';
import WebReader from './Web';
import Parsed from './parsed';
import Loading from '../../common/Loading';
import Blank from '../../common/icons/Blank';
import Title from '../../common/Title';


// 读取本地设置来改变显示的组件
class Reader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      useReadability: true,
    }
    this.props.navComponent.setNavItems({
      title: {
        component: <Title content={this.props.title}/>
      },
      rightItem: {
        component: <Blank />
      }
    })
  }
  componentDidMount() {
    this._loadStorage();
  }
  async _loadStorage() {
    try {
      let useReadability = await AsyncStorage.getItem(
                                  storageKeys.useReadability);
      if (useReadability !== null) {
        this.setState({
          useReadability: useReadability === 'true'
        });
      }
      
    } catch(e) {}
  }
  _jumpSource() {
    this.setState({
      useReadability: false,
    });
  }
  render() {
    let { useReadability } = this.state;

    if (useReadability === true) {
      return (
        <View>
          <Parsed {...this.props} failure={this._jumpSource.bind(this)}/>
          <TouchableHighlight
            onPress={this._jumpSource.bind(this)}
            style={styles.jumpButton}>
            <Text style={styles.jumpText}>查看原文</Text>
          </TouchableHighlight>
        </View>
      )
    } else {
      return <WebReader {...this.props}/>
    }
  }
}

const styles = StyleSheet.create({
  jumpButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 10,
  },
  jumpText: {
    textAlign: 'right',
    lineHeight: 22,
    color: '#0E60AE',
  }
})

export default Reader;
