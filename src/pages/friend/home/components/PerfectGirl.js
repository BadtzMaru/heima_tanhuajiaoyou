import React, {Component} from 'react';
import {View, Image, Text} from 'react-native';
import request from '../../../../utils/request';
import {FRIENDS_TODAYBEST, BASE_URI} from '../../../../utils/pathMap';
import {pxToDp} from '../../../../utils/stylesKits';
import IconFont from '../../../../components/IconFont';

class Index extends Component {
	state = {
		perfectGirl: {
			// age: 20,
			// agediff: -3,
			// dist: 962.9,
			// fateValue: 69,
			// gender: '女',
			// header: '/upload/18665333333.jpg',
			// id: 83,
			// marry: '单身',
			// nick_name: '33333',
			// xueli: '大专',
		},
	};
	async componentDidMount() {
		const res = await request.privateGet(FRIENDS_TODAYBEST);
		console.log('今日佳人: ', res);
		this.setState({perfectGirl: res.data[0]});
	}
	render() {
		const {perfectGirl} = this.state;
		return (
			<View style={{flexDirection: 'row'}}>
				{/* 左边图片 */}
				<View style={{position: 'relative'}}>
					<Image
						source={{uri: BASE_URI + perfectGirl.header}}
						style={{width: pxToDp(120), height: pxToDp(120)}}
					/>
					<View
						style={{
							width: pxToDp(80),
							height: pxToDp(30),
							backgroundColor: '#b564bfaa',
							justifyContent: 'center',
							alignItems: 'center',
							borderRadius: pxToDp(10),
							position: 'absolute',
							left: 0,
							bottom: pxToDp(10),
						}}>
						<Text style={{color: '#fff', fontSize: pxToDp(16)}}>
							今日佳人
						</Text>
					</View>
				</View>
				{/* 右边内容 */}
				<View
					style={{
						flex: 1,
						paddingTop: pxToDp(5),
						paddingRight: pxToDp(5),
						paddingBottom: pxToDp(5),
						backgroundColor: '#ccc',
					}}>
					<View
						style={{
							backgroundColor: '#fff',
							flexDirection: 'row',
							height: pxToDp(110),
							paddingLeft: pxToDp(10),
						}}>
						<View style={{flex: 2, justifyContent: 'space-around'}}>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
								}}>
								<Text style={{color: '#555'}}>
									{perfectGirl.nick_name}
								</Text>
								<IconFont
									name={
										perfectGirl.gender === '女'
											? 'icontanhuanv'
											: 'icontanhuanan'
									}
									style={{
										fontSize: pxToDp(18),
										color:
											perfectGirl.gender === '女'
												? '#b564bf'
												: 'red',
									}}
								/>
								<Text style={{color: '#555'}}>
									{perfectGirl.age}岁
								</Text>
							</View>
							<View style={{flexDirection: 'row'}}>
								<Text style={{color: '#555'}}>
									{perfectGirl.marry}
								</Text>
								<Text style={{color: '#555'}}>|</Text>
								<Text style={{color: '#555'}}>
									{perfectGirl.xueli}
								</Text>
								<Text style={{color: '#555'}}>|</Text>
								<Text style={{color: '#555'}}>
									{perfectGirl.agediff < 10
										? '年龄相仿'
										: '有点代沟'}
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
									style={{fontSize: pxToDp(50), color: 'red'}}
								/>
								<Text
									style={{
										position: 'absolute',
										color: '#fff',
										fontSize: pxToDp(13),
										fontWeight: 'bold',
									}}>
									{perfectGirl.fateValue}
								</Text>
							</View>
							<Text style={{color: 'red', fontSize: pxToDp(13)}}>
								缘分值
							</Text>
						</View>
					</View>
				</View>
			</View>
		);
	}
}

export default Index;
