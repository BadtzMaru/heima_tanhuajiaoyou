import React, {Component} from 'react';
import {
	TouchableOpacity,
	View,
	Text,
	ImageBackground,
	StyleSheet,
	Image,
} from 'react-native';
import THNav from '../../../components/THNav';
import Swiper from 'react-native-deck-swiper';
import request from '../../../utils/request';
import {FRIENDS_CARDS, BASE_URI, FRIENDS_LIKE} from '../../../utils/pathMap';
import IconFont from '../../../components/IconFont';
import {pxToDp} from '../../../utils/stylesKits';
import {Toast} from 'teaset';

class Index extends Component {
	params = {
		page: 1,
		pagesize: 5,
	};
	// 总页数
	totalPages = 5;
	state = {
		// 当前被操作的数组的索引
		currentIndex: 0,
		cards: [],
	};

	constructor() {
		super();
		this.swiperRef = React.createRef();
	}
	componentDidMount() {
		this.getFriendsCards();
	}

	// 获取要渲染的数据
	getFriendsCards = async () => {
		const res = await request.privateGet(FRIENDS_CARDS, this.params);
		this.totalPages = res.pages;
		this.setState({cards: [...this.state.cards, ...res.data]});
	};

	// 设置用户喜欢或者不喜欢
	setLike = async (type) => {
		this.sendLike(type);
		if (type === 'dislike') {
			this.swiperRef.swipeLeft();
		} else {
			this.swiperRef.swipeRight();
		}
	};

	// 设置发送喜欢和不喜欢
	sendLike = async (type) => {
		const id = this.state.cards[this.state.currentIndex].id;
		const url = FRIENDS_LIKE.replace(':id', id).replace(':type', type);
		const res = await request.privateGet(url);
		Toast.message(res.data, 1000, 'center');
	};

	// 图片滑动完毕就会触发
	onSwipedAll = () => {
		if (this.params.page >= this.totalPages) {
			Toast.message('没有下一页数据', 1000, 'center');
			return;
		} else {
			this.params.page++;
			this.getFriendsCards();
		}
	};
	render() {
		const {cards, currentIndex} = this.state;
		return (
			<View style={{flex: 1, backgroundColor: '#fff'}}>
				<THNav title="探花" />
				<ImageBackground
					imageStyle={{height: '100%'}}
					style={{height: '60%'}}
					source={require('../../../res/testsoul_bg.png')}
				>
					{cards[currentIndex] ? (
						<Swiper
							key={Date.now()}
							ref={(ref) => (this.swiperRef = ref)}
							cards={cards}
							renderCard={(card) => {
								return (
									<View style={styles.card}>
										<Image
											source={{
												uri: BASE_URI + card.header,
											}}
											style={{
												width: '100%',
												height: '80%',
											}}
										/>
										{/* 网友信息 开始 */}
										<View
											style={{
												flex: 1,
												justifyContent: 'space-around',
												alignItems: 'center',
											}}
										>
											<View
												style={{
													flexDirection: 'row',
													alignItems: 'center',
												}}
											>
												<Text style={{color: '#555'}}>
													{card.nick_name}
												</Text>
												<IconFont
													style={{
														fontSize: pxToDp(18),
														color:
															card.gender === '女'
																? '#b564bf'
																: 'red',
													}}
													name={
														card.gender === '女'
															? 'icontanhuanv'
															: 'icontanhuanan'
													}
												/>
												<Text style={{color: '#555'}}>
													{card.age}岁
												</Text>
											</View>
											<View
												style={{flexDirection: 'row'}}
											>
												<Text style={{color: '#555'}}>
													{card.marry}
												</Text>
												<Text style={{color: '#555'}}>
													|
												</Text>
												<Text style={{color: '#555'}}>
													{card.xueli}
												</Text>
												<Text style={{color: '#555'}}>
													|
												</Text>
												<Text style={{color: '#555'}}>
													{card.agediff < 10
														? '年龄相仿'
														: '有点代沟'}
												</Text>
											</View>
										</View>
										{/* 网友信息 结束 */}
									</View>
								);
							}}
							onSwiped={() => {
								this.setState({
									currentIndex: this.state.currentIndex + 1,
								});
							}}
							onSwipedAll={this.onSwipedAll}
							onSwipedLeft={this.sendLike.bind(this, 'dislike')}
							onSwipedRight={this.sendLike.bind(this, 'like')}
							cardIndex={currentIndex}
							backgroundColor={'transparnet'}
							cardVerticalMargin={0}
							stackSize={3}
						></Swiper>
					) : (
						<></>
					)}
				</ImageBackground>

				{/* 两个小图标 开始 */}
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						width: '60%',
						alignSelf: 'center',
						marginTop: pxToDp(40),
					}}
				>
					<TouchableOpacity
						onPress={this.setLike.bind(this, 'dislike')}
						style={{
							backgroundColor: '#ebc869',
							width: pxToDp(60),
							height: pxToDp(60),
							borderRadius: pxToDp(30),
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<IconFont
							style={{fontSize: pxToDp(30), color: '#fff'}}
							name="iconbuxihuan"
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={this.setLike.bind(this, 'like')}
						style={{
							backgroundColor: '#fd5213',
							width: pxToDp(60),
							height: pxToDp(60),
							borderRadius: pxToDp(30),
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<IconFont
							style={{fontSize: pxToDp(30), color: '#fff'}}
							name="iconxihuan"
						/>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	card: {
		height: '60%',
		borderRadius: 4,
		borderWidth: 2,
		borderColor: '#E8E8E8',
		backgroundColor: 'white',
	},
	text: {
		textAlign: 'center',
		fontSize: 50,
		backgroundColor: 'transparent',
	},
});

export default Index;
