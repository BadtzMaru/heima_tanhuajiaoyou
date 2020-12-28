import React, {Component} from 'react';
import {View, Text, StatusBar, TouchableOpacity, Image, ScrollView, RefreshControl} from 'react-native';
import {pxToDp} from '../../../utils/stylesKits';
import IconFont from '../../../components/IconFont';
import {BASE_URI, MY_COUNTS} from '../../../utils/pathMap';
import {inject, observer} from 'mobx-react';
import {ListItem} from 'react-native-elements';
import Geo from '../../../utils/Geo';
import request from '../../../utils/request';
import {NavigationContext} from '@react-navigation/native';

@inject('UserStore')
@observer
class Index extends Component {
  static contextType = NavigationContext;
  state = {city: '', fanCount: 0, loveCount: 0, eachLoveCount: 0, refreshing: false};
  componentDidMount() {
    this.getCityByLocation();
    this.getList();
  }
  // 定位
  getCityByLocation = async () => {
    const res = await Geo.getCityByLocation();
    console.log('定位:', res);
    this.setState({city: res.regeocode.addressComponent.city});
  };
  // 获取信息统计
  getList = async () => {
    const res = await request.privateGet(MY_COUNTS);
    console.log('信息统计:', res);
    const fanCount = res.data[0].cout;
    const loveCount = res.data[1].cout;
    const eachLoveCount = res.data[2].cout;
    this.setState({fanCount, loveCount, eachLoveCount});
    return Promise.resolve();
  };
  // 下拉刷新事件
  onRefresh = async () => {
    this.setState({refreshing: true});
    await this.getList();
    this.setState({refreshing: false});
  };
  render() {
    const user = this.props.UserStore.user;
    const {city, fanCount, loveCount, eachLoveCount, refreshing} = this.state;
    return (
      <ScrollView refreshControl={<RefreshControl onRefresh={this.onRefresh} refreshing={refreshing} />} contentContainerStyle={{flex: 1, backgroundColor: '#f6fcfe'}}>
        <View style={{height: pxToDp(150), backgroundColor: '#c7689f', position: 'relative'}}>
          <StatusBar backgroundColor="transparent" translucent />
          <IconFont name="iconbianji" style={{position: 'absolute', top: pxToDp(30), right: pxToDp(20), color: '#fff', fontSize: pxToDp(16)}} />

          {/* 个人信息 开始 */}
          <TouchableOpacity
            onPress={() => this.context.navigate('UserUpdate')}
            style={{
              flexDirection: 'row',
              paddingTop: pxToDp(15),
              paddingBottom: pxToDp(15),
              marginTop: pxToDp(40),
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
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: pxToDp(17)}}>{user.nick_name}</Text>
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
                <IconFont name="iconlocation" style={{color: '#fff'}} />
                <Text style={{color: '#fff', marginLeft: pxToDp(5)}}>{city}</Text>
              </View>
            </View>
          </TouchableOpacity>
          {/* 个人信息 结束 */}
        </View>

        {/* 相互关注|喜欢|粉丝 开始 */}
        <View style={{height: pxToDp(120), backgroundColor: '#fff', width: '90%', alignSelf: 'center', marginTop: pxToDp(-15), borderRadius: pxToDp(9), flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.context.navigate('Follow', 0)} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: '#666', fontSize: pxToDp(22)}}>{eachLoveCount}</Text>
            <Text style={{color: '#666', fontSize: pxToDp(16)}}>相互关注</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.context.navigate('Follow', 1)} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: '#666', fontSize: pxToDp(22)}}>{loveCount}</Text>
            <Text style={{color: '#666', fontSize: pxToDp(16)}}>喜欢</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.context.navigate('Follow', 2)} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: '#666', fontSize: pxToDp(22)}}>{fanCount}</Text>
            <Text style={{color: '#666', fontSize: pxToDp(16)}}>粉丝</Text>
          </TouchableOpacity>
        </View>
        {/* 相互关注|喜欢|粉丝 结束 */}

        {/* 列表 开始 */}
        <View style={{marginTop: pxToDp(15)}}>
          <ListItem
            leftIcon={<IconFont style={{color: 'green', fontSize: pxToDp(20)}} name="icondongtai" />}
            title="我的动态"
            titleStyle={{color: '#666'}}
            chevron
            bottomDivider
            onPress={() => this.context.navigate('Trends')}
          />
          <ListItem
            leftIcon={<IconFont style={{color: 'red', fontSize: pxToDp(20)}} name="iconshuikanguowo" />}
            title="谁看过我"
            titleStyle={{color: '#666'}}
            bottomDivider
            chevron
            onPress={() => this.context.navigate('Visitors')}
          />
          <ListItem
            leftIcon={<IconFont style={{color: 'purple', fontSize: pxToDp(20)}} name="iconshezhi" />}
            title="通用设置"
            titleStyle={{color: '#666'}}
            bottomDivider
            chevron
            onPress={() => this.context.navigate('Settings')}
          />
          <ListItem leftIcon={<IconFont style={{color: 'blue', fontSize: pxToDp(20)}} name="iconkefu" />} title="客服在线" titleStyle={{color: '#666'}} bottomDivider chevron />
        </View>
        {/* 列表 结束 */}
      </ScrollView>
    );
  }
}

export default Index;
