import React, {Component} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity, Modal} from 'react-native';
import request from '../../../../utils/request';
import {BASE_URI, QZ_TJDT, QZ_DT_DZ, QZ_DT_XH, QZ_DT_BGXQ} from '../../../../utils/pathMap';
import IconFont from '../../../../components/IconFont';
import {pxToDp} from '../../../../utils/stylesKits';
import date from '../../../../utils/date';
import Toast from '../../../../utils/Toast';
import JMessage from '../../../../utils/JMessage';
import {inject, observer} from 'mobx-react';
import {ActionSheet} from 'teaset';
import ImageViewer from 'react-native-image-zoom-viewer';

@inject('UserStore')
@observer
class Recommend extends Component {
  params = {
    page: 1,
    pagesize: 5,
  };
  totalPages = 1;
  isLoading = false;
  state = {
    list: [],
    showAlbum: false,
    imgUrls: [],
    currentIndex: 0,
  };
  componentDidMount() {
    this.getList();
  }
  // 获取推荐动态的数据
  getList = async (isNew = false) => {
    const res = await request.privateGet(QZ_TJDT, this.params);
    console.log('获取推荐列表:', res);
    if (isNew) {
      // 重置数据
      this.setState({list: res.data});
    } else {
      this.setState({list: [...this.state.list, ...res.data]});
      this.totalPages = res.pages;
    }
    this.isLoading = false;
  };
  // 滚动条触底事件
  onEndReached = () => {
    // 1. 判断还有没有下一页数据
    // 2. 加节流阀
    if (this.params.page >= this.totalPages || this.isLoading) {
      return;
    } else {
      this.isLoading = true;
      this.params.page++;
      this.getList();
    }
  };
  // 点赞
  handleStar = async (item) => {
    // 1 构造参数,发送请求
    // 2. 返回值提示 点赞成功还是取消点赞
    // 3. 点赞成功 => 极光发送一条消息 'xxx 点赞了你的动态'
    // 4. 重新发送请求获取列表数据 -> 渲染
    const url = QZ_DT_DZ.replace(':id', item.tid);
    const res = await request.privateGet(url);
    console.log('点赞:', res);
    // 点赞成功还是取消点赞
    if (res.data.iscancelstar) {
      // 取消点赞
      Toast.smile('取消成功');
    } else {
      // 点赞成功
      Toast.smile('点赞成功');
      JMessage.sendTextMessage(item.guid, `${this.props.UserStore.user.nick_name} 点赞了你的动态`, {user: JSON.stringify(this.props.UserStore.user)});
    }
    // 重新发送请求获取数据
    this.params.page = 1;
    this.getList(true);
  };
  // 喜欢
  handleLike = async (item) => {
    const url = QZ_DT_XH.replace(':id', item.tid);
    const res = await request.privateGet(url);
    console.log('喜欢:', res);
    if (res.data.iscancelstar) {
      // 取消喜欢
      Toast.smile('取消喜欢');
    } else {
      // 喜欢成功
      Toast.smile('喜欢成功');
    }
    // 重新发送请求获取数据
    this.params.page = 1;
    this.getList(true);
  };
  // 点击了更多按钮
  handleMore = async (item) => {
    // ActionSheet
    const opts = [
      {title: '举报', onPress: () => alert('举报')},
      {title: '不感兴趣', onPress: () => this.noInterset(item)},
    ];
    ActionSheet.show(opts, {title: '取消'});
  };
  // 不感兴趣 => 动态列表里面就不会出现当前用户
  noInterset = async (item) => {
    const url = QZ_DT_BGXQ.replace(':id', item.tid);
    const res = await request.privateGet(url);
    console.log('不感兴趣:', res);
    Toast.smile('操作成功');
    this.params.page = 1;
    this.getList(true);
  };
  // 点击了相册图片放大
  handleShowAlbum = (index, ii) => {
    const imgUrls = this.state.list[index].images.map((v) => ({url: BASE_URI + v.thum_img_path}));
    this.setState({imgUrls, currentIndex: ii, showAlbum: true});
  };
  render() {
    const {list, imgUrls, currentIndex, showAlbum} = this.state;
    return (
      <>
        <FlatList
          onEndReachedThreshold={0.1}
          onEndReached={this.onEndReached}
          data={list}
          keyExtractor={(v) => v.tid + ''}
          renderItem={({item, index}) => (
            <>
              <View key={index} style={{padding: pxToDp(10), borderBottomWidth: pxToDp(1), borderBottomColor: '#ccc'}}>
                {/* 2.2.1 用户信息模块 开始 */}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      paddingRight: pxToDp(15),
                    }}>
                    <Image
                      source={{
                        uri: BASE_URI + item.header,
                      }}
                      style={{
                        width: pxToDp(40),
                        height: pxToDp(40),
                        borderRadius: pxToDp(20),
                      }}
                    />
                  </View>
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
                      <Text style={{color: '#555'}}>{item.nick_name}</Text>
                      <IconFont
                        name={item.gender === '女' ? 'icontanhuanv' : 'icontanhuanan'}
                        style={{
                          fontSize: pxToDp(18),
                          marginLeft: pxToDp(5),
                          marginRight: pxToDp(5),
                          color: item.gender === '女' ? '#b564bf' : 'red',
                        }}
                      />
                      <Text style={{color: '#555'}}>{item.age}岁</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: '#555',
                          marginRight: pxToDp(5),
                        }}>
                        {item.marry}
                      </Text>
                      <Text
                        style={{
                          color: '#555',
                          marginRight: pxToDp(5),
                        }}>
                        |
                      </Text>
                      <Text
                        style={{
                          color: '#555',
                          marginRight: pxToDp(5),
                        }}>
                        {item.xueli}
                      </Text>
                      <Text
                        style={{
                          color: '#555',
                          marginRight: pxToDp(5),
                        }}>
                        |
                      </Text>
                      <Text
                        style={{
                          color: '#555',
                          marginRight: pxToDp(5),
                        }}>
                        {item.agediff < 10 ? '年龄相仿' : '有点代沟'}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={this.handleMore.bind(this, item)}>
                    <IconFont name="icongengduo" style={{color: '#666', fontSize: pxToDp(20)}} />
                  </TouchableOpacity>
                </View>
                {/* 2.2.1 用户信息模块 结束 */}

