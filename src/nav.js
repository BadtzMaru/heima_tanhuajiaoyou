import React from 'react';
import {Button, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './pages/account/login';
import Demo from './pages/Demo';

const Stack = createStackNavigator();

function Nav() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Login" headerMode="none">
				<Stack.Screen name="Demo" component={Demo} />
				<Stack.Screen name="Login" component={Login} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default Nav;
