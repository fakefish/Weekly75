import React,{
  Component,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import route from './route.js';
import Blank from './icons/Blank';

class AddBtn extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity 
        style={{marginTop: 8,marginRight: 10}}
        onPress={()=>{
          this.props.navigator.push(route.addPage)
        }}>
        <Image
          source={require('image!add')} />
      </TouchableOpacity>
    )
  }
}

export default AddBtn;
// export default Blank;
