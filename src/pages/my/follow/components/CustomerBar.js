import React, {Component} from 'react';
import {Text, ImageBackground, TouchableOpacity} from 'react-native';
import IconFont from '../../../../components/IconFont';
import {pxToDp} from '../../../../utils/stylesKits';

class CustomerBar extends Component {
  render() {
    const {goToPage, tabs, activeTab} = this.props;
    return (
      <ImageBackground
        source={require('../../../../res/rectanglecopy.png')}
        style={{height: pxToDp(60), flexDirection: 'row', paddingLeft: pxToDp(20), paddingRight: pxToDp(20), justifyContent: 'space-evenly'}}>
        <IconFont name="iconfanhui" style={{color: '#fff', fontSize: pxToDp(20), position: 'absolute', left: pxToDp(10), bottom: pxToDp(15)}} />
        {tabs.map((v, i) => (
          <TouchableOpacity key={i} onPress={() => goToPage(i)} style={{justifyContent: 'center', borderBottomColor: '#fff', borderBottomWidth: activeTab === i ? pxToDp(3) : 0}}>
            <Text style={{color: '#fff', fontSize: activeTab === i ? pxToDp(26) : pxToDp(20)}}>{v}</Text>
          </TouchableOpacity>
        ))}
      </ImageBackground>
    );
  }
}

export default CustomerBar;
