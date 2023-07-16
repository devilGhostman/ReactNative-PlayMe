import React from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const MovieList = ({title, data, hideSeeAll}: any) => {
  const navigation = useNavigation();
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-lg">{title}</Text>
        {!hideSeeAll && (
          <Pressable>
            <Text className="text-lg text-[#ef4444]">See All</Text>
          </Pressable>
        )}
      </View>
      {/* <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 5}}>
        {data.map(
          (
            item: {
              title: string;
              poster2: string;
            },
            index: string | number,
          ) => {
            return (
              <Pressable
                key={index}
                onPress={() => navigation.push('Detail', item)}>
                <View className="space-y-1 mr-4">
                  <Image
                    source={{
                      uri: item.poster2,
                      // uri: 'https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/6408f6e7b5811271dc883aa8_batman-min.png',
                    }}
                    className="rounded-xl"
                    style={{width: width * 0.33, height: height * 0.22}}
                  />
                  <Text className="text-neutral-300 ml-1">
                    {item.title.length > 14
                      ? item.title.slice(0, 14) + '...'
                      : item.title}
                  </Text>
                </View>
              </Pressable>
            );
          },
        )}
      </ScrollView> */}
      <FlatList
        data={data}
        keyExtractor={(data, index: any) => index}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          // console.log(item)
          <Pressable onPress={() => navigation.push('Detail', item)}>
            <View className="space-y-1 mr-4">
              <Image
                source={{
                  uri: item.poster2,
                  // uri: 'https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/6408f6e7b5811271dc883aa8_batman-min.png',
                }}
                className="rounded-xl"
                style={{width: width * 0.33, height: height * 0.22}}
              />
              <Text className="text-neutral-300 ml-1">
                {item.title.length > 14
                  ? item.title.slice(0, 14) + '...'
                  : item.title}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default MovieList;
