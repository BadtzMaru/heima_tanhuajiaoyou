import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './pages/account/login';
import Demo from './pages/Demo';
import UserInfo from './pages/account/userinfo';
import Tabbar from './tabbar';
import {inject, observer} from 'mobx-react';
import TanHua from './pages/friend/tanhua';
import Search from './pages/friend/search';
import TextSoul from './pages/friend/testSoul';
import TestQA from './pages/friend/testSoul/testQA';
import TestResult from './pages/friend/testSoul/testResult';
import Detail from './pages/friend/detail';
import Chat from './pages/message/chat';
import Comment from './pages/group/home/recommend/comment';
import Publish from './pages/group/home/recommend/publish';

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
        <Stack.Navigator initialRouteName={initialRouteName} headerMode="none">
          <Stack.Screen name="Demo" component={Demo} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="UserInfo" component={UserInfo} />
          <Stack.Screen name="Tabbar" component={Tabbar} />
          <Stack.Screen name="TanHua" component={TanHua} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="TextSoul" component={TextSoul} />
          <Stack.Screen name="TestQA" component={TestQA} />
          <Stack.Screen name="TestResult" component={TestResult} />
          <Stack.Screen name="Detail" component={Detail} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="Comment" component={Comment} />
          <Stack.Screen name="Publish" component={Publish} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Nav;
