import React, {Component} from 'react';
import {View, Text} from 'react-native';
import request from '../../../../utils/request';
import {FRIENDS_QUESTIONSECTION} from '../../../../utils/pathMap';

class TestQA extends Component {
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
	render() {
		return (
			<View>
				<Text>填写问卷页面</Text>
			</View>
		);
	}
}

export default TestQA;
