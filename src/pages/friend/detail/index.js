import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, Modal} from 'react-native';
import request from '../../../utils/request';
import {BASE_URI, FRIENDS_PERSONALINFO} from '../../../utils/pathMap';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import ImageViewer from 'react-native-image-zoom-viewer';
// teaset
import {Carousel} from 'teaset';
import {pxToDp} from '../../../utils/stylesKits';
import IconFont from '../../../components/IconFont';
import LinearGradient from 'react-native-linear-gradient';
import JMessage from '../../../utils/JMessage';
import {inject, observer} from 'mobx-react';
import Toast from '../../../utils/Toast';

@inject('UserStore')
@observer
class Detail extends Component {
  state = {userDetail: {}, trends: [], showAlbum: false, currentIndex: 0, imgUrls: []};
  params = {
    page: 1,
    pagesize: 2,
  };
  // 总页数
  totalPages = 1;
  // 当前是否有请求在发送中
  isLoading = false;
  // 获取朋友详情
  getDetail = async () => {
    const url = FRIENDS_PERSONALINFO.replace(':id', this.props.route.params.id);
    const res = await request.privateGet(url, this.params);
    console.log('用户详情', res);
    this.setState({userDetail: res.data, trends: [...this.state.trends, ...res.data.trends]});
    this.totalPages = res.pages;
    this.isLoading = false;
  };
  componentDidMount() {
    this.getDetail();
  }
  // 点击显示相册大图
  handleShowAlbum = (i, ii) => {
    const imgUrls = this.state.trends[i].album.map((v) => ({url: BASE_URI + v.thum_img_path}));
    const currentIndex = ii;
    const showAlbum = true;
    this.setState({imgUrls, currentIndex, showAlbum});
  };
  // 列表滚动事件
  onScroll = ({nativeEvent}) => {
    // 1. nativeEvent.contentSize.height 列表内容的高度
    // 2. nativeEvent.layoutMeasurement.height 可视区域的高度
    // 3. nativeEvent.contentOffset.y 滚动条距离顶部的高度
    const isReachBottom = nativeEvent.contentSize.height - nativeEvent.layoutMeasurement.height - nativeEvent.contentOffset.y < 10;
    const hasMore = this.params.page < this.totalPages;
    if (isReachBottom && hasMore && !this.isLoading) {
      this.isLoading = true;
      this.params.page++;
      this.getDetail();
    }
  };
  // 点击了喜欢按钮
  sendLike = async () => {
    // 收件人 => 正在被浏览的用户 this.state.userDetail
    // 文本内容 => 当前登录用户的手机号码 + 喜欢了你
    // 额外的数据 => 把当前登录用户 发送过去
    const guid = this.state.userDetail.guid;
    const text = this.props.UserStore.user.nick_name + '喜欢了你';
    const extras = {user: JSON.stringify(this.state.userDetail)};
    console.log(guid, text, extras);
    const res = await JMessage.sendTextMessage(guid, text, extras);
    console.log('极光发送数据返回:', res);
    Toast.smile('喜欢成功', 1000, 'center');
  };
  // 点击跳转到聊天页面
  goChat = () => {
    const {userDetail} = this.state;
    this.props.navigation.navigate('Chat', userDetail);
  };
  render() {
    const {userDetail, imgUrls, currentIndex, showAlbum, trends} = this.state;
    if (!userDetail.silder) return <></>;
    return (
      <HeaderImageScrollView
        onScroll={this.onScroll}
        maxHeight={pxToDp(220)}
        minHeight={pxToDp(40)}
        renderForeground={() => (
          <Carousel style={{height: pxToDp(220)}} control>
            {userDetail.silder.map((v, i) => (
              <Image key={i} source={{uri: BASE_URI + v.thum_img_path}} style={{width: '100%', height: pxToDp(220)}} />
            ))}
          </Carousel>
        )}>
        <View style={{backgroundColor: '#fff'}}>
          {/* 1.0 用户个人信息 开始 */}
          <View
            style={{
              padding: pxToDp(5),
              backgroundColor: '#ccc',
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                flexDirection: 'row',
                height: pxToDp(110),
                paddingLeft: pxToDp(10),
              }}>
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
                  <Text style={{color: '#555'}}>{userDetail.nick_name}</Text>
                  <IconFont
                    name={userDetail.gender === '女' ? 'icontanhuanv' : 'icontanhuanan'}
                    style={{
                      fontSize: pxToDp(18),
                      marginLeft: pxToDp(5),
                      marginRight: pxToDp(5),
                      color: userDetail.gender === '女' ? '#b564bf' : 'red',
                    }}
                  />
                  <Text style={{color: '#555'}}>{userDetail.age}岁</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      color: '#555',
                      marginRight: pxToDp(5),
                    }}>
                    {userDetail.marry}
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
                    {userDetail.xueli}
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
                    {userDetail.agediff < 10 ? '年龄相仿' : '有点代沟'}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    position: 'relative',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <IconFont
                    name="iconxihuan"
                    style={{
                      fontSize: pxToDp(50),
                      color: 'red',
                    }}
                  />
                  <Text
                    style={{
                      position: 'absolute',
                      color: '#fff',
                      fontSize: pxToDp(13),
                      fontWeight: 'bold',
                    }}>
                    {userDetail.fateValue}
                  </Text>
                </View>
                <Text
                  style={{
                    color: 'red',
                    fontSize: pxToDp(13),
                  }}>
                  缘分值
                </Text>
              </View>
            </View>
          </View>
          {/* 1.0 用户个人信息 结束 */}

