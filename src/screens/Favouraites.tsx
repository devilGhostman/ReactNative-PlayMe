import {View, Text, ScrollView, SafeAreaView, Pressable} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import MovieCatalog from '../components/MovieCatalog';
import IoniconIcon from 'react-native-vector-icons/Ionicons';

const Favouraites = ({navigation}: any) => {
  const {userFavorites, clearFavoraite} = useContext(AuthContext);
  return (
    <SafeAreaView className="bg-[#101011] flex-1 pt-10">
      <View className="flex-row px-4 items-center mb-4">
        <Pressable
          onPress={() => navigation.navigate('Home')}
          style={{backgroundColor: '#ef4444'}}
          className="rounded-xl p-1">
          <IoniconIcon name="chevron-back" size={28} color="white" />
        </Pressable>

        <Text className="text-[#fffefe] font-semibold ml-4  text-2xl">
          Favourite Collections
        </Text>
      </View>
      <View className="space-y-3">
        <View className="flex-row items-center justify-between pr-3">
          <Text className="text-[#ef4444] font-semibold ml-1 mb-4">
            Results ({userFavorites.length})
          </Text>
          <Pressable className="flex-row mb-4" onPress={() => clearFavoraite()}>
            <IoniconIcon name="trash" size={20} color="white" />
            <Text className="text-[#e6e5e5] font-semibold ml-1 ">
              Clear List
            </Text>
          </Pressable>
        </View>
        <MovieCatalog data={userFavorites} navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default Favouraites;
