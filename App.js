import React, {Component} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Nav from './src/nav';
import Geo from './src/utils/Geo';
import RootStore from './src/mobx';
import {Provider} from 'mobx-react';
import JMessage from './src/utils/JMessage';

class App extends Component {
	state = {
		isInitGeo: false,
	};
	async componentDidMount() {
		/* 获取缓存中的用户数据 */
		const strUserInfo = await AsyncStorage.getItem('userinfo');
		const userinfo = strUserInfo ? JSON.parse(strUserInfo) : {};
		// 判断有没有token
		if (userinfo.token) {
			// 把缓存中的数据存到mobx
			RootStore.setUserInfo(
				userinfo.mobile,
				userinfo.token,
				userinfo.userId,
			);
			/* 极光初始化 */
			JMessage.init();
		}

		/* 初始化高德地图 */
		await Geo.initGeo();
		this.setState({isInitGeo: true});
	}
	render() {
		return (
			<View style={{flex: 1}}>
				<Provider RootStore={RootStore}>
					{this.state.isInitGeo ? <Nav /> : <></>}
				</Provider>
			</View>
		);
	}
}

export default App;
