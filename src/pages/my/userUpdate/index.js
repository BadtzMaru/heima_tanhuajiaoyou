import React, {Component} from 'react';
import {View, Text, Image, TextInput} from 'react-native';
import THNav from '../../../components/THNav';
import {inject, observer} from 'mobx-react';
import {ListItem} from 'react-native-elements';
import {pxToDp} from '../../../utils/stylesKits';
import {BASE_URI, ACCOUNT_CHECKHEADIMAGE, MY_SUBMITUSERINFO, MY_INFO} from '../../../utils/pathMap';
import request from '../../../utils/request';
import date from '../../../utils/date';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from '../../../utils/Toast';
import {Overlay} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import Picker from 'react-native-picker';
import CityJson from '../../../res/citys.json';

@inject('UserStore')
@observer
class UserUpdate extends Component {
  state = {
    showNickName: false,
    showGender: false,
  };
  // 选择头像
  onPickerImage = async () => {
    // 获取选中后的图片
    const image = await ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    });
    console.log(image);
    // 将本地图片上传到服务器
    const res = await this.uploadHeadImg(image);
    console.log(('头像上传', res));
    const header = res.data.headImgShortPath;
    const res2 = await this.onSubmitUser({header});
    console.log('完成编辑:', res2);
  };
  // 完成编辑
  onSubmitUser = async (user) => {
    const res = await request.privatePost(MY_SUBMITUSERINFO, user);
    Toast.smile('修改成功');
    // 刷新数据
    const res2 = await request.privateGet(MY_INFO);
    console.log('个人信息:', res2.data);
    this.props.UserStore.setUser(res2.data);
    return Promise.resolve(res);
  };
  // 上传头像
  uploadHeadImg = (image) => {
    //  构造参数发送到后台,完成头像上传
    let formData = new FormData();
    formData.append('headPhoto', {
      // 本地图片的地址
      uri: image.path,
      // 图片类型
      type: image.mime,
      // 图片的名称
      name: image.path.split('/').pop(),
    });
    // 执行头像上传
    return request.privatePost(ACCOUNT_CHECKHEADIMAGE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };
  // 编辑昵称
  nickNameUpdate = async (e) => {
    const nickname = e.nativeEvent.text;
    console.log(nickname);
    if (!nickname) return;
    await this.onSubmitUser({nickname});
    this.setState({showNickName: false});
  };
  // 编辑生日
  birthdayUpdate = async (birthday) => {
    this.onSubmitUser({birthday});
  };
  // 编辑性别
  genderUpdate = async (gender) => {
    await this.onSubmitUser({gender});
    this.setState({showGender: false});
  };
  // 显示城市选择组件
  showCityPicker = async () => {
    Picker.init({
      // 显示哪些数据 全国城市数据
      pickerData: CityJson,
      // 默认选择哪一个数据
      selectedValue: ['北京', '北京'],
      wheelFlex: [1, 1, 0], // 显示省和市
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '选择城市',
      onPickerConfirm: this.cityUpdate,
    });
    Picker.show();
  };
  // 编辑城市
  cityUpdate = async (arr) => {
    const city = arr[1];
    await this.onSubmitUser({city});
  };
  // 显示学历选择框
  showXueli = async () => {
    Picker.init({
      pickerData: ['博士后', '博士', '硕士', '本科', '大专', '高中', '留学', '其他'],
      selectedValue: ['其他'],
      wheelFlex: [1, 0, 0], // 显示省和市
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '选择学历',
      onPickerConfirm: this.xueliUpdate,
    });
    Picker.show();
  };
  // 编辑学历
  xueliUpdate = async (arr) => {
    const xueli = arr[0];
    await this.onSubmitUser({xueli});
  };
  // 显示婚姻选择框
  showMarryPicker = async () => {
    Picker.init({
      pickerData: ['单身', '已婚'],
      selectedValue: ['单身'],
      wheelFlex: [1, 0, 0], // 显示省和市
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '选择婚姻状态',
      onPickerConfirm: this.marryUpdate,
    });
    Picker.show();
  };
  // 编辑婚姻状态
  marryUpdate = async (arr) => {
    const marry = arr[0];
    await this.onSubmitUser({marry});
  };
  render() {
    const {showNickName, showGender} = this.state;
    const user = this.props.UserStore.user;
    return (
      <View>
        <Overlay isVisible={showNickName} onBackdropPress={() => this.setState({showNickName: false})}>
          <TextInput placeholder="修改昵称" onSubmitEditing={this.nickNameUpdate} style={{width: pxToDp(200)}} />
        </Overlay>
        <Overlay isVisible={showGender} onBackdropPress={() => this.setState({showGender: false})}>
          <View style={{width: pxToDp(200), height: pxToDp(60), justifyContent: 'space-evenly'}}>
            <Text style={{color: '#666'}} onPress={() => this.genderUpdate('男')}>
              男
            </Text>
            <Text style={{color: '#666'}} onPress={() => this.genderUpdate('女')}>
              女
            </Text>
          </View>
        </Overlay>
        <THNav title="编辑资料" />
        {/* 用户信息 开始 */}
        <ListItem
          title="头像"
          rightElement={<Image style={{width: pxToDp(40), height: pxToDp(40), borderRadius: pxToDp(20)}} source={{uri: BASE_URI + user.header}} />}
          titleStyle={{color: '#666'}}
          chevron
          bottomDivider
          onPress={this.onPickerImage}
        />
        <ListItem title="昵称" onPress={() => this.setState({showNickName: true})} titleStyle={{color: '#666'}} rightTitle={user.nick_name} chevron bottomDivider />
        <View style={{position: 'relative'}}>
          <ListItem title="生日" titleStyle={{color: '#666'}} rightTitle={date(user.birthday).format('YYYY-MM-DD')} chevron bottomDivider />
          <DatePicker
            androidMode="spinner"
            style={{width: '100%', position: 'absolute', top: 0, left: 0, height: '100%', opacity: 0}}
            date={date(user.birthday).format('YYYY-MM-DD')}
            mode="date"
            placeholder="设置生日"
            format="YYYY-MM-DD"
            minDate="1900-01-01"
            maxDate={date(new Date()).format('YYYY-MM-DD')}
            confirmBtnText="确认"
            cancelBtnText="取消"
            onDateChange={(birthday) => this.birthdayUpdate(birthday)}
          />
        </View>
        <ListItem title="性别" onPress={() => this.setState({showGender: true})} titleStyle={{color: '#666'}} rightTitle={user.gender} chevron bottomDivider />
        <ListItem title="现居城市" onPress={this.showCityPicker} titleStyle={{color: '#666'}} rightTitle={user.city} chevron bottomDivider />
        <ListItem title="学历" onPress={this.showXueli} titleStyle={{color: '#666'}} rightTitle={user.xueli} chevron bottomDivider />
        <ListItem title="月收入" titleStyle={{color: '#666'}} rightTitle={'15-25k'} chevron bottomDivider />
        <ListItem title="行业" titleStyle={{color: '#666'}} rightTitle={'前端工程师'} chevron bottomDivider />
        <ListItem title="婚姻状态" onPress={this.showMarryPicker} titleStyle={{color: '#666'}} rightTitle={user.marry} chevron bottomDivider />
        {/* 用户信息 结束 */}
      </View>
    );
  }
}

export default UserUpdate;
