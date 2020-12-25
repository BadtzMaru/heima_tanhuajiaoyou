import React from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomerBar from './components/CustomerBar';
import Latest from './latest';
import Recommend from './recommend';

export default () => {
  return (
    <ScrollableTabView initialPage={0} renderTabBar={() => <CustomerBar />}>
      <Recommend tabLabel="推荐" />
      <Latest tabLabel="最新" />
    </ScrollableTabView>
  );
};
