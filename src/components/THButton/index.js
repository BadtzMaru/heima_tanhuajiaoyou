import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {pxToDp} from '../../utils/stylesKits';

import LinearGradient from 'react-native-linear-gradient';

class Index extends Component {
	static defaultProps = {
		style: {},
		textStyle: {},
		disabled: false,
	};
	render() {
		return (
			<TouchableOpacity
				disabled={this.props.disabled}
				onPress={this.props.onPress}
				style={{
					width: '100%',
					height: '100%',
					overflow: 'hidden',
					...this.props.style,
				}}>
				<LinearGradient
					start={{x: 0, y: 0}}
					end={{x: 1, y: 0}}
					colors={['#9b63cd', '#e0708c']}
					style={styles.linearGradient}>
					<Text
						style={{...styles.buttonText, ...this.props.textStyle}}>
						{this.props.children}
					</Text>
				</LinearGradient>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	linearGradient: {
		flex: 1,
		paddingLeft: pxToDp(15),
		paddingRight: pxToDp(15),
		borderRadius: pxToDp(5),
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		fontSize: pxToDp(18),
		fontFamily: 'Gill Sans',
		textAlign: 'center',
		color: '#ffffff',
		backgroundColor: 'transparent',
	},
});

export default Index;
