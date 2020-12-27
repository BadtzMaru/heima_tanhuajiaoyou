import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, Modal, TextInput, ScrollView} from 'react-native';
import IconFont from '../../../../../components/IconFont';
import THNav from '../../../../../components/THNav';
import {BASE_URI, QZ_DT_PL, QZ_DT_PL_DZ, QZ_DT_PL_TJ} from '../../../../../utils/pathMap';
import {pxToDp} from '../../../../../utils/stylesKits';
import date from '../../../../../utils/date';
import THButton from '../../../../../components/THButton';
import request from '../../../../../utils/request';
import Toast from '../../../../../utils/Toast';

class Comment extends Component {
  params = {
    page: 1,
    pagesize: 5,
  };
  totalPages = 1;
  idLoading = false;
  state = {
    list: [],
    counts: 0,
    showInput: false,
    text: '',
  };
  componentDidMount() {
    this.getList();
  }
  // 获取评论
  getList = async (isNew = false) => {
    const url = QZ_DT_PL.replace(':id', this.props.route.params.tid);
    const res = await request.privateGet(url, this.params);
    console.log('获取评论:', res);
    if (isNew) {
      this.setState({list: res.data, counts: res.counts});
    } else {
      this.setState({list: [...this.state.list, ...res.data], counts: res.counts});
    }
    this.totalPages = res.pages;
    this.isLoading = false;
  };
  // 给评论点赞
  handleSetStar = async (id) => {
    const url = QZ_DT_PL_DZ.replace(':id', id);
    const res = await request.privateGet(url);
    console.log('评论点赞:', res);
    Toast.smile('点赞成功');
    this.params.page = 1;
    this.getList(true);
  };
  // 结束输入
  handleEditngEnd = () => {
    this.setState({showInput: false, text: ''});
  };
  // 完成编辑发布评论
  handleSubmit = async () => {
    const {text} = this.state;
    if (!text.trim()) {
      Toast.smile('评论不能为空');
      return;
    }
    const url = QZ_DT_PL_TJ.replace(':id', this.props.route.params.tid);
    const res = await request.privatePost(url, {comment: text});
    console.log('发布评论', res);
    this.handleEditngEnd();
    this.params.page = 1;
    this.getList(true);
    Toast.smile('评论成功');
  };
  // 滚动分页
  onScroll = ({nativeEvent}) => {
    // 1. 找到滚动条触底事件 | 还有没有下一页数据 | 节流
    const isReachBottom = nativeEvent.contentSize.height - nativeEvent.layoutMeasurement.height - nativeEvent.contentOffset.y < 10;
    const hasMore = this.params.page < this.totalPages;
    if (isReachBottom && hasMore && !this.isLoading) {
      this.isLoading = true;
      this.params.page++;
      this.getList();
    }
  };
  render() {
    const item = this.props.route.params;
    const {list, counts, showInput, text} = this.state;
    return (
      <ScrollView style={{backgroundColor: '#fff', flex: 1}} onScroll={this.onScroll}>
        <THNav title="最新评论" />
        {/* 1.0 用户信息 开始 */}
        <View style={{padding: pxToDp(10)}}>
          {/* 2.2.1 用户信息模块 开始 */}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{paddingRight: pxToDp(15)}}>
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
                <TouchableOpacity key={ii}>
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

          {/* 2.6 最新评论 发表评论 开始 */}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: '#666'}}>最新评论</Text>
              <View
                style={{
                  backgroundColor: 'red',
                  height: pxToDp(20),
                  width: pxToDp(20),
                  borderRadius: pxToDp(10),
                  marginLeft: pxToDp(5),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#fff'}}>{counts}</Text>
              </View>
            </View>
            <View>
              <THButton
                onPress={() => this.setState({showInput: true})}
                style={{width: pxToDp(80), height: pxToDp(20), borderRadius: pxToDp(10)}}
                textStyle={{fontSize: pxToDp(10)}}>
                发表评论
              </THButton>
            </View>
          </View>
          {/* 2.6 最新评论 发表评论 结束 */}

          {/* 2.7 评论列表 开始 */}
          <View>
            {list.map((v, i) => (
              <View
                key={i}
                style={{flexDirection: 'row', paddingTop: pxToDp(5), paddingBottom: pxToDp(5), borderBottomColor: '#ccc', borderBottomWidth: pxToDp(1), alignItems: 'center'}}>
                <View style={{paddingRight: pxToDp(10)}}>
                  <Image source={{uri: BASE_URI + v.header}} style={{width: pxToDp(40), height: pxToDp(40), borderRadius: pxToDp(20)}} />
                </View>
                <View>
                  <Text style={{color: '#666'}}>{v.nick_name}</Text>
                  <Text style={{color: '#666', fontSize: pxToDp(13), marginTop: pxToDp(5), marginBottom: pxToDp(5)}}>{date(v.create_time).format('YYYY-MM-DD HH:mm:ss')}</Text>
                  <Text>{v.content}</Text>
                </View>
                <TouchableOpacity onPress={this.handleSetStar.bind(this, v.cid)} style={{flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'flex-end'}}>
                  <IconFont name="icondianzan-o" style={{color: '#666', fontSize: pxToDp(13)}} />
                  <Text style={{color: '#666', marginLeft: pxToDp(3)}}>{v.star}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          {/* 2.7 评论列表 结束 */}

          <Modal onRequestClose={this.handleEditngEnd} visible={showInput} transparent={true} animationType="slide">
            <TouchableOpacity onPress={this.handleEditngEnd} style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', position: 'relative'}}>
              <View style={{position: 'absolute', width: '100%', left: 0, bottom: 0, backgroundColor: '#eee', flexDirection: 'row', alignItems: 'center', padding: pxToDp(5)}}>
                <TextInput
                  value={text}
                  onChangeText={(text) => this.setState({text})}
                  autoFocus
                  style={{backgroundColor: '#fff', flex: 5, borderRadius: pxToDp(18), height: pxToDp(36), paddingLeft: pxToDp(10)}}
                  placeholder="发表评论"
                  onSubmitEditing={this.handleSubmit}
                />
                <Text onPress={this.handleSubmit} style={{flex: 1, textAlign: 'center', color: '#666'}}>
                  发布
                </Text>
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
        {/* 1.0 用户信息 结束 */}

        {this.params.page >= this.totalPages ? (
          <View style={{height: pxToDp(40), alignItems: 'center', backgroundColor: '#ccc', justifyContent: 'center'}}>
            <Text>没有更多数据了</Text>
          </View>
        ) : (
          <></>
        )}
      </ScrollView>
    );
  }
}
export default Comment;
