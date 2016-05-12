import React,{
  Component,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

class Blank extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity style={styles.container}>
      </TouchableOpacity>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
  }
})

export default Blank;
