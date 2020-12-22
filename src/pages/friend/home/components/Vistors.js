import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import request from '../../../../utils/request';
import {FRIENDS_VISITORS, BASE_URI} from '../../../../utils/pathMap';
import {pxToDp} from '../../../../utils/stylesKits';

class Index extends Component {
	state = {
		visitors: [
			// {
			// 	Distance: 0,
			// 	age: 21,
			// 	agediff: -2,
			// 	fateValue: 82,
			// 	gender: '女',
			// 	header: '/upload/13828459782.png',
			// 	marry: '未婚',
			// 	nick_name: '雾霭朦胧',
			// 	target_uid: 7,
			// 	uid: 8,
			// 	xueli: '大专',
			// },
		],
	};
	async componentDidMount() {
		// get请求带上token值
		const res = await request.privateGet(FRIENDS_VISITORS);
		console.log(res);
		this.setState({visitors: res.data});
	}
	render() {
		const {visitors} = this.state;
		return (
			<View
				style={{
					flexDirection: 'row',
					marginTop: pxToDp(20),
					alignItems: 'center',
					paddingLeft: pxToDp(5),
					paddingRight: pxToDp(5),
				}}>
				<Text style={{flex: 1, color: '#777', fontSize: pxToDp(15)}}>
					最近有{visitors.length}人来访,快去查看...
				</Text>
				<View
					style={{
						flexDirection: 'row',
						flex: 1,
						alignItems: 'center',
						justifyContent: 'space-around',
					}}>
					{visitors.map((v, i) => (
						<Image
							key={i}
							style={{
								width: pxToDp(40),
								height: pxToDp(40),
								borderRadius: pxToDp(20),
							}}
							source={{uri: BASE_URI + v.header}}
						/>
					))}
					<Text style={{fontSize: pxToDp(20), color: '#777'}}>
						&gt;
					</Text>
				</View>
			</View>
		);
	}
}

export default Index;
