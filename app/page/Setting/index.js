import React,{
  Component,
  View,
  Text,
  Image,
  StyleSheet,
  Switch,
  AsyncStorage,
} from 'react-native';
import { createStore } from 'redux';
import Dimensions from 'Dimensions';
import DeviceInfo from 'react-native-device-info';
import storageKeys from '../../common/storageKeys';
// import settor from '../../reducers/';

// const store = createStore(settor);

class SettingPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        useReadability: true,
      }
    }
    componentDidMount() {
      this._loadSettings();
    }
    async _loadSettings() {
      try {
        let value = await AsyncStorage.getItem(storageKeys.useReadability);
        if (value !== null) {
          this.setState({ useReadability: value == 'true' });
        }
      } catch(e) {
          alert(e)
      }
    }
    async _saveSettings({useReadability}) {
        try {
          await AsyncStorage.setItem(storageKeys.useReadability, useReadability);
        } catch(e) {
          alert('保存失败');
        }
    }
    render() {
      return (
        <View style={{backgroundColor: '#fafafa', height: Dimensions.get('window').height}}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('image!about_logo')} />
            <Text style={styles.version}>奇舞周刊 v{DeviceInfo.getVersion()}</Text>
          </View>
          {
            <View style={styles.item}>
              <View>
                <Text style={styles.itemTitle}>网页转码</Text>
                <Text style={styles.itemDesc}>节约流量</Text>
              </View>
              <View>
                <Switch
                  value={this.state.useReadability}
                  onValueChange={(value)=>{
                    this.setState({
                      useReadability: value
                    });
                    this._saveSettings({useReadability: `${!!value}`});
                  }}/>
              </View>
            </View>
          }
          <Text style={styles.bottomText}>Talk is cheap, Show me the code.</Text>
        </View>
      );
    }
}
var styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  logo: {
    marginTop: 25,
  },
  version: {
    marginTop: 12,
    fontSize: 12,
    color: '#333'
  },
  item: {
    borderTopWidth: .5,
    borderBottomWidth: .5,
    borderColor: '#ccc',
    padding: 15,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  itemDesc: {
    marginTop: 9,
    fontSize: 14,
    color: '#909094'
  },
  bottomText: {
    color: '#999',
    fontSize: 12,
    marginTop: 17,
    textAlign: 'center',
  }
})
export default SettingPage;
