import React from 'react';
import {View, Text, Dimensions} from 'react-native';

import Carousel from 'react-native-snap-carousel';
import TrendCard from './Cards/TrendCard';
import {useNavigation} from '@react-navigation/native';

var {width, height} = Dimensions.get('window');

export default function Trending({data}: any) {
  const navigation = useNavigation();

  const handleClick = (item: any) => {
    navigation.navigate('Detail', item);
  };
  return (
    <View className="mb-8">
      <Text className="text-white text-xl mb-5">Trending</Text>
      <Carousel
        data={data}
        renderItem={({item}) => (
          <TrendCard handleClick={handleClick} item={item} />
        )}
        firstItem={1}
        loop={true}
        inactiveSlideScale={0.86}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width}
      />
    </View>
  );
}
