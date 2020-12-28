import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';
import IconFont from '../../../../components/IconFont';
import {pxToDp} from '../../../../utils/stylesKits';

class SearchInput extends Component {
  render() {
    return (
      <View style={{height: pxToDp(40), borderRadius: pxToDp(20), backgroundColor: '#fff', position: 'relative', ...this.props.style}}>
        <TextInput value={this.props.value} onChangeText={this.props.onChangeText} placeholder="搜索用户" style={{paddingLeft: pxToDp(30)}} />
        <IconFont name="iconsousuo" style={{position: 'absolute', left: pxToDp(10), top: pxToDp(13), color: '#666'}} />
      </View>
    );
  }
}

export default SearchInput;
