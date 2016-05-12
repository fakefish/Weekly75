import React,{
  Component,
  View,
  Text,
  ListView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import SearchBar from 'react-native-search-bar';
import commonStyle from '../../common/style';
import AddBtn from '../../common/AddBtn';
import Loading from '../../common/Loading';
import Api from '../../network/api';
import ParseHTML from '../../common/parseHTML';
import ContentView from './../Reader/Web';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loaded: false,
      count: null,
      totalPages: null,
      numsPerPage: null,
      currentPage: 1,
      loadMore: false,
      allLoaded: false,
      data: [],
      searched: false,
    }
  }
  componentDidMount() {
    this.props.navComponent.setNavItems({
      rightItem: {
        component: <AddBtn navigator={this.props.navigator}/>
      }
    })
  }
  
  _fetchData() {
    var {data, currentPage, keyword} = this.state;
    if(this.state.allLoaded) return;
    return Api.getSearch(keyword, currentPage)
            .then((responseData) => {
              data = [...data, ...responseData.data];
              this.setState({
                dataSource: this.state.dataSource.cloneWithRows(data),
                data,
                loaded: true,
                count: responseData.count,
                totalPages: responseData.totalPages,
                numsPerPage: responseData.numsPerPage,
                currentPage: responseData.currentPage,
              });


              if(this.state.totalPages == this.state.currentPage) {
                this.setState({
                  allLoaded: true
                });
              }

            })
  }
  _search(keyword) {
    this.setState({
      keyword, 
      data: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      searched: true
    });
    this._fetchData();
  }
  _renderHeader() {
    var search = this._search.bind(this);
    return <SearchBar 
            ref='searchBar'
            placeholder='Search'
            onCancelButtonPress={() => this.setState({showsCancelButton: false})}
            onFocus={() => this.setState({showsCancelButton: true})}
            showsCancelButton={this.state.showsCancelButton}
            onSearchButtonPress={function(keyword) {
              console.log(this.refs)

              search(keyword);
            }.bind(this)}/>;
  }
  _renderRow(item) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={()=>{
            this._jumpPage(item)
          }}>
          <Text>{item.title}</Text>
          <Text style={styles.date}>奇舞周刊第{item.iid}期</Text>
        </TouchableOpacity>
      </View>
    )
  }
  _renderFooter() {
    var {loadMore, allLoaded, searched} = this.state;

    if(allLoaded || !searched) return null;
    return (
      <TouchableOpacity
        style={styles.footer}
        onPress={()=>{
          var currentPage = this.state.currentPage + 1;
          this.setState({
            loadMore: true,
            currentPage,
          });
          this._fetchData().then(()=>{
            this.setState({
              loadMore: false
            });
          })
        }}>
        <Text style={{color: '#ccc'}}>{loadMore?'Loading':'加载更多'}</Text>
      </TouchableOpacity>
    )
  }
  _jumpPage(item) {
    this.props.navigator.push({
      title: null,
      component: <ContentView url={item.url} {...this.props}/>
    })
  }
  render() {
    return (
      <ListView
        refs='list'
        dataSource={this.state.dataSource}
        renderHeader={this._renderHeader.bind(this)}
        renderRow={this._renderRow.bind(this)}
        renderFooter={this._renderFooter.bind(this)} />
    )
  }
}
var styles = StyleSheet.create({
  container: {
    borderBottomWidth: .5,
    borderColor: '#ccc',
    paddingVertical: 10,
    marginHorizontal: 15,
  },
  date: {
    color: '#999',
    marginTop: 10,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  }
})

export default Search;
 