import {View, Text, Image} from 'react-native';
import React from 'react';

const Loader = () => {
  return (
    <View className="flex-1 justify-center items-center bg-[#101011]">
      <Image
        source={require('../assets/loader/loader.gif')}
        className="w-[200px] h-[200px]"
      />
    </View>
  );
};

export default Loader;
