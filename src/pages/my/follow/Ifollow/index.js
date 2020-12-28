import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import IconFont from '../../../../components/IconFont';
import {BASE_URI} from '../../../../utils/pathMap';
import {pxToDp} from '../../../../utils/stylesKits';
import SearchInput from '../components/SearchInput';

class Ifollow extends Component {
  state = {text: ''};
  render() {
    const {text} = this.state;
    const {ilikelist} = this.props;
    // 筛选后的数组
    const list = ilikelist.filter((v) => v.nick_name.includes(text));
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{backgroundColor: '#eee', padding: pxToDp(10)}}>
          <SearchInput value={this.state.text} onChangeText={(text) => this.setState({text})} style={{marginTop: pxToDp(10)}} />
        </View>

        {list.map((user, i) => (
          <View
            key={i}
            style={{
              flexDirection: 'row',
              paddingTop: pxToDp(15),
              paddingBottom: pxToDp(15),
              paddingRight: pxToDp(15),
              borderBottomColor: '#ccc',
              borderBottomWidth: pxToDp(1),
            }}>
            {/* 图片 */}
            <View
              style={{
                paddingLeft: pxToDp(15),
                paddingRight: pxToDp(15),
              }}>
              <Image
                source={{uri: BASE_URI + user.header}}
                style={{
                  width: pxToDp(50),
                  height: pxToDp(50),
                  borderRadius: pxToDp(25),
                }}
              />
            </View>
            {/* 名称等内容 */}
            <View
              style={{
                flex: 1,
                justifyContent: 'space-around',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#666', fontWeight: 'bold', fontSize: pxToDp(17)}}>{user.nick_name}</Text>
                <View style={{flexDirection: 'row', backgroundColor: '#fff', borderRadius: pxToDp(8), paddingLeft: pxToDp(3), paddingRight: pxToDp(3), marginLeft: pxToDp(15)}}>
                  <IconFont
                    name={user.gender === '女' ? 'icontanhuanv' : 'icontanhuanan'}
                    style={{
                      fontSize: pxToDp(18),
                      color: user.gender === '女' ? '#b5674b' : 'red',
                    }}
                  />
                  <Text style={{color: '#555'}}>{user.age}岁</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <IconFont name="iconlocation" style={{color: '#666'}} />
                <Text style={{color: '#666', marginLeft: pxToDp(5)}}>{user.city}</Text>
              </View>
            </View>
            {/* 关注按钮 */}
            <TouchableOpacity
              style={{
                width: pxToDp(80),
                height: pxToDp(30),
                borderRadius: pxToDp(3),
                borderColor: '#ccc',
                borderWidth: pxToDp(1),
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <IconFont name="iconjia" style={{color: '#666'}} />
              <Text style={{color: '#666'}}>已关注</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  }
}

export default Ifollow;
