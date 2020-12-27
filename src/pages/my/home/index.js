import React, {Component} from 'react';
import {View, Text, StatusBar, TouchableOpacity, Image} from 'react-native';
import {pxToDp} from '../../../utils/stylesKits';
import IconFont from '../../../components/IconFont';
import {BASE_URI} from '../../../utils/pathMap';
import {inject, observer} from 'mobx-react';

@inject('UserStore')
@observer
class Index extends Component {
  render() {
    const user = this.props.UserStore.user;
    return (
      <View>
        <View style={{height: pxToDp(150), backgroundColor: '#c7689f', position: 'relative'}}>
          <StatusBar backgroundColor="transparent" translucent />
          <IconFont name="iconbianji" style={{position: 'absolute', top: pxToDp(30), right: pxToDp(20), color: '#fff', fontSize: pxToDp(16)}} />

          {/* 个人信息 开始 */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              paddingTop: pxToDp(15),
              paddingBottom: pxToDp(15),
              marginTop: pxToDp(60),
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
                flex: 2,
                justifyContent: 'space-around',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#fff'}}>{user.nick_name}</Text>
                <View style={{flexDirection: 'row', backgroundColor: '#fff'}}>
                  <IconFont
                    name={user.gender === '女' ? 'icontanhuanv' : 'icontanhuanan'}
                    style={{
                      fontSize: pxToDp(18),
                      color: user.gender === '女' ? '#b564bf' : 'red',
                    }}
                  />
                  <Text style={{color: '#555'}}>{user.age}岁</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <IconFont name="iconlocation" style={{color: '#fff'}} />
                <Text style={{color: '#fff'}}>广州</Text>
              </View>
            </View>
          </TouchableOpacity>
          {/* 个人信息 结束 */}
        </View>
      </View>
    );
  }
}

export default Index;
