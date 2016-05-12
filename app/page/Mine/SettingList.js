import React,{
  Component,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  Image,
} from 'react-native';
import SettingPage from '../Setting/';
import MarkPage from '../Mark/';

class ConfigList extends Component {
    constructor(props) {
      super(props);
    }
    _jumpMark() {
      this.props.navigator.push({
        title: '收藏',
        component: <MarkPage />
      })
    }
    _jumpSetting() {
      this.props.navigator.push({
        title: '设置',
        component: <SettingPage />
      })
    }
    render() {
      return (
        <View style={styles.container}>
          {
            // <TouchableHighlight
            //           underlayColor="fafafa"
            //           onPress={()=>{
            //             this._jumpMark();
            //           }}>
            //           <View style={styles.item}>
            //             <View style={styles.itemName}>
            //               <Image
            //                 style={styles.icon}
            //                 source={require('image!mark2')} />
            //               <Text>我的收藏</Text>
            //             </View>
            //             <Image
            //               style={styles.forward}
            //               source={require('image!forward')} />
            //           </View>
            //         </TouchableHighlight>
          }
          <TouchableHighlight 
            underlayColor="#fafafa"
            onPress={()=>{
              this._jumpSetting();
            }}>
            <View style={[styles.item,{borderBottomWidth:0}]}>
              <View style={styles.itemName}>
                <Image
                  style={styles.icon}
                  source={require('image!setting')} />
                <Text>设置</Text>
              </View>
              <Image
                style={styles.forward}
                source={require('image!forward')} />
            </View>
          </TouchableHighlight>
        </View>
      );
    }
}
var styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderTopWidth: .5,
    borderBottomWidth: .5,
    borderColor: '#ccc',
    marginTop: 18,
  },
  item: {
    borderBottomWidth: .5,
    borderColor: '#ccc',
    paddingVertical: 12,
    paddingRight: 15,
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  itemName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 12,
  },
})

export default ConfigList;
 