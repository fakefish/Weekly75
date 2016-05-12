import React,{
  Component,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

class Title extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var title = this.props.content;
    // if (title.length > 10) {
    //   title = title.slice(10) + '...';
    // }
    return (
      <Text style={styles.title}>{title}</Text>
    )
  }
}

var styles = StyleSheet.create({
  title: {
    color: '#fff',
    fontSize: 16,
    marginTop: 12,
  },
})

export default Title;
