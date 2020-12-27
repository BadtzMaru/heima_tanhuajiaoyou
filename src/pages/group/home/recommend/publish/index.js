import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, ScrollView, Image} from 'react-native';
import IconFont from '../../../../../components/IconFont';
import THNav from '../../../../../components/THNav';
import {pxToDp} from '../../../../../utils/stylesKits';
import Geo from '../../../../../utils/Geo';
import ImagePicker from 'react-native-image-picker';
import Toast from '../../../../../utils/Toast';
import {ActionSheet} from 'teaset';
import Emotion from '../../../../../components/Emotion';
import {QZ_IMG_UPLOAD, QZ_DT_PUBLISH} from '../../../../../utils/pathMap';
import request from '../../../../../utils/request';

class Publish extends Component {
  constructor() {
    super();
    this.refInput = React.createRef();
  }
  state = {
    textContent: '',
    longitude: '',
    latitude: '',
    location: '',
    // 临时图片数组
    tmpImgList: [],
    showEmotion: false,
  };
  // 设置输入框获得焦点
  handleSetInputFocus = () => {
    if (this.refInput.isFocused) {
      // 设置获得焦点
      this.refInput.focus();
    }
  };
  // 输入框的值改变事件
  onChangeText = (textContent) => {
    this.setState({textContent});
  };
  // 获取当前定位
  getCurrentPostion = async () => {
    const res = await Geo.getCityByLocation();
    console.log(res);
    const {province, city, district, township, streetNumber} = res.regeocode.addressComponent;
    this.setState({
      longitude: streetNumber.location.split(',')[0],
      latitude: streetNumber.location.split(',')[1],
      location: province + city + district + township,
    });
  };
  // 选择图片 拍摄 || 选择相册中的
  handleSelectImage = () => {
    const options = {
      title: '选择图片',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '相册',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('选择图片:', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const {tmpImgList} = this.state;
        if (tmpImgList.length >= 9) return Toast.message('图片的数量不能超过9');
        tmpImgList.push(response);
        this.setState({tmpImgList});
      }
    });
  };
  // 点击图片进行删除
  handleImageRemove = (i) => {
    const imgDelete = () => {
      const {tmpImgList} = this.state;
      tmpImgList.splice(i, 1);
      this.setState({tmpImgList});
      Toast.smile('删除成功');
    };
    const opts = [{title: '删除', onPress: imgDelete}];
    ActionSheet.show(opts, {title: '取消'});
  };
  // 选择了表情
  handleEmotionSelect = (value) => {
    this.setState({textContent: this.state.textContent + value.key});
  };
  // 切换显示表情组件
  toggleEmotion = () => {
    this.setState({showEmotion: !this.state.showEmotion});
  };
  // 上传图片
  uploadImg = async () => {
    const {tmpImgList} = this.state;
    if (tmpImgList.length) {
      const params = new FormData();
      tmpImgList.forEach((v) => {
        const imgObj = {
          uri: 'file://' + v.path,
          name: v.fileName,
          type: 'application/octet-stream',
        };
        params.append('images', imgObj);
      });
      const res = await request.privatePost(QZ_IMG_UPLOAD, params, {headers: {'Content-type': 'multipart/form-data;chartset=utf-8'}});
      console.log('上传图片:', res);
      return Promise.resolve(res.data.map((v) => ({headImgShortPath: v.headImgShortPath})));
    } else {
      return Promise.resolve([]);
    }
  };
  // 发动态
  submitTrend = async () => {
    // 1. 获取用户的输入 文本内容 && 图片 && 位置
    // 2. 先将选择的图片上传接口,返回图片在线的地址
    // 3. 将上面的数据结合图片一并提交后台
    // 4. 返回上一个页面, 推荐页面
    const {textContent, location, longitude, latitude, tmpImgList} = this.state;
    if (!textContent || !location || !longitude || !latitude) {
      return Toast.message('输入不合法');
    }
    const imageContent = await this.uploadImg();
    const params = {
      textContent,
      location,
      longitude,
      latitude,
      imageContent,
    };
    const res = await request.privatePost(QZ_DT_PUBLISH, params);
    console.log('发动态:', res);
    Toast.smile('发布动态成功');
    setTimeout(() => {
      // navigate 或者 goBack都是错误的
      // 1. tabbar -> friend -> group -> 发动态 组件内部的生命周期 componentsDidMount
      // 2. 返回上一个页面 => group -> 推荐 不会触发componentsDidMount
      // 3. 返回上一个页面的时候没有办法在推荐页面看到最新的动态
      this.props.navigation.reset({
        routes: [{name: 'Tabbar', params: {pagename: 'group'}}],
      });
    }, 2000);
  };
  render() {
    const {textContent, location, tmpImgList, showEmotion} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <THNav title="发动态" rightText="发帖" onRightPress={this.submitTrend} />
        {/* 1.0 输入框 开始 */}
        <TouchableOpacity onPress={this.handleSetInputFocus} style={{height: '40%'}}>
          <TextInput value={textContent} onChangeText={this.onChangeText} multiline ref={(ref) => (this.refInput = ref)} placeholder="请填写动态(140字以内)" />
        </TouchableOpacity>
        {/* 1.0 输入框 结束 */}

        {/* 2.0 定位 开始 */}
        <View style={{alignItems: 'flex-end', height: pxToDp(40), justifyContent: 'center', paddingRight: pxToDp(10)}}>
          <TouchableOpacity onPress={this.getCurrentPostion} style={{flexDirection: 'row', alignItems: 'center'}}>
            <IconFont style={{color: '#666', fontSize: pxToDp(16)}} name="iconlocation" />
            <Text style={{fontSize: pxToDp(12), color: '#aaa', marginLeft: pxToDp(5), marginRight: pxToDp(5)}}>{location || '你在哪里?'}</Text>
          </TouchableOpacity>
        </View>
        {/* 2.0 定位 结束 */}

        {/* 3.0 相册 开始 */}
        <View style={{paddingTop: pxToDp(5), paddingBottom: pxToDp(5)}}>
          <ScrollView horizontal>
            {tmpImgList.map((v, i) => (
              <TouchableOpacity key={i} onPress={this.handleImageRemove.bind(this, i)} style={{marginLeft: pxToDp(5), marginRight: pxToDp(5)}}>
                <Image source={{uri: v.uri}} style={{width: pxToDp(50), height: pxToDp(50)}} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {/* 3.0 相册 结束 */}

        {/* 4.0 工具栏 开始 */}
        <View style={{height: pxToDp(50), flexDirection: 'row', alignItems: 'center', backgroundColor: '#eee'}}>
          <TouchableOpacity onPress={this.handleSelectImage} style={{marginLeft: pxToDp(40), marginRight: pxToDp(40)}}>
            <IconFont name="icontupian" style={{fontSize: pxToDp(30), color: '#666'}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.toggleEmotion}>
            <IconFont name="iconbiaoqing" style={{fontSize: pxToDp(30), color: showEmotion ? '#df6a88' : '#666'}} />
          </TouchableOpacity>
        </View>
        {/* 4.0 工具栏 结束 */}

        {/* 5.0 表情组件 开始 */}
        {showEmotion ? <Emotion onPress={this.handleEmotionSelect} /> : <></>}
        {/* 5.0 表情组件 结束 */}
      </View>
    );
  }
}

export default Publish;
