import React,{
  Component,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Clipboard,
  AsyncStorage,
} from 'react-native';
import Dimensions from 'Dimensions';
import Api from '../network/api';
import Blank from '../common/icons/Blank';
import storageKeys from '../common/storageKeys';

class AddPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        title: '',
        url: '',
        description: '',
        tags: '',
        provider: '',
      },
      viewMarginTop: 0,
      urlFromClipboard: false,
    }
    this.props.navComponent.setNavItems({
      rightItem: {
        component: <Blank />,
      },

    });
  }
  componentDidMount() {
    this._getName();
    this._getClipboardData();
    
  }
  async _getClipboardData() {
    try {
      let content = await Clipboard.getString();
      
      if(/http(|s)\:\/\//.test(content)) {
        this._setTitle(content);
      }
    } catch(e) {

    }
  }
  _setTitle(url) {
    try {
      Api.getTitle(url)
        .then((responseData) => {
          this.setState(Object.assign({}, this.state, {
            form: {
              title: responseData.data.title,
              url: url,
            }
          }));
        })
        .done();
    } catch(e) {
    }
  }
  _postData() {
    try {
      Api.postAdd(JSON.stringify(this.state.form))
      .then((response) => {
        if(response.errno == 0) {
          alert('提交成功');
          this._cleanForm();
        } else {
          alert(response.errmsg);
        }
      })
    } catch(e) {
      alert('网络错误');
    }
  }
  async _getName() {
    try {
      let username = await AsyncStorage.getItem(
        storageKeys.userAddName
      );
      if(username != null) {
        this.setState({
          form: Object.assign({}, this.state.form, {
            provider: username
          })
        });
      }
    } catch(e) {
      console.log(e)
    }
  }
  async _saveName() {
    try {
      console.log(this.state.form.provider)
      await AsyncStorage.setItem(
        storageKeys.userAddName, 
        this.state.form.provider
      );
    } catch(e) {
    }
  }
  _checkForm() {
    var {
      title,
      url,
      description,
      tags,
      provider
    } = this.refs;
    this.setState({
      form: {
        title: title._getText(),
        url: url._getText(),
        descrition: description._getText(),
        tags: tags._getText(),
        provider: provider._getText()
      }
    });
    this._postData();
    
  }
  _cleanForm() {
    this.setState({
      form: {
        title: '',
        url: '',
        description: '',
        tags: '',
        provider: '',
      }
    });
  }
  _setTop(e) {
    this.setState({
      viewMarginTop: -200
    });
  }
  _resetTop(e) {
    this.setState({
      viewMarginTop: 0
    });
  }
  _textChanged(textName, text) {
    this.setState({
      form: Object.assign({}, this.state.form, {
        [textName]: text
      })
    });
  }
  render() {
    var { title, url, description, tags, provider } = this.state.form;
    return (
      <ScrollView 
        ref='scroll'
        style={[styles.container, {marginTop: this.state.viewMarginTop}]}
        keyboardDismissMode={'on-drag'}
        keyboardShouldPersistTaps={true}>
        <View>
          <Text
          style={styles.label}>文章标题</Text>
          <TextInput
            style={styles.input}
            maxLength={100}
            ref='title'
            value={title}
            onChangeText={this._textChanged.bind(this, 'title')}
            placeholder="100字以内" 
            autoCapitalize="none"
            autoCorrect={false}/>
          <Text
            keyboardType='url'
            style={styles.label}>文章 URL</Text>
          <TextInput
            style={styles.input}
            maxLength={256}
            ref='url'
            value={url}
            onChangeText={this._textChanged.bind(this, 'url')}
            placeholder="256字以内" 
            autoCapitalize="none"
            autoCorrect={false}/>
          <Text
            multiline={true}
            style={styles.label}>推荐理由</Text>
          <TextInput
            style={styles.input}
            maxLength={512}
            ref='description'
            value={description}
            onChangeText={this._textChanged.bind(this, 'description')}
            placeholder="512字内，允许html" 
            autoCapitalize="none"
            autoCorrect={false}/>
          <Text
            style={styles.label}>关键词</Text>
          <TextInput
            ref='tags'
            style={styles.input}
            value={tags}
            onFocus={this._setTop.bind(this)}
            onBlur={this._resetTop.bind(this)}
            onEndEditing={this._resetTop.bind(this)}
            onChangeText={this._textChanged.bind(this, 'tags')}
            placeholder="用英文逗号隔开" 
            autoCapitalize="none"
            autoCorrect={false}/>
          <Text
            style={styles.label}>您的名字</Text>
          <TextInput
            style={styles.input}
            ref='provider'
            onFocus={this._setTop.bind(this)}
            onBlur={this._resetTop.bind(this)}
            onEndEditing={this._resetTop.bind(this)}
            value={provider}
            onBlur={this._saveName.bind(this)}
            onChangeText={this._textChanged.bind(this, 'provider')}
            autoCapitalize="none"
            autoCorrect={false}/>
          <TouchableOpacity
            style={styles.submit}
            onPress={()=>{
              this._checkForm();
            }}>
            <Text style={styles.submitText}>提交</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({

  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fafafa',
    height: Dimensions.get('window').height,
  },
  input: {
    height: 35,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  label: {
    paddingVertical: 10,
  },
  submit: {
    backgroundColor: '#0078E7',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    alignItems: 'center',
    alignSelf: 'center'
  }
})

export default AddPage;
