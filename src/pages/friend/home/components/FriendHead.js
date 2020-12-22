import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Svg from 'react-native-svg-uri';
import {tanhua, near, testSoul} from '../../../../res/fonts/iconSvg';
import {pxToDp} from '../../../../utils/stylesKits';

class Index extends Component {
	render() {
		return (
			<View
				style={{
					flexDirection: 'row',
					width: '80%',
					justifyContent: 'space-around',
				}}>
				<TouchableOpacity style={{alignItems: 'center'}}>
					<View
						style={{
							width: pxToDp(70),
							height: pxToDp(70),
							borderRadius: pxToDp(35),
							backgroundColor: 'red',
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						<Svg
							width="40"
							height="40"
							fill="#FFF"
							svgXmlData={tanhua}
						/>
					</View>
					<Text
						style={{
							fontSize: pxToDp(18),
							marginTop: pxToDp(4),
							color: '#ffffff9a',
						}}>
						探花
					</Text>
				</TouchableOpacity>
				<TouchableOpacity style={{alignItems: 'center'}}>
					<View
						style={{
							width: pxToDp(70),
							height: pxToDp(70),
							borderRadius: pxToDp(35),
							backgroundColor: '#2bd3f8',
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						<Svg
							width="40"
							height="40"
							fill="#FFF"
							svgXmlData={near}
						/>
					</View>
					<Text
						style={{
							fontSize: pxToDp(18),
							marginTop: pxToDp(4),
							color: '#ffffff9a',
						}}>
						附近
					</Text>
				</TouchableOpacity>
				<TouchableOpacity style={{alignItems: 'center'}}>
					<View
						style={{
							width: pxToDp(70),
							height: pxToDp(70),
							borderRadius: pxToDp(35),
							backgroundColor: '#ecc768',
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						<Svg
							width="40"
							height="40"
							fill="#FFF"
							svgXmlData={testSoul}
						/>
					</View>
					<Text
						style={{
							fontSize: pxToDp(18),
							marginTop: pxToDp(4),
							color: '#ffffff9a',
						}}>
						测试
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

export default Index;
