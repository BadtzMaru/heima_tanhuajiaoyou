import React, {Component} from 'react';
import {
	View,
	Text,
	ImageBackground,
	Image,
	TouchableOpacity,
} from 'react-native';
import request from '../../../../utils/request';
import {
	BASE_URI,
	FRIENDS_QUESTIONSECTION,
	FRIENDS_QUESTIONANS,
} from '../../../../utils/pathMap';
import THNav from '../../../../components/THNav';
import {pxToDp} from '../../../../utils/stylesKits';
import {inject, observer} from 'mobx-react';
import LinearGradient from 'react-native-linear-gradient';

@inject('UserStore')
@observer
class TestQA extends Component {
	titles = {
		初级: require('../../../../res/leve1.png'),
		中级: require('../../../../res/leve2.png'),
		高级: require('../../../../res/leve3.png'),
	};
	ansList = [];
	state = {
		// 测试题问卷类表数据
		questionList: [],
		currentIndex: 0,
	};
	componentDidMount() {
		this.getList();
	}
	// 获取测试题问卷
	getList = async () => {
		const url = FRIENDS_QUESTIONSECTION.replace(
			':id',
			this.props.route.params.qid,
		);
		const res = await request.privateGet(url);
		this.setState({questionList: res.data});
	};
	getFont = (number) => {
		let numCn = '';
		switch (number) {
			case 1:
				numCn = '一';
				break;
			case 2:
				numCn = '二';
				break;
			case 3:
				numCn = '三';
				break;
			case 4:
				numCn = '四';
				break;
			case 5:
				numCn = '五';
				break;
			case 6:
				numCn = '六';
				break;
			case 7:
				numCn = '七';
				break;
			case 8:
				numCn = '八';
				break;
			case 9:
				numCn = '九';
				break;
			default:
				numCn = number;
		}
		return numCn;
	};
	// 选择了答案
	chooseAns = async (ans) => {
		const {currentIndex, questionList} = this.state;
		this.ansList.push(ans);
		if (currentIndex >= questionList.length - 1) {
			// 最后一题了
			const url = FRIENDS_QUESTIONANS.replace(
				':id',
				this.props.route.params.qid,
			);
			const answers = this.ansList.join(',');
			const res = await request.privatePost(url, {answers});
			this.props.navigation.navigate('TestResult', res.data);
		} else {
			this.setState({currentIndex: currentIndex + 1});
		}
	};
	render() {
		const question = this.props.route.params;
		const user = this.props.UserStore.user;
		const {currentIndex, questionList} = this.state;
		if (!questionList[currentIndex]) return <></>;
		return (
			<View
				style={{flex: 1, backgroundColor: '#fff', position: 'relative'}}
			>
				<THNav title={question.title} />
				<ImageBackground
					source={require('../../../../res/qabg.png')}
					style={{width: '100%', height: '100%'}}
				>
					{/* 1.0 两侧图标 开始 */}
					<View
						style={{
							marginTop: pxToDp(60),
							flexDirection: 'row',
							justifyContent: 'space-between',
						}}
					>
						<ImageBackground
							source={require('../../../../res/qatext.png')}
							style={{
								width: pxToDp(66),
								height: pxToDp(52),
								justifyContent: 'center',
								alignItems: 'flex-end',
							}}
						>
							<Image
								source={{uri: BASE_URI + user.header}}
								style={{
									width: pxToDp(50),
									height: pxToDp(50),
									borderRadius: pxToDp(25),
								}}
							/>
						</ImageBackground>
						<ImageBackground
							source={this.titles[question.type]}
							style={{
								width: pxToDp(66),
								height: pxToDp(52),
								justifyContent: 'center',
								alignItems: 'center',
							}}
						></ImageBackground>
					</View>
					{/* 1.0 两侧图标 结束 */}

					{/* 2.0 测试题 开始 */}
					<View
						style={{
							position: 'absolute',
							width: '80%',
							top: pxToDp(60),
							alignSelf: 'center',
							alignItems: 'center',
						}}
					>
						<View>
							<Text
								style={{
									color: '#fff',
									fontSize: pxToDp(26),
									fontWeight: 'bold',
								}}
							>
								第{this.getFont(currentIndex + 1)}题
							</Text>
							<Text
								style={{
									color: '#ffffff9a',
									textAlign: 'center',
								}}
							>
								({currentIndex + 1}/{questionList.length})
							</Text>
						</View>
						<Text
							style={{
								marginTop: pxToDp(30),
								fontSize: pxToDp(14),
								fontWeight: 'bold',
								color: '#fff',
							}}
						>
							{questionList[currentIndex].question_title}
						</Text>
						{/* 答案 开始 */}
						<View style={{width: '100%'}}>
							{questionList[currentIndex].answers.map((v, i) => (
								<TouchableOpacity
									style={{marginTop: pxToDp(10)}}
									key={i}
									onPress={this.chooseAns.bind(
										this,
										v.ans_No,
									)}
								>
									<LinearGradient
										style={{
											height: pxToDp(40),
											borderRadius: pxToDp(6),
											alignItems: 'center',
											justifyContent: 'center',
										}}
										colors={['#6f45f3', '#6f45f31a']}
										start={{x: 0, y: 0}}
										end={{x: 1, y: 1}}
									>
										<Text style={{color: '#fff'}}>
											{v.ans_title}
										</Text>
									</LinearGradient>
								</TouchableOpacity>
							))}
						</View>
						{/* 答案 结束 */}
					</View>
					{/* 2.0 测试题 结束 */}
				</ImageBackground>
			</View>
		);
	}
}

export default TestQA;
