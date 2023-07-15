import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';

import EntypoIcon from 'react-native-vector-icons/Entypo';
import {searchMovies} from '../api/apiCall';
import MovieCatalog from '../components/MovieCatalog';
import Loader from '../components/Loader';

const {width, height} = Dimensions.get('window');

const Search = ({navigation}: any) => {
  const [searchMovie, setSearchMovie] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = (movieName: string) => {
    if (movieName && movieName.length > 1) {
      setLoading(true);
      searchMovies(movieName).then(data => {
        // console.log(data);
        setLoading(false);
        if (data) setResults(data.movies);
      });
    } else {
      setLoading(false);
      setResults([]);
    }
  };

  useEffect(() => {
    handleSearch(searchMovie);
  }, [searchMovie]);

  return (
    <SafeAreaView className="bg-[#101011] flex-1">
      <View className="flex flex-row justify-between items-center mx-2 ">
        <Pressable
          onPress={() => navigation.navigate('Home')}
          className="rounded-xl p-3 m-1 bg-[#ef4444] ">
          <EntypoIcon name="home" size={25} color="white" />
        </Pressable>
        <View className="w-4/5 mb-4 flex-row justify-between items-center border border-neutral-500 rounded-full mt-4 ">
          <TextInput
            onChangeText={text => {
              setSearchMovie(text);
            }}
            value={searchMovie}
            placeholder="What are you looking for?"
            placeholderTextColor={'lightgray'}
            className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
          />
          <Pressable
            onPress={() => setSearchMovie('')}
            className="rounded-full p-3 m-1 bg-neutral-500">
            <EntypoIcon name="cross" size={25} color="white" />
          </Pressable>
        </View>
      </View>

      {loading ? (
        <Loader />
      ) : results.length > 0 && searchMovie ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 15}}
          className="space-y-3">
          <Text className="text-[#ef4444] font-semibold ml-1 mb-4">
            Results ({results.length})
          </Text>
          <MovieCatalog data={results} navigation={navigation} />
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image
            source={require('../assets/images/movieTime.png')}
            className="h-96 w-96"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Search;
