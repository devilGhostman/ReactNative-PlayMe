import {Image, Dimensions, Pressable} from 'react-native';
import React from 'react';

var {width, height} = Dimensions.get('window');

const TrendCard = ({handleClick, item}: any) => {
  return (
    <Pressable onPress={() => handleClick(item)}>
      <Image
        source={{
          uri: item.backdrop,
          // uri: 'https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/6408f6e7b5811271dc883aa8_batman-min.png',
        }}
        style={{width: width * 0.95, height: height * 0.6}}
        className="rounded-2xl"
      />
    </Pressable>
  );
};

export default TrendCard;
