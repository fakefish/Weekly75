'use strict';

import React,{
  Component,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicatorIOS,
  ListView,
  RefreshControl,
  StatusBar,
} from 'react-native';
import Dimensions from 'Dimensions';
// import safePromise from 'react-safe-promise';

import WeeklyList from './WeeklyList';
import Api from '../../network/api';
import Loading from '../../common/Loading';
import commonStyle from '../../common/style';
import AddBtn from '../../common/AddBtn';


class HomeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loaded: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      type: 'default',
      isRefreshing: false,
    };
    if(typeof this.props.iid !== 'undefined') {
      this.state.type = 'detail';
    }
  }
  _renderRow(item) {
    return <WeeklyList data={item} navigator={this.props.navigator} {...this.props}/>
  }
  componentDidMount() {
    if(this.state.type == 'detail') {
      this._fetchData(this.props.iid);
    } else {
      this.props.navComponent.setNavItems({
        title: {
          component: <Text style={commonStyle.titleText}>奇舞周刊</Text>
        },
        rightItem: {
          component: <AddBtn navigator={this.props.navigator}/>
        }
      })
      this._fetchData();
    }

  }
  _fetchData(iid) {
    let apiResult;
    if(typeof iid == 'undefined') {
      apiResult = Api.getNewest();
    } else {
      apiResult = Api.getDetail(iid);
    }
    this.state.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    try {
      apiResult
        .then((responseData) => {
          this.setState({
            data: responseData,
            dataSource: this.state.dataSource.cloneWithRows(
              responseData.article
            ),
            loaded: true,
            isRefreshing: false
          });
        })
        .done();
    } catch(e) {
      alert(e);
    }
    
  }
  _onRefresh() {
    this.setState({isRefreshing: true});
    this.state.type == 'detail' ? this._fetchData(this.props.iid) : this._fetchData();
  }
  
  render() {
    if(!this.state.loaded) {
      return (
        <View>
          <StatusBar 
            barStyle="light-content" />
          <Loading />
        </View>
      )
    }
    const currentNum = `当前第 ${this.state.data.iid} 期，更新于 ${this.state.data.date}`;
    return (
      <ListView
        style={[
          styles.container,
          styles.weeklyContentWraper,
          this.state.type == 'detail' ? {marginBottom: 0}:null]}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)}
        renderHeader={()=>{
          return <Text style={{position:'absolute',top:0}}></Text>;
        }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh.bind(this)}
            tintColor="#649F0C"
            title={currentNum}
            progressBackgroundColor="#649F0C"
          />
        }
      />
    )
  }
}

var styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    backgroundColor:'#fafafa'
  },
  topText: {
    color: '#666',
    textAlign: 'center',
    paddingBottom: 20,
    position: 'absolute',
    top: -30,
    width: Dimensions.get('window').width,
  },
  weeklyContentWraper: {
    marginTop: -1,
  },
})

// export default safePromise(HomeList);
export default HomeList;
