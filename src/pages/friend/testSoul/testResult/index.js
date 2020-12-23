import React, {Component} from 'react';
import {View, Text} from 'react-native';

class TestResult extends Component {
	render() {
		console.log(this.props.route.params);
		return (
			<View>
				<Text>测试结果</Text>
			</View>
		);
	}
}

export default TestResult;
