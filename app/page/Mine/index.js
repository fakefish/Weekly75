import React,{
  Component,
  View,
  Text,
  ScrollView,
} from 'react-native';
import AddBtn from '../../common/AddBtn';
import UserInfo from './UserInfo';
import SettingList from './SettingList';
import Dimensions from 'Dimensions';

class Mine extends Component {
    constructor(props) {
      super(props);
    }
    componentDidMount() {
      this.props.navComponent.setNavItems({
        rightItem: {
          component: <AddBtn navigator={this.props.navigator}/>
        }
      })
    }
    render() {
      return (
          <View style={{backgroundColor: '#fafafa', height: Dimensions.get('window').height}}>
            <UserInfo navigator={this.props.navigator}/>
            <SettingList navigator={this.props.navigator}/>
          </View>
      );
    }
}

export default Mine;
 