import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import request from '../../../../utils/request';
import {FRIENDS_VISITORS, BASE_URI} from '../../../../utils/pathMap';
import {pxToDp} from '../../../../utils/stylesKits';

class Index extends Component {
  state = {
    visitors: [],
  };
  async componentDidMount() {
    // get请求带上token值
    const res = await request.privateGet(FRIENDS_VISITORS);
    console.log('访客数据:', res);
    this.setState({visitors: res.data});
  }
  render() {
    const {visitors} = this.state;
    return visitors.length ? (
      <View
        style={{
          flexDirection: 'row',
          marginTop: pxToDp(20),
          alignItems: 'center',
          paddingLeft: pxToDp(5),
          paddingRight: pxToDp(5),
          paddingBottom: pxToDp(5),
        }}>
        <Text style={{flex: 1, color: '#777', fontSize: pxToDp(15)}}>最近有{visitors.length}人来访,快去查看...</Text>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          {visitors.map((v, i) => (
            <Image
              key={i}
              style={{
                width: pxToDp(35),
                height: pxToDp(35),
                borderRadius: pxToDp(35),
              }}
              source={{uri: BASE_URI + v.header}}
            />
          ))}
          <Text style={{fontSize: pxToDp(20), color: '#777'}}>&gt;</Text>
        </View>
      </View>
    ) : (
      <></>
    );
  }
}

export default Index;
