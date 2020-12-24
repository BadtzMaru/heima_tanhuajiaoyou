import React, {Component} from 'react';
import {View, Text, StatusBar, Image, TouchableOpacity} from 'react-native';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import {pxToDp} from '../../../utils/stylesKits';
import FriendHead from './components/FriendHead';
import Vistors from './components/Vistors';
import PerfectGirl from './components/PerfectGirl';
import request from '../../../utils/request';
import {BASE_URI, FRIENDS_RECOMMEND} from '../../../utils/pathMap';
import IconFont from '../../../components/IconFont';
import {Overlay} from 'teaset';
import FilterPanel from './components/FilterPanel';
import {NavigationContext} from '@react-navigation/native';

class Index extends Component {
	static contextType = NavigationContext;
	state = {
		// 接口要的数据
		params: {
			page: 1,
			pagesize: 10,
			gender: '男',
			distance: 2,
			lastLogin: '',
			city: '',
			education: '',
		},
		// 推荐朋友 数组
		recommends: [],
	};
	componentDidMount() {
		this.getRecommends();
	}
	// 获取推荐朋友
	getRecommends = async (filterParams = {}) => {
		const res = await request.privateGet(FRIENDS_RECOMMEND, {
			...this.state.params,
			...filterParams,
		});
		console.log('获取推荐朋友: ', res);
		this.setState({recommends: res.data});
	};
	// 点击事件筛选浮层
	recommendFilterShow = () => {
		// 获取需要传递的参数
		const {page, pagesize, ...others} = this.state.params;
		let overlayRef = null;
		let overlayView = (
			<Overlay.View
				modal={true}
				overlayOpacity={0.3}
				ref={(v) => (overlayRef = v)}>
				{/* 筛选组件 */}
				<FilterPanel
					params={others}
					onClose={() => overlayRef.close()}
					onSubmitFilter={this.handleSubmitFilter}
				/>
			</Overlay.View>
		);
		Overlay.show(overlayView);
	};
	// 接收到了筛选组件传递过来的数据
	handleSubmitFilter = (filterParams) => {
		// 接收到的filterParams 和页面中旧的params做对象合并
		this.getRecommends(filterParams);
	};
	render() {
		const {recommends} = this.state;
		return (
			<HeaderImageScrollView
				maxHeight={pxToDp(130)}
				minHeight={pxToDp(44)}
				headerImage={require('../../../res/headfriend.png')}
				renderForeground={() => (
					<View
						style={{
							height: pxToDp(130),
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						<StatusBar
							backgroundColor="transparent"
							translucent={true}
						/>
						{/* 交友首页头部 三个按钮 */}
						<FriendHead />
					</View>
				)}>
				<View
					style={{
						height: 1000,
					}}>
					{/* 1.0 访客 开始 */}
					<Vistors />
					{/* 1.0 访客 结束 */}
					<PerfectGirl />

					{/* 2.0 推荐朋友 开始 */}
					<View>
						{/* 标题 */}
						<View
							style={{
								height: pxToDp(40),
								backgroundColor: '#eee',
								flexDirection: 'row',
								justifyContent: 'space-between',
								paddingLeft: pxToDp(10),
								paddingRight: pxToDp(10),
								alignItems: 'center',
							}}>
							<Text style={{color: '#666'}}>推荐</Text>
							<IconFont
								onPress={this.recommendFilterShow}
								name="iconshaixuan"
								style={{color: '#666'}}
							/>
						</View>
						{/* 列表内容 */}
						<View>
							{recommends.map((v, i) => (
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
											<Text style={{color: '#555'}}>
												{v.nick_name}
											</Text>
											<IconFont
												name={
													v.gender === '女'
														? 'icontanhuanv'
														: 'icontanhuanan'
												}
												style={{
													fontSize: pxToDp(18),
													color:
														v.gender === '女'
															? '#b564bf'
															: 'red',
												}}
											/>
											<Text style={{color: '#555'}}>
												{v.age}岁
											</Text>
										</View>
										<View style={{flexDirection: 'row'}}>
											<Text style={{color: '#555'}}>
												{v.marry}
											</Text>
											<Text style={{color: '#555'}}>
												|
											</Text>
											<Text style={{color: '#555'}}>
												{v.xueli}
											</Text>
											<Text style={{color: '#555'}}>
												|
											</Text>
											<Text style={{color: '#555'}}>
												{v.agediff < 10
													? '年龄相仿'
													: '有点代沟'}
											</Text>
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
										<Text style={{color: '#666'}}>
											{Math.floor(v.fateValue)}
										</Text>
									</View>
								</TouchableOpacity>
							))}
						</View>
					</View>
					{/* 2.0 推荐朋友 结束 */}
				</View>
			</HeaderImageScrollView>
		);
	}
}

export default Index;
