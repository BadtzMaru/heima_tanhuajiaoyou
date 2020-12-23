import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import IconFont from '../../../../components/IconFont';
import {pxToDp} from '../../../../utils/stylesKits';
import SvgUri from 'react-native-svg-uri';
import {male, female} from '../../../../res/fonts/iconSvg';
import {Slider} from 'react-native-elements';
import THButton from '../../../../components/THButton';

class FilterPanel extends Component {
	constructor(props) {
		super(props);
		this.state = JSON.parse(JSON.stringify(this.props.params));
	}
	// 选择性别
	chooseGender = (gender) => {
		if (gender === this.state.gender) {
			return this.setState({gender: ''});
		}
		this.setState({gender});
	};

	// 点击确定之后执行的方法
	handleSubmitFilter = () => {
		this.props.onSubmitFilter(this.state);
		this.props.onClose();
	};
	render() {
		const {gender, distance} = this.state;
		return (
			<View
				style={{
					position: 'absolute',
					width: '100%',
					height: '70%',
					left: 0,
					bottom: 0,
					backgroundColor: '#fff',
					paddingLeft: pxToDp(10),
					paddingRight: pxToDp(10),
				}}
			>
				{/* 1.0 标题 开始 */}
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						height: pxToDp(50),
						alignItems: 'center',
					}}
				>
					<Text></Text>
					<Text
						style={{
							color: '#999',
							fontSize: pxToDp(28),
							fontWeight: 'bold',
						}}
					>
						筛选
					</Text>
					<IconFont
						onPress={this.props.onClose}
						name="iconshibai"
						style={{fontSize: pxToDp(30)}}
					/>
				</View>
				{/* 1.0 标题 结束 */}

				{/* 2.0 性别 开始 */}
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						marginTop: pxToDp(10),
					}}
				>
					<Text
						style={{
							color: '#777',
							fontSize: pxToDp(18),
							width: pxToDp(80),
						}}
					>
						性别:
					</Text>
					{/* 性别图标 开始 */}
					<View
						style={{
							width: '50%',
							flexDirection: 'row',
							alignSelf: 'center',
							justifyContent: 'space-around',
						}}
					>
						<TouchableOpacity
							onPress={this.chooseGender.bind(this, '男')}
							style={{
								width: pxToDp(60),
								height: pxToDp(60),
								borderRadius: pxToDp(30),
								backgroundColor:
									gender === '男' ? 'cyan' : '#eee',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<SvgUri svgXmlData={male} width="34" height="34" />
						</TouchableOpacity>
						<TouchableOpacity
							onPress={this.chooseGender.bind(this, '女')}
							style={{
								width: pxToDp(60),
								height: pxToDp(60),
								borderRadius: pxToDp(30),
								backgroundColor:
									gender === '女' ? 'cyan' : '#eee',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<SvgUri
								svgXmlData={female}
								width="34"
								height="34"
							/>
						</TouchableOpacity>
					</View>

					{/* 性别图标 结束 */}
				</View>
				{/* 2.0 性别 结束 */}

				{/* 4.0 距离 开始 */}
				<View
					style={{
						marginTop: pxToDp(10),
					}}
				>
					<Text
						style={{
							color: '#777',
							fontSize: pxToDp(18),
						}}
					>
						距离: {distance || 0} M
					</Text>
					<Slider
						value={distance}
						minimumValue={0}
						maximumValue={100000}
						step={1}
						onValueChange={(distance) => this.setState({distance})}
						thumbStyle={{
							width: pxToDp(25),
							height: pxToDp(25),
							backgroundColor: 'cyan',
						}}
					/>
				</View>
				{/* 4.0 距离 结束 */}

				<THButton
					style={{
						width: '100%',
						height: pxToDp(40),
						marginTop: pxToDp(10),
					}}
					onPress={this.handleSubmitFilter}
				>
					确认
				</THButton>
			</View>
		);
	}
}

export default FilterPanel;
