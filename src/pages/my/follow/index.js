import React, {Component} from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomerBar from './components/CustomerBar';
import FollowEach from './followEach';
import FollowMe from './followMe';
import Ifollow from './Ifollow';
import request from '../../../utils/request';
import {MY_LIKELIST} from '../../../utils/pathMap';

class Index extends Component {
  state = {
    likeeachlist: [],
    ilikelist: [],
    likemelist: [],
  };
  componentDidMount() {
    this.getList();
  }
  // 获取喜欢相关数据
  getList = async () => {
    const res = await request.privateGet(MY_LIKELIST);
    console.log('关注喜欢粉丝列表:', res);
    const likeeachlist = res.data.likeeachlist;
    const ilikelist = res.data.ilikelist;
    const likemelist = res.data.likemelist;
    this.setState({likeeachlist, ilikelist, likemelist});
  };
  render() {
    const {likeeachlist, ilikelist, likemelist} = this.state;
    const index = this.props.route.params || 0;
    return (
      <ScrollableTabView initialPage={index} renderTabBar={() => <CustomerBar />}>
        <FollowEach tabLabel="互相关注" likeeachlist={likeeachlist} getList={this.getList} />
        <Ifollow tabLabel="喜欢" ilikelist={ilikelist} getList={this.getList} />
        <FollowMe tabLabel="粉丝" likemelist={likemelist} getList={this.getList} />
      </ScrollableTabView>
    );
  }
}

export default Index;
