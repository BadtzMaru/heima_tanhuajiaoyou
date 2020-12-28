import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import THNav from '../../../components/THNav';
import request from '../../../utils/request';
import {FRIENDS_VISITORS, BASE_URI} from '../../../utils/pathMap';
import {pxToDp} from '../../../utils/stylesKits';
import IconFont from '../../../components/IconFont';

class Visitors extends Component {
  state = {
    list: [],
  };
  componentDidMount() {
    this.getlist();
  }
  getlist = async () => {
    const res = await request.privateGet(FRIENDS_VISITORS);
    console.log('最近访问:', res);
    this.setState({list: res.data});
  };
  render() {
    const {list} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <THNav title="谁看过我" />

        {/* 小圆圈 开始 */}
        <View style={{padding: pxToDp(10), backgroundColor: '#eee', alignItems: 'center'}}>
          <View style={{flexDirection: 'row', marginBottom: pxToDp(10)}}>
            {list.map((v, i) => (
              <Image style={{width: pxToDp(40), height: pxToDp(40), borderRadius: pxToDp(20), marginLeft: pxToDp(5), marginRight: pxToDp(5)}} source={{uri: BASE_URI + v.header}} />
            ))}
          </View>
          <Text style={{color: '#666'}}>最近有{list.length}来访,快去查看...</Text>
        </View>
        {/* 小圆圈 结束 */}

        {/* 列表内容 开始 */}
        <View>
          {list.map((v, i) => (
            <TouchableOpacity
              key={i}
              style={{
                flexDirection: 'row',
                paddingTop: pxToDp(15),
                paddingBottom: pxToDp(15),
                borderBottomWidth: pxToDp(1),
                borderBottomColor: '#ccc',
              }}
              onPress={() =>
                this.context.navigate('Detail', {
                  id: v.id,
                })
              }>
              {/* 图片 */}
              <View
                style={{
                  paddingLeft: pxToDp(15),
                  paddingRight: pxToDp(15),
                }}>
                <Image
                  source={{uri: BASE_URI + v.header}}
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
                  <Text style={{color: '#555'}}>{v.nick_name}</Text>
                  <IconFont
                    name={v.gender === '女' ? 'icontanhuanv' : 'icontanhuanan'}
                    style={{
                      fontSize: pxToDp(18),
                      color: v.gender === '女' ? '#b564bf' : 'red',
                    }}
                  />
                  <Text style={{color: '#555'}}>{v.age}岁</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: '#555'}}>{v.marry}</Text>
                  <Text style={{color: '#555'}}>|</Text>
                  <Text style={{color: '#555'}}>{v.xueli}</Text>
                  <Text style={{color: '#555'}}>|</Text>
                  <Text style={{color: '#555'}}>{v.agediff < 10 ? '年龄相仿' : '有点代沟'}</Text>
                </View>
              </View>
              {/* 缘分值 */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: pxToDp(80),
                  justifyContent: 'center',
                }}>
                <IconFont
                  name="iconxihuan"
                  style={{
                    color: 'red',
                    fontSize: pxToDp(30),
                  }}
                />
                <Text style={{color: '#666'}}>{Math.floor(v.fateValue)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        {/* 列表内容 结束 */}
      </View>
    );
  }
}

export default Visitors;
