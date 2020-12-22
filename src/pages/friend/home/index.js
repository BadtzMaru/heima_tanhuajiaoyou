import React, {Component} from 'react';
import {View, Text, StatusBar, Image} from 'react-native';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import {pxToDp} from '../../../utils/stylesKits';
import FriendHead from './components/FriendHead';
import Vistors from './components/Vistors';
import PerfectGirl from './components/PerfectGirl';
import request from '../../../utils/request';
import {BASE_URI, FRIENDS_RECOMMEND} from '../../../utils/pathMap';
import IconFont from '../../../components/IconFont';

class Index extends Component {
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
	getRecommends = async () => {
		const res = await request.privateGet(
			FRIENDS_RECOMMEND,
			this.state.params,
		);
		this.setState({recommends: res.data});
		console.log(res);
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
						}}
					>
						<StatusBar
							backgroundColor="transparent"
							translucent={true}
						/>
						<FriendHead />
					</View>
				)}
			>
				<View
					style={{
						height: 1000,
					}}
				>
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
							}}
						>
							<Text style={{color: '#666'}}>推荐</Text>
							<IconFont
								name="iconshaixuan"
								style={{color: '#666'}}
							/>
						</View>
						{/* 列表内容 */}
						<View>
							{recommends.map((v, i) => (
								<View
									key={i}
									style={{
										flexDirection: 'row',
										paddingTop: pxToDp(15),
										paddingBottom: pxToDp(15),
										borderBottomWidth: pxToDp(1),
										borderBottomColor: '#ccc',
									}}
								>
									{/* 图片 */}
									<View
										style={{
											paddingLeft: pxToDp(15),
											paddingRight: pxToDp(15),
										}}
									>
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
										}}
									>
										<View
											style={{
												flexDirection: 'row',
												alignItems: 'center',
											}}
										>
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
										}}
									>
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
								</View>
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
