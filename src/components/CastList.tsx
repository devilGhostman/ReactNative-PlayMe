import {View, Text, Dimensions, Image, FlatList} from 'react-native';
import React from 'react';

var {width, height} = Dimensions.get('window');

type personDetail = {
  dp: string;
  characterName: string;
  name: string;
};

const CastList = ({casts}: any) => {
  return (
    <View className="my-6">
      <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
      <FlatList
        keyExtractor={(person: personDetail, index: any) => index}
        data={casts}
        horizontal={true}
        renderItem={person => (
          <View className="mr-4 items-center">
            <View className="overflow-hidden rounded-2xl h-20 w-20 items-center border border-neutral-500">
              <Image
                className="rounded-2xl h-24 w-20"
                source={{
                  uri: person.item.dp,
                }}
              />
            </View>

            <Text className="text-white text-xs mt-1">
              {person.item?.characterName.length > 10
                ? person.item.characterName.slice(0, 10) + '...'
                : person.item?.characterName}
            </Text>
            <Text className="text-neutral-400 text-xs">
              {person.item?.name.length > 10
                ? person.item.name.slice(0, 10) + '...'
                : person.item?.name}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default CastList;
