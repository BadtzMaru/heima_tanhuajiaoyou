import React, {Component} from 'react';
import {Text} from 'react-native';
import IconMap from '../../res/fonts/icon';

const IconFont = (props) => {
	return (
		<Text
			onPress={props.onPress}
			style={{fontFamily: 'iconfont', ...props.style}}
		>
			{IconMap[props.name]}
		</Text>
	);
};

export default IconFont;
