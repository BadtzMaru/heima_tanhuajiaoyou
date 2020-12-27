import React, {Component} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import {EMOTION_ARR} from './datasource';
import {screenWidth} from '../../utils/stylesKits';

class Emotion extends Component {
  render() {
    // 获取屏幕的宽度 / 9
    const width = screenWidth / 9;
    return (
      <ScrollView contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {EMOTION_ARR.map((v, i) => (
          <TouchableOpacity key={i} onPress={() => this.props.onPress(v)}>
            <Image style={{width, height: width}} source={v.value} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
}

export default Emotion;