          {/* 2.0 动态 开始 */}
          <View>
            {/* 2.1 标题 开始 */}
            <View
              style={{
                padding: pxToDp(10),
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomColor: '#ccc',
                borderBottomWidth: pxToDp(1),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#666'}}>动态</Text>
                <View
                  style={{
                    backgroundColor: 'red',
                    width: pxToDp(16),
                    height: pxToDp(16),
                    borderRadius: pxToDp(8),
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: pxToDp(5),
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                    }}>
                    {trends.length}
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={this.goChat}>
                  <LinearGradient
                    style={{
                      width: pxToDp(80),
                      height: pxToDp(30),
                      borderRadius: pxToDp(15),
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                    }}
                    colors={['#f2ab5a', '#ec7c50']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <IconFont name="iconliaotian" style={{color: '#fff'}}></IconFont>
                    <Text style={{color: '#fff'}}>聊一下</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft: pxToDp(8)}} onPress={this.sendLike}>
                  <LinearGradient
                    style={{
                      width: pxToDp(80),
                      height: pxToDp(30),
                      borderRadius: pxToDp(15),
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                    }}
                    colors={['#6d47f8', '#e56b7f']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <IconFont name="iconxihuan-o" style={{color: '#fff'}}></IconFont>
                    <Text style={{color: '#fff'}}>喜欢</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
            {/* 2.1 标题 结束 */}

            {/* 2.2 列表 开始 */}
            <View>
              {trends.map((v, i) => (
                <View key={i} style={{padding: pxToDp(10), borderBottomWidth: pxToDp(1), borderBottomColor: '#ccc'}}>
                  {/* 2.2.1 用户信息模块 开始 */}
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        paddingRight: pxToDp(15),
                      }}>
                      <Image
                        source={{
                          uri: BASE_URI + userDetail.header,
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
                        flex: 2,
                        justifyContent: 'space-around',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Text style={{color: '#555'}}>{userDetail.nick_name}</Text>
                        <IconFont
                          name={userDetail.gender === '女' ? 'icontanhuanv' : 'icontanhuanan'}
                          style={{
                            fontSize: pxToDp(18),
                            marginLeft: pxToDp(5),
                            marginRight: pxToDp(5),
                            color: userDetail.gender === '女' ? '#b564bf' : 'red',
                          }}
                        />
                        <Text style={{color: '#555'}}>{userDetail.age}岁</Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={{
                            color: '#555',
                            marginRight: pxToDp(5),
                          }}>
                          {userDetail.marry}
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
                          {userDetail.xueli}
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
                          {userDetail.agediff < 10 ? '年龄相仿' : '有点代沟'}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {/* 2.2.1 用户信息模块 结束 */}

                  {/* 2.3 动态内容 开始 */}
                  <View style={{marginTop: pxToDp(8)}}>
                    <Text style={{color: '#666'}}>{v.content}</Text>
                  </View>
                  {/* 2.3 动态内容 结束 */}

                  {/* 2.4 相册开始 开始 */}
                  {v.album && v.album.length ? (
                    <View style={{flexWrap: 'wrap', flexDirection: 'row', paddingTop: pxToDp(5), paddingBottom: pxToDp(5)}}>
                      {v.album.map((vv, ii) => (
                        <TouchableOpacity key={ii} onPress={() => this.handleShowAlbum(i, ii)}>
                          <Image source={{uri: BASE_URI + vv.thum_img_path}} style={{width: pxToDp(70), height: pxToDp(70), marginRight: pxToDp(5)}} />
                        </TouchableOpacity>
                      ))}
                    </View>
                  ) : (
                    <></>
                  )}
                  {/* 2.4 相册开始 结束 */}
                </View>
              ))}
            </View>
            {/* 2.2 列表 结束 */}
          </View>
          {/* 2.0 动态 结束 */}

          {this.params.page >= this.totalPages ? (
            <View style={{height: pxToDp(50), alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{color: '#666'}}>没有更多数据了</Text>
            </View>
          ) : (
            <></>
          )}

          <Modal visible={showAlbum} transparent={true}>
            <ImageViewer imageUrls={imgUrls} index={currentIndex} onClick={() => this.setState({showAlbum: false})} />
          </Modal>
        </View>
      </HeaderImageScrollView>
    );
  }
}

export default Detail;
