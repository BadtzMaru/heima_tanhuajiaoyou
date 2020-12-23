import React, {Component} from 'react';
import {View, Text, ImageBackground, StyleSheet, Image} from 'react-native';
import THNav from '../../../components/THNav';
import request from '../../../utils/request';
import {FRIENDS_QUESTIONS, BASE_URI} from '../../../utils/pathMap';
import Swiper from 'react-native-deck-swiper';
import THButton from '../../../components/THButton';
import {pxToDp} from '../../../utils/stylesKits';

class TextSoul extends Component {
	state = {
		questions: [],
		// 当前测试题的索引
		currentIndex: 0,
	};
	componentDidMount() {
		this.getList();
	}
	// 获取问卷类表数据
	getList = async () => {
		const res = await request.privateGet(FRIENDS_QUESTIONS);
		this.setState({questions: res.data});
	};
	// 跳转到新页面 填写问卷页面
	goAskPage = () => {
		// 1. 获取到当前测试题等级
		// 2. 跳转页面并且带上数据 -> this.props.route
		const {questions, currentIndex} = this.state;
		this.props.navigation.navigate('TestQA', questions[currentIndex]);
	};
	render() {
		const {questions, currentIndex} = this.state;
		return (
			<View style={{flex: 1, backgroundColor: '#fff'}}>
				<THNav title="测性格" />
				<ImageBackground
					source={require('../../../res/testsoul_bg.png')}
					style={{width: '100%', height: '60%'}}
					imageStyle={{height: '100%'}}
				>
					{questions.length ? (
						<Swiper
							cards={questions}
							renderCard={(question) => {
								return (
									<View style={styles.card}>
										<Image
											source={{
												uri:
													BASE_URI + question.imgpath,
											}}
											style={{
												width: '100%',
												height: '100%',
											}}
										/>
									</View>
								);
							}}
							onSwiped={(cardIndex) =>
								this.setState({currentIndex: currentIndex + 1})
							}
							onSwipedAll={() => {
								console.log('onSwipedAll');
							}}
							cardIndex={0}
							backgroundColor={'transparent'}
							stackSize={1}
							cardVerticalMargin={0}
						></Swiper>
					) : (
						<></>
					)}
				</ImageBackground>
				<THButton
					style={{
						position: 'absolute',
						width: '80%',
						height: pxToDp(40),
						bottom: pxToDp(20),
						alignSelf: 'center',
					}}
					onPress={this.goAskPage}
				>
					开始测试
				</THButton>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	card: {
		height: '80%',
		borderRadius: 4,
		borderColor: '#E8E8E8',
		justifyContent: 'center',
		backgroundColor: 'white',
	},
});

export default TextSoul;
