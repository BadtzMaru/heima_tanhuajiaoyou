import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './pages/account/login';
import Demo from './pages/Demo';
import UserInfo from './pages/account/userinfo';
import Tabbar from './tabbar';
import {inject, observer} from 'mobx-react';
import TanHua from './pages/friend/tanhua';

const Stack = createStackNavigator();

@inject('RootStore')
@observer
class Nav extends Component {
	constructor(props) {
		super();
		this.state = {
			initialRouteName: props.RootStore.token ? 'Tabbar' : 'Login',
		};
	}
	state = {};
	render() {
		const {initialRouteName} = this.state;
		return (
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName={initialRouteName}
					headerMode="none "
				>
					<Stack.Screen name="Demo" component={Demo} />
					<Stack.Screen name="Login" component={Login} />
					<Stack.Screen name="UserInfo" component={UserInfo} />
					<Stack.Screen name="Tabbar" component={Tabbar} />
					<Stack.Screen name="TanHua" component={TanHua} />
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}

export default Nav;
