import React, {Component} from 'react';
import {View} from 'react-native';
import Nav from './src/nav';
import Geo from './src/utils/Geo';

class App extends Component {
	state = {
		isInitGeo: false,
	};
	async componentDidMount() {
		/* 初始化高德地图 */
		await Geo.initGeo();
		this.setState({isInitGeo: true});
	}
	render() {
		return (
			<View style={{flex: 1}}>
				{this.state.isInitGeo ? <Nav /> : <></>}
			</View>
		);
	}
}

export default App;
