import React, {useEffect, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';

import Trending from '../components/Trending';
import MovieList from '../components/MovieList';
import {
  fetchMovies,
  fetchNewMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
} from '../api/apiCall';
import MovieCatalog from '../components/MovieCatalog';
import Loader from '../components/Loader';

const Home = ({navigation}: any) => {
  const [movies, setMovies] = useState([]);
  const [newMovies, setNewmovies] = useState([]);
  const [popular, setPopular] = useState([]);
  const [toprated, setToprated] = useState([]);
  const [loading, setLoading] = useState(true);

  if (loading) {
    <Loader />;
  }

  const getMovies = async () => {
    const data = await fetchMovies();
    // console.log(data.movies);
    if (data.movies) setMovies(data.movies);
    setLoading(false);
  };

  const getNewMovies = async () => {
    const data = await fetchNewMovies();
    if (data.movies) setNewmovies(data.movies.slice(0, 9));
    setLoading(false);
  };
  const getPopularMovies = async () => {
    const data = await fetchPopularMovies();
    if (data.movies) setPopular(data.movies.slice(0, 9));
    setLoading(false);
  };

  const getTopRatedmovies = async () => {
    const data = await fetchTopRatedMovies();
    if (data.movies) setToprated(data.movies.slice(0, 9));
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getMovies();
    getNewMovies();
    getPopularMovies();
    getTopRatedmovies();
  }, []);

  return (
    <View className="flex-1 bg-[#101011]">
      {/* <StatusBar backgroundColor="#61dafb" /> */}
      <SafeAreaView className="my-2">
        <View className="flex-row justify-between items-center mx-2">
          <Pressable onPress={() => navigation.openDrawer()}>
            <FeatherIcon name="align-left" size={30} color="#ef4444" />
          </Pressable>
          <Text className="text-white text-3xl font-bold">
            <Text className="text-[#ef4444]">M</Text>
            ovies
          </Text>
          <Pressable onPress={() => navigation.navigate('Search')}>
            <FeatherIcon name="search" size={30} color="white" />
          </Pressable>
        </View>
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 10}}>
        <Trending data={popular} />
        <MovieList title="New Titles" data={newMovies} hideSeeAll />
        <MovieList title="Top Rated" data={toprated} />
        <View className="mx-4 mb-4 flex-row justify-between items-centerm">
          <Text className="text-white text-lg">All</Text>
        </View>
        <MovieCatalog data={movies} navigation={navigation} />
      </ScrollView>
    </View>
  );
};

export default Home;