                {/* 2.3 动态内容 开始 */}
                <View style={{marginTop: pxToDp(8)}}>
                  <Text style={{color: '#666'}}>{item.content}</Text>
                </View>
                {/* 2.3 动态内容 结束 */}

                {/* 2.4 相册开始 开始 */}
                {item.images && item.images.length ? (
                  <View style={{flexWrap: 'wrap', flexDirection: 'row', paddingTop: pxToDp(5), paddingBottom: pxToDp(5)}}>
                    {item.images.map((vv, ii) => (
                      <TouchableOpacity key={ii} onPress={() => this.handleShowAlbum(index, ii)}>
                        <Image source={{uri: BASE_URI + vv.thum_img_path}} style={{width: pxToDp(70), height: pxToDp(70), marginRight: pxToDp(5)}} />
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : (
                  <></>
                )}
                {/* 2.4 相册开始 结束 */}

                {/* 2.5 距离时间 开始 */}
                <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: pxToDp(5), paddingBottom: pxToDp(5)}}>
                  <Text style={{color: '#666'}}>距离 {Math.floor(item.dist / 1000)} km</Text>
                  <Text style={{marginLeft: pxToDp(8), color: '#666'}}>{date(item.create_time).fromNow()}</Text>
                </View>
                {/* 2.5 距离时间 结束 */}

                {/* 2.6 三个小图标 开始 */}
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <TouchableOpacity onPress={this.handleStar.bind(this, item)} style={{flexDirection: 'row', alignItems: 'center'}}>
                    <IconFont name="icondianzan-o" style={{color: '#666'}} />
                    <Text style={{color: '#666', marginLeft: pxToDp(5)}}>{item.star_count}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
                    <IconFont name="iconpinglun" style={{color: '#666'}} />
                    <Text style={{color: '#666', marginLeft: pxToDp(5)}}>{item.comment_count}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.handleLike.bind(this, item)} style={{flexDirection: 'row', alignItems: 'center'}}>
                    <IconFont name="iconxihuan-o" style={{color: '#666'}} />
                    <Text style={{color: '#666', marginLeft: pxToDp(5)}}>{item.like_count}</Text>
                  </TouchableOpacity>
                </View>
                {/* 2.6 三个小图标 结束 */}
              </View>

              {/* 没有更多数据 开始 */}
              {this.params.page >= this.totalPages && index === list.length - 1 ? (
                <View style={{height: pxToDp(30), alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{color: '#666'}}>没有数据</Text>
                </View>
              ) : (
                <></>
              )}
              {/* 没有更多数据 结束 */}
            </>
          )}
        />
        <Modal visible={showAlbum} transparent={true}>
          <ImageViewer imageUrls={imgUrls} index={currentIndex} onClick={() => this.setState({showAlbum: false})} />
        </Modal>
      </>
    );
  }
}

export default Recommend;
