import React, {Component} from 'react';
import {View, Text, Image, StatusBar, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {pxToDp} from '../../../utils/stylesKits';
import {Input} from 'react-native-elements';
import validator from '../../../utils/validator';
import request from '../../../utils/request';
import {ACCOUNT_LOGIN, ACCOUNT_VALIDATEVCODE} from '../../../utils/pathMap';
import THButton from '../../../components/THButton';
import {CodeField, Cursor} from 'react-native-confirmation-code-field';
import Toast from '../../../utils/Toast';
import {inject, observer} from 'mobx-react';

@inject('RootStore')
@observer
class Login extends Component {
  state = {
    // 手机号码
    phoneNumber: '',
    // 手机号码是否合法
    phoneValid: true,
    // 是否显示登陆页面
    showLogin: true,
    // 验证码输入框的值
    vcodeTxt: '',
    // 倒计时按钮文本
    btnText: '重新获取',
    // 是否在倒计时中
    isCountDowning: false,
  };
  // 登录框手机号码输入
  phoneNumberChangeText = (phoneNumber) => {
    this.setState({phoneNumber});
  };
  // 手机号码点击完成事件
  phoneNumberSubmitEditing = async () => {
    const {phoneNumber} = this.state;
    /* 1. 对手机号码的合法性做校验 - 正则 */
    const phoneValid = validator.validatePhone(phoneNumber);
    if (!phoneValid) {
      // 没有通过
      return this.setState({phoneValid});
    }
    /* 2. 将手机号发送到后台对应接口 - 获取验证码 */
    this.setState({phoneValid: true});
    const res = await request.post(ACCOUNT_LOGIN, {phone: phoneNumber});
    console.log(res);
    /* 3. 将登录页面切换成填写验证码的页面 */
    if (res.code === '10000') {
      this.setState({showLogin: false});
      // 开启定时器
      this.countDown();
    } else {
    }
  };
  // 开启验证码定时器
  countDown = () => {
    if (this.state.isCountDowning) {
      return false;
    }
    let seconds = 5;
    this.setState({
      btnText: `重新获取(${seconds}s)`,
      isCountDowning: true,
    });
    let timeId = setInterval(() => {
      seconds--;
      this.setState({
        btnText: `重新获取(${seconds}s)`,
      });
      if (seconds === 0) {
        clearInterval(timeId);
        this.setState({
          btnText: `重新获取`,
          isCountDowning: false,
        });
      }
    }, 1000);
  };
  // 验证码输入完毕事件
  onVcodeSubmitEditing = async () => {
    // 1. 对验证码校验
    // 2. 将手机号码和验证码发送到后台
    //    将用户数据存放到mobx中
    // 3. 返回值 isNew (新旧用户)
    // 4. 新用户 -> 完善个人信息
    // 5. 老用户 -> 首页

    const {vcodeTxt, phoneNumber} = this.state;
    if (vcodeTxt.length !== 6) {
      return Toast.message('验证码格式不正确', 2000, 'center');
    }
    const res = await request.post(ACCOUNT_VALIDATEVCODE, {
      phone: phoneNumber,
      vcode: vcodeTxt,
    });
    console.log(res);
    if (res.code !== '10000') {
      return false;
    }
    // 存储用户数据到mobx中
    this.props.RootStore.setUserInfo(phoneNumber, res.data.token, res.data.id);
    // 存储用户数据到本地缓存中 永久存在 AsyncStorage
    AsyncStorage.setItem(
      'userinfo',
      JSON.stringify({
        mobile: phoneNumber,
        token: res.data.token,
        userId: res.data.id,
      }),
    );
    if (res.data.isNew) {
      // 新用户跳转到userinfo页面
      this.props.navigation.navigate('UserInfo');
    } else {
      // 老用户
      this.props.navigation.reset({
        routes: [{name: 'Tabbar'}],
      });
    }
  };
  // 渲染登陆页面
  renderLogin = () => {
    const {phoneNumber, phoneValid} = this.state;
    return (
      <View>
        {/* 标题 */}
        <View>
          <Text
            style={{
              fontSize: pxToDp(25),
              color: '#888',
              fontWeight: 'bold',
            }}>
            手机号登录注册
          </Text>
        </View>
        {/* 输入框 */}
        <View style={{marginTop: pxToDp(25)}}>
          <Input
            placeholder="请输入手机号码"
            leftIcon={{
              type: 'font-awesome',
              name: 'phone',
              color: '#ccc',
              size: pxToDp(20),
            }}
            maxLength={11}
            keyboardType="phone-pad"
            value={phoneNumber}
            inputStyle={{color: '#333'}}
            onChangeText={this.phoneNumberChangeText}
            errorMessage={phoneValid ? '' : '手机号码格式不正确'}
            onSubmitEditing={this.phoneNumberSubmitEditing}
          />
        </View>
        {/* 渐变按钮 */}
        <View>
          <THButton
            style={{
              borderRadius: pxToDp(20),
              width: '85%',
              height: pxToDp(40),
              alignSelf: 'center',
            }}
            onPress={this.phoneNumberSubmitEditing}>
            获取验证码
          </THButton>
        </View>
      </View>
    );
  };
  // 渲染填写验证码页面
  renderVcode = () => {
    const {phoneNumber, vcodeTxt, btnText} = this.state;
    return (
      <View>
        <View>
          <Text
            style={{
              fontSize: pxToDp(25),
              color: '#888',
              fontWeight: 'bold',
            }}>
            输入六位验证码
          </Text>
        </View>
        <View style={{marginTop: pxToDp(10)}}>
          <Text style={{color: '#888'}}>已经发到:+86 {phoneNumber}</Text>
        </View>
        <View>
          <CodeField
            value={vcodeTxt}
            onChangeText={this.onVcodeChangeText}
            onSubmitEditing={this.onVcodeSubmitEditing}
            cellCount={6}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            renderCell={({index, symbol, isFocused}) => (
              <Text key={index} style={[styles.cell, isFocused && styles.focusCell]}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>

        <View style={{marginTop: pxToDp(15)}}>
          <THButton
            disabled={this.state.isCountDowning}
            style={{
              borderRadius: pxToDp(20),
              width: '85%',
              height: pxToDp(40),
              alignSelf: 'center',
            }}
            onPress={this.repGetVcode}>
            {btnText}
          </THButton>
        </View>
      </View>
    );
  };
  // 重新获取验证码
  repGetVcode = () => {
    this.countDown();
  };
  // 验证码输入框的值改变事件
  onVcodeChangeText = (vcodeTxt) => {
    this.setState({
      vcodeTxt,
    });
  };
  render() {
    const {showLogin} = this.state;
    return (
      <View>
        {/* 0.0 手机状态栏 开始 */}
        <StatusBar backgroundColor="transparent" translucent={true} />
        {/* 0.0 手机状态栏 结束 */}
        {/* 1.0 背景图片 开始 */}
        <Image source={require('../../../res/profileBackground.jpg')} style={{width: '100%', height: pxToDp(220)}} />
        {/* 1.0 背景图片 结束 */}

        {/* 2.0 内容 开始 */}
        <View style={{padding: pxToDp(20)}}>
          {/* 2.1 登录 开始 */}
          {showLogin ? this.renderLogin() : this.renderVcode()}
          {/* 2.1 登录 结束 */}
        </View>
        {/* 2.0 内容 结束 */}
      </View>
    );
  }
}
export default Login;

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderBottomWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
    color: '#7d53ea',
  },
  focusCell: {
    borderColor: '#7d53ea',
    color: '#7d53ea',
  },
});
