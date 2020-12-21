import React, {Component} from 'react';
import {View} from 'react-native';
import Nav from './src/nav';

class App extends Component {
	render() {
		return (
			<View style={{flex: 1}}>
				<Nav />
			</View>
		);
	}
}

export default App;
