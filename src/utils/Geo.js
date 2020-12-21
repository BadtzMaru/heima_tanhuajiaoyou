import {PermissionsAndroid, Platform} from 'react-native';
import {init, Geolocation} from 'react-native-amap-geolocation';
import axios from 'axios';
class Geo {
	async initGeo() {
		if (Platform.OS === 'android') {
			await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
			);
		}
		await init({
			// 来自于 高德地图中的 android 中的key
			ios: '417bdb7d7565fb2ad91e815ca8c2d3f8',
			android: '417bdb7d7565fb2ad91e815ca8c2d3f8',
		});
		return Promise.resolve();
	}
	async getCurrentPosition() {
		return new Promise((resolve, reject) => {
			console.log('开始定位');
			Geolocation.getCurrentPosition(({coords}) => {
				console.log(coords);
				resolve(coords);
			}, reject);
		});
	}
	async getCityByLocation() {
		const {longitude, latitude} = await this.getCurrentPosition();
		const res = await axios.get(
			'https://restapi.amap.com/v3/geocode/regeo',
			{
				params: {
					location: `${longitude},${latitude}`,
					// 高德地图中web端的key
					key: '6ca69fbf5bea97941d478fe525300ba7',
				},
			},
		);
		return Promise.resolve(res.data);
	}
}

export default new Geo();
