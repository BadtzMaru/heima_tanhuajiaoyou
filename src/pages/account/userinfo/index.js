import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {pxToDp} from '../../../utils/stylesKits';
import SvgUri from 'react-native-svg-uri';
import {male, female} from '../../../res/fonts/iconSvg';
import {Input} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import Geo from '../../../utils/Geo';
import Picker from 'react-native-picker';
import CityJson from '../../../res/citys.json';
import THButton from '../../../components/THButton';
import Toast from '../../../utils/Toast';
import ImagePicker from 'react-native-image-crop-picker';

class Index extends Component {
	state = {
		// 昵称
		nickname: '',
		// 性别
		gender: '男',
		// 生日
		birthday: '',
		// 地址
		city: '',
		// 头像
		header: '',
		// 经度
		lng: '',
		// 纬度
		lat: '',
		// 详细地址
		address: '',
	};
	async componentDidMount() {
		const res = await Geo.getCityByLocation();
		console.log(res);
		const address = res.regeocode.formatted_address;
		const city = res.regeocode.addressComponent.city.replace('市', '');
		this.setState({address, city});
	}
	// 选择性别
	chooseGender = (gender) => {
		this.setState({gender});
	};
	// 选择城市
	showCityPicker = () => {
		Picker.init({
			// 显示哪些数据 全国城市数据
			pickerData: CityJson,
			// 默认选择哪一个数据
			selectedValue: ['北京', '北京'],
			wheelFlex: [1, 1, 0], // 显示省和市
			pickerConfirmBtnText: '确定',
			pickerCancelBtnText: '取消',
			pickerTitleText: '选择城市',
			onPickerConfirm: (data) => {
				// data =  [广东，广州，天河]
				this.setState({
					city: data[1],
				});
			},
		});
		Picker.show();
	};
	// 设置头像
	chooseHeadImg = async () => {
		// 1. 校验用户昵称 生日 当前地址 city
		// 2. 使用图片裁剪插件
		// 3. 将选择好的图片上传到后台
		// 4. 数据提交到后台,完成信息填写
		// 5. 成功 -> 执行极光的注册 , 极光的登录
		// 跳转到交友的首页

		const {nickname, birthday, city} = this.state;
		if (!nickname || !birthday || !city) {
			return Toast.sad('昵称或者生日或者城市不合法', 2000, 'center');
		}
		// 获取选中后的图片
		const image = await ImagePicker.openPicker({
			width: 300,
			height: 300,
			cropping: true,
		});
		console.log(image);
	};
	render() {
		const {gender, nickname, birthday, address, city} = this.state;
		const dateNow = new Date();
		const currentDate =
			dateNow.getFullYear() +
			'-' +
			(dateNow.getMonth() + 1) +
			dateNow.getDate();
		return (
			<View
				style={{backgroundColor: '#fff', flex: 1, padding: pxToDp(20)}}>
				{/* 1.0 标题 开始 */}
				<Text
					style={{
						fontSize: pxToDp(20),
						color: '#666',
						fontWeight: 'bold',
					}}>
					填写资料
				</Text>
				<Text
					style={{
						fontSize: pxToDp(20),
						color: '#666',
						fontWeight: 'bold',
					}}>
					提升我的魅力
				</Text>
				{/* 1.0 标题 结束 */}

				{/* 2.0 性别 开始 */}
				<View style={{marginTop: pxToDp(20)}}>
					<View
						style={{
							width: '60%',
							flexDirection: 'row',
							alignSelf: 'center',
							justifyContent: 'space-around',
						}}>
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
							}}>
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
							}}>
							<SvgUri
								svgXmlData={female}
								width="34"
								height="34"
							/>
						</TouchableOpacity>
					</View>
				</View>
				{/* 2.0 性别 结束 */}

				{/* 3.0 昵称 开始 */}
				<View>
					<Input
						value={nickname}
						placeholder="设置昵称"
						onChangeText={(nickname) => {
							this.setState({nickname});
						}}
					/>
				</View>
				{/* 3.0 昵称 结束 */}

				{/* 4.0 日期 开始 */}
				<DatePicker
					androidMode="spinner"
					style={{width: '100%'}}
					date={birthday}
					mode="date"
					placeholder="设置生日"
					format="YYYY-MM-DD"
					minDate="1900-01-01"
					maxDate={currentDate}
					confirmBtnText="确认"
					cancelBtnText="取消"
					customStyles={{
						dateIcon: {
							display: 'none',
						},
						dateInput: {
							marginLeft: pxToDp(10),
							borderWidth: 0,
							borderBottomWidth: pxToDp(1.1),
							alignItems: 'flex-start',
							paddingLeft: pxToDp(4),
						},
						placeholderText: {
							fontSize: pxToDp(17),
							color: '#afafaf',
						},
					}}
					onDateChange={(birthday) => {
						this.setState({birthday});
					}}
				/>
				{/* 4.0 日期 结束 */}

				{/* 5.0 地址 开始 */}
				<View style={{marginTop: pxToDp(20)}}>
					<TouchableOpacity onPress={this.showCityPicker}>
						<Input
							value={'当前定位:' + city}
							inputStyle={{color: '#666'}}
							disabled={true}
						/>
					</TouchableOpacity>
				</View>
				{/* 5.0 地址 结束 */}

				{/* 6.0 选择头像 开始 */}
				<View>
					<THButton
						onPress={this.chooseHeadImg}
						style={{
							height: pxToDp(40),
							borderRadius: pxToDp(20),
							alignSelf: 'center',
						}}>
						设置头像
					</THButton>
				</View>
				{/* 6.0 选择头像 结束 */}
			</View>
		);
	}
}

export default Index;
