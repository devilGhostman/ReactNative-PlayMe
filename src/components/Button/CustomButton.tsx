import {View, Text, Pressable} from 'react-native';
import React from 'react';

const CustomButton = ({onPress, text}: any) => {
  return (
    <Pressable
      onPress={onPress}
      className="w-full p-4 my-3 bg-red-500 items-center rounded-md"
      android_ripple={{color: '#FF033E'}}
      style={{elevation: 4}}>
      <Text className="font-semibold text-[#ffffff]">{text}</Text>
    </Pressable>
  );
};

export default CustomButton;
