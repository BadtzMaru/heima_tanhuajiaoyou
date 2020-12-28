import React, {Component} from 'react';
import {View, Text, StatusBar, ImageBackground, TouchableOpacity, Image} from 'react-native';
import IconFont from '../../../components/IconFont';
import {pxToDp} from '../../../utils/stylesKits';
import JMessage from '../../../utils/JMessage';
import {FRIENDS_PERSONALINFO_GUID, BASE_URI} from '../../../utils/pathMap';
import request from '../../../utils/request';
import date from '../../../utils/date';
import {NavigationContext} from '@react-navigation/native';

class Index extends Component {
  static contextType = NavigationContext;
  state = {
    list: [],
  };
  componentDidMount() {
    this.getConversations();
  }
  // 极光获取未读消息
  getConversations = async () => {
    const res = await JMessage.getConversations();
    console.log('极光获取未读消息', res);
    if (res.length) {
      const idArr = res.map((v) => v.target.username);
      const url = FRIENDS_PERSONALINFO_GUID.replace(':ids', idArr.join(','));
      const users = await request.privateGet(url);
      console.log('users信息:', res);
      this.setState({list: res.map((v, i) => ({...v, user: users.data[i]}))});
    }
  };
  render() {
    let {list} = this.state;
    list = list.filter((v) => v.latestMessage);
    return (
      <View>
        {/* 顶部导航 开始 */}
        <StatusBar backgroundColor="transparent" translucent={true} />
        <ImageBackground
          source={require('../../../res/headbg.png')}
          style={{
            height: pxToDp(60),
            paddingTop: pxToDp(12),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: pxToDp(10),
            paddingRight: pxToDp(10),
          }}>
          <TouchableOpacity></TouchableOpacity>
          <Text
            style={{
              color: '#fff',
              fontSize: pxToDp(20),
              fontWeight: 'bold',
            }}>
            消息
          </Text>
          <TouchableOpacity>
            <IconFont name="icontongxunlu" style={{color: '#fff', fontSize: pxToDp(20)}} />
          </TouchableOpacity>
        </ImageBackground>
        {/* 顶部导航 结束 */}

        {/* 四个按钮 开始 */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: pxToDp(10),
            paddingBottom: pxToDp(10),
            paddingLeft: pxToDp(30),
            paddingRight: pxToDp(30),
            borderBottomWidth: pxToDp(3),
            borderBottomColor: '#dec2e5',
          }}>
          <TouchableOpacity style={{alignItems: 'center'}}>
            <View style={{width: pxToDp(60), height: pxToDp(60), borderRadius: pxToDp(30), backgroundColor: '#ebc969', alignItems: 'center', justifyContent: 'center'}}>
              <IconFont style={{color: '#fff', fontSize: pxToDp(24)}} name="icongonggao" />
            </View>
            <Text style={{color: '#666'}}>全部</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems: 'center'}}>
            <View style={{width: pxToDp(60), height: pxToDp(60), borderRadius: pxToDp(30), backgroundColor: '#ff5314', alignItems: 'center', justifyContent: 'center'}}>
              <IconFont style={{color: '#fff', fontSize: pxToDp(24)}} name="icondianzan-o" />
            </View>
            <Text style={{color: '#666'}}>点赞</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems: 'center'}}>
            <View style={{width: pxToDp(60), height: pxToDp(60), borderRadius: pxToDp(30), backgroundColor: '#2fb4f9', alignItems: 'center', justifyContent: 'center'}}>
              <IconFont style={{color: '#fff', fontSize: pxToDp(24)}} name="iconpinglun" />
            </View>
            <Text style={{color: '#666'}}>评论</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems: 'center'}}>
            <View style={{width: pxToDp(60), height: pxToDp(60), borderRadius: pxToDp(30), backgroundColor: '#1adbde', alignItems: 'center', justifyContent: 'center'}}>
              <IconFont style={{color: '#fff', fontSize: pxToDp(24)}} name="iconxihuan-o" />
            </View>
            <Text style={{color: '#666'}}>喜欢</Text>
          </TouchableOpacity>
        </View>
        {/* 四个按钮 结束 */}

        {/* 消息列表 开始 */}
        <View>
          {list.map((v, i) => (
            <TouchableOpacity
              onPress={() => this.context.navigate('Chat', v.user)}
              key={i}
              style={{padding: pxToDp(15), flexDirection: 'row', borderBottomWidth: pxToDp(1), borderBottomColor: '#ccc'}}>
              <View>
                <Image style={{width: pxToDp(54), height: pxToDp(54), borderRadius: pxToDp(27)}} source={{uri: BASE_URI + v.user.header}} />
              </View>
              <View style={{justifyContent: 'space-evenly', paddingLeft: pxToDp(15)}}>
                <Text style={{color: '#666'}}>{v.user.nick_name}</Text>
                <Text style={{color: '#666'}}>{v.latestMessage.text}</Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'space-evenly'}}>
                <Text style={{color: '#666'}}>{date(v.latestMessage.createTime).fromNow()}</Text>
                <View style={{width: pxToDp(20), height: pxToDp(20), borderRadius: pxToDp(10), backgroundColor: 'red', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{color: '#fff'}}>{v.unreadCount}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        {/* 消息列表 结束 */}
      </View>
    );
  }
}

export default Index;
