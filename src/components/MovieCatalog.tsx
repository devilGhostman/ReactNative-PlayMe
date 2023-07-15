import React from 'react';
import {View, Text, Pressable, Dimensions, Image, FlatList} from 'react-native';

const {width, height} = Dimensions.get('window');

const MovieCatalog = ({data, navigation}: any) => {
  return (
    <>
      <FlatList
        data={data}
        keyExtractor={(item, index: any) => index}
        numColumns={2}
        renderItem={({item}) => (
          <Pressable onPress={() => navigation.push('Detail', item)}>
            <View className="space-y-2 mb-4 mx-2">
              <Image
                source={{
                  uri: item.poster,
                  // uri: 'https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/6408f6e7b5811271dc883aa8_batman-min.png',
                }}
                className="rounded-2xl"
                style={{width: width * 0.44, height: height * 0.3}}
              />
              <Text className="text-gray-300 ml-1">
                {item.title.length > 22
                  ? item.title.slice(0, 22) + '...'
                  : item.title}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </>
  );
};

export default MovieCatalog;
