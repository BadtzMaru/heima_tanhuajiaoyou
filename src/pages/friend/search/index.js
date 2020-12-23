import React, {Component} from 'react';
import {
	View,
	Text,
	StatusBar,
	ImageBackground,
	TouchableOpacity,
	Image,
} from 'react-native';
import request from '../../../utils/request';
import {BASE_URI, FRIENDS_SEARCH} from '../../../utils/pathMap';
import {pxToDp, screenHeight, screenWidth} from '../../../utils/stylesKits';
import IconFont from '../../../components/IconFont';
import {Overlay} from 'teaset';
import FilterPanel from './components/FilterPanel';

class Search extends Component {
	params = {
		gender: '男',
		distance: 10000,
	};
	WHMap = {
		wh1: {width: pxToDp(70), height: pxToDp(100)},
		wh2: {width: pxToDp(60), height: pxToDp(90)},
		wh3: {width: pxToDp(50), height: pxToDp(80)},
		wh4: {width: pxToDp(40), height: pxToDp(70)},
		wh5: {width: pxToDp(30), height: pxToDp(60)},
		wh6: {width: pxToDp(20), height: pxToDp(50)},
	};
	state = {
		list: [],
	};
	componentDidMount() {
		this.getList();
	}
	// 获取附近的数据
	getList = async () => {
		const res = await request.privateGet(FRIENDS_SEARCH, this.params);
		console.log('获取附近的数据:', res);
		this.setState({list: res.data});
	};
	// 根据dist返回宽高档次
	getWidthHeight = (dist) => {
		if (dist < 20) {
			return 'wh1';
		}
		if (dist < 40) {
			return 'wh2';
		}
		if (dist < 60) {
			return 'wh3';
		}
		if (dist < 100) {
			return 'wh4';
		}
		if (dist < 150) {
			return 'wh5';
		}
		return 'wh6';
	};
	// 点击了筛选按钮
	handleFilterShow = () => {
		let overlayRef = null;
		let overlayView = (
			<Overlay.View
				modal={true}
				overlayOpacity={0.3}
				ref={(v) => (overlayRef = v)}
			>
				{/* 筛选组件 */}
				<FilterPanel
					params={this.params}
					onClose={() => overlayRef.close()}
					onSubmitFilter={this.handleSubmitFilter}
				/>
			</Overlay.View>
		);
		Overlay.show(overlayView);
	};
	// 获取了筛选结果
	handleSubmitFilter = (filterParams) => {
		this.params = filterParams;
		this.getList();
	};
	render() {
		const {list} = this.state;
		return (
			<ImageBackground
				source={require('../../../res/search.gif')}
				style={{flex: 1, position: 'relative'}}
			>
				<StatusBar backgroundColor="transparent" translucent={true} />
				<TouchableOpacity
					style={{
						backgroundColor: '#fff',
						position: 'absolute',
						right: '10%',
						top: '10%',
						width: pxToDp(55),
						height: pxToDp(55),
						borderRadius: pxToDp(27.5),
						alignItems: 'center',
						justifyContent: 'center',
						zIndex: 1000,
					}}
					onPress={this.handleFilterShow}
				>
					<IconFont
						name="iconshaixuan"
						style={{color: '#912375', fontSize: pxToDp(30)}}
					/>
				</TouchableOpacity>
				{list.map((v, i) => {
					const whMap = this.WHMap[this.getWidthHeight(v.dist)];
					const tx = Math.random() * (screenWidth - whMap.width);
					const ty = Math.random() * (screenHeight - whMap.height);
					return (
						<TouchableOpacity
							key={i}
							style={{position: 'absolute', left: tx, top: ty}}
						>
							<ImageBackground
								source={require('../../../res/showfirend.png')}
								style={{
									...whMap,
									position: 'relative',
									alignItems: 'center',
								}}
								resizeMode="stretch"
							>
								<Text
									style={{
										color: '#ffffff9a',
										position: 'absolute',
										top: -pxToDp(20),
									}}
									numberOfLines={1}
								>
									{v.nick_name}
								</Text>
								<Image
									source={{uri: BASE_URI + v.header}}
									style={{
										width: whMap.width,
										height: whMap.width,
										borderRadius: whMap.width / 2,
									}}
								/>
							</ImageBackground>
						</TouchableOpacity>
					);
				})}
				<View
					style={{
						position: 'absolute',
						bottom: pxToDp(50),
						width: '100%',
						alignItems: 'center',
					}}
				>
					<Text style={{color: '#fff'}}>
						您附近有&nbsp;&nbsp;
						<Text style={{color: 'red', fontSize: pxToDp(20)}}>
							{list.length}
						</Text>
						&nbsp;&nbsp;个好友
					</Text>
					<Text style={{color: '#fff'}}>选择聊聊吧</Text>
				</View>
			</ImageBackground>
		);
	}
}

export default Search;
