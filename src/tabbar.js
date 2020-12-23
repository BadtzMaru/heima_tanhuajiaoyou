import React, {Component} from 'react';
import {View, Text} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Svg from 'react-native-svg-uri';
import {
	friend,
	selectedFriend,
	group,
	selectedGroup,
	message,
	selectedMessage,
	my,
	selectedMy,
} from './res/fonts/iconSvg';
import Friend from './pages/friend/home';
import Group from './pages/group/home';
import Message from './pages/message/home';
import My from './pages/my/home';
import request from './utils/request';
import {MY_INFO} from './utils/pathMap';
import {inject, observer} from 'mobx-react';

@inject('UserStore')
@observer
class Index extends Component {
	async componentDidMount() {
		// 1. 发送请求获取用户信息
		// 2. 用户信息存到 mobx 中
		const res = await request.privateGet(MY_INFO);
		console.log('个人信息:', res.data);
		this.props.UserStore.setUser(res.data);
	}
	state = {
		selectedTab: 'friend',
		pages: [
			{
				selected: 'friend',
				title: '交友',
				renderIcon: () => (
					<Svg width="20" height="20" svgXmlData={friend} />
				),
				renderSelectedIcon: () => (
					<Svg width="20" height="20" svgXmlData={selectedFriend} />
				),
				onPress: () => this.setState({selectedTab: 'friend'}),
				component: <Friend />,
			},
			{
				selected: 'group',
				title: '圈子',
				renderIcon: () => (
					<Svg width="20" height="20" svgXmlData={group} />
				),
				renderSelectedIcon: () => (
					<Svg width="20" height="20" svgXmlData={selectedGroup} />
				),
				onPress: () => this.setState({selectedTab: 'group'}),
				component: <Group />,
			},
			{
				selected: 'message',
				title: '消息',
				renderIcon: () => (
					<Svg width="20" height="20" svgXmlData={message} />
				),
				renderSelectedIcon: () => (
					<Svg width="20" height="20" svgXmlData={selectedMessage} />
				),
				onPress: () => this.setState({selectedTab: 'message'}),
				component: <Message />,
			},
			{
				selected: 'my',
				title: '我的',
				renderIcon: () => (
					<Svg width="20" height="20" svgXmlData={my} />
				),
				renderSelectedIcon: () => (
					<Svg width="20" height="20" svgXmlData={selectedMy} />
				),
				onPress: () => this.setState({selectedTab: 'my'}),
				component: <My />,
			},
		],
	};
	render() {
		const {selectedTab, pages} = this.state;
		return (
			<View style={{flex: 1, backgroundColor: '#fff'}}>
				<TabNavigator>
					{pages.map((v, i) => (
						<TabNavigator.Item
							key={i}
							selected={selectedTab === v.selected}
							title={v.title}
							renderIcon={v.renderIcon}
							renderSelectedIcon={v.renderSelectedIcon}
							onPress={v.onPress}
							selectedTitleStyle={{color: '#c863d5'}}
							tabStyle={{
								backgroundColor: '#eee',
								justifyContent: 'center',
							}}
						>
							{v.component}
						</TabNavigator.Item>
					))}
				</TabNavigator>
			</View>
		);
	}
}

export default Index;
