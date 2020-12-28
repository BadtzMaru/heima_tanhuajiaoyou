import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import THNav from '../../../components/THNav';
import {ListItem} from 'react-native-elements';
import {inject, observer} from 'mobx-react';
import {pxToDp} from '../../../utils/stylesKits';
import {ActionSheet} from 'teaset';
import AsyncStorage from '@react-native-community/async-storage';

@inject('UserStore')
@inject('RootStore')
@observer
class Settings extends Component {
  // 点击了退出按钮
  logout = async () => {
    const tmplogout = async () => {
      console.log('执行退出');
      // 清除缓存
      await AsyncStorage.removeItem('userinfo');
      // 清除mobx中的数据
      this.props.UserStore.clearUser();
      // 清除token数据
      this.props.RootStore.clearUserInfo();
    };
    const opts = [{title: '退出', onPress: tmplogout}];
    ActionSheet.show(opts, {title: '取消'});
  };
  render() {
    const user = this.props.UserStore.user;
    return (
      <View>
        <THNav title="通用设置" />
        <View>
          <ListItem title="设置陌生人问题" titleStyle={{color: '#666'}} chevron bottomDivider />
          <ListItem title="通知设置" titleStyle={{color: '#666'}} chevron bottomDivider />
          <ListItem title="黑名单" titleStyle={{color: '#666'}} chevron bottomDivider />
          <ListItem title="修改手机号" titleStyle={{color: '#666'}} chevron bottomDivider rightTitle={user.mobile} rightTitleStyle={{fontSize: pxToDp(15)}} />
        </View>
        <View style={{marginTop: pxToDp(30)}}>
          <TouchableOpacity
            onPress={this.logout}
            style={{width: '80%', height: pxToDp(40), borderRadius: pxToDp(20), backgroundColor: 'cyan', justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
            <Text style={{color: '#666'}}>退出登录</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Settings;
