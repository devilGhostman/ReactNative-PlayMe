import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Pressable,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import IoniconIcon from 'react-native-vector-icons/Ionicons';

import CastList from '../components/CastList';
import MovieList from '../components/MovieList';
import {fetchMovies} from '../api/apiCall';
import {AuthContext} from '../context/AuthContext';
import VedioPlayer from '../components/VedioPlayer';
import Loader from '../components/Loader';

var {width, height} = Dimensions.get('window');

const Details = ({route, navigation}: any) => {
  const item = route.params;
  const videoRef = useRef(null);
  const {userFavorites, addFavorite, removeFavorite} = useContext(AuthContext);
  const [similarMovie, setsimilarMovie] = useState([]);
  const [loading, setLoading] = useState(false);

  const [paused, setPaused] = useState(false);
  const [showControls, setShowControls] = useState(true);
  useEffect(() => {
    // Hide controls after 3 seconds of inactivity
    const timeout = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  const togglePause = () => {
    setPaused(!paused);
    setShowControls(true);
  };

  const getMovies = async (id: string) => {
    const data = await fetchMovies();
    if (data.movies)
      setsimilarMovie(
        data.movies
          .filter((movie: {id: string}) => movie.id !== id)
          .slice(0, 9),
      );
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getMovies(item.id);
  }, []);

  const isFavoriteItemPresent = userFavorites.some(fav => {
    return fav?.id === item.id;
  });
  const setuserFavorite = () => {
    // let favoriteItem = {id: item.id, title: item.title, poster: item.poster};
    if (isFavoriteItemPresent) {
      removeFavorite(item);
    } else {
      addFavorite(item);
    }
    // console.log(isFavoriteItemPresent);
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={{paddingBottom: 20}}
        showsVerticalScrollIndicator={false}
        className="flex-1 bg-[#101011]">
        <View className="w-full ">
          <SafeAreaView
            className={
              'absolute z-20 w-full flex-row justify-between items-center px-4 mt-4'
            }>
            <Pressable
              onPress={() => navigation.pop()}
              style={{backgroundColor: '#ef4444'}}
              className="rounded-xl p-1">
              <IoniconIcon name="chevron-back" size={28} color="white" />
            </Pressable>

            <Pressable onPress={() => setuserFavorite()}>
              <IoniconIcon
                name="heart"
                size={35}
                color={isFavoriteItemPresent ? '#ef4444' : 'white'}
              />
            </Pressable>
          </SafeAreaView>
          {loading ? (
            <Loader />
          ) : (
            <View>
              <Image
                source={{
                  uri: item.backdrop,
                  // uri: 'https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/6408f6e7b5811271dc883aa8_batman-min.png',
                }}
                style={{width, height: height * 0.55}}
              />
              <LinearGradient
                colors={[
                  'transparent',
                  'rgba(23, 23, 23, 0.3)',
                  'rgba(23, 23, 23, 1)',
                ]}
                style={{width, height: height * 0.2}}
                start={{x: 0.5, y: 0}}
                end={{x: 0.5, y: 1}}
                className="absolute bottom-0"
              />
            </View>
          )}
        </View>
        <View style={{marginTop: -(height * 0.09)}} className="space-y-3">
          <Text className="text-white text-center text-3xl font-bold tracking-widest">
            {item.title}
          </Text>

          {item?.id ? (
            <Text className="text-neutral-400 font-semibold text-base text-center">
              {item?.status} • {item?.release_date?.split('-')[0] || 'N/A'} •{' '}
              {item?.runtime} min
            </Text>
          ) : null}

          {item?.id ? (
            <Text className="text-neutral-400 font-semibold text-base text-center">
              {item?.studio}
            </Text>
          ) : null}

          <View className="flex-row justify-center mx-4 space-x-2">
            {item?.genre?.map((genre: string, index: number) => {
              let showDot = index + 1 != item.genre.length;
              return (
                <Text
                  key={index}
                  className="text-neutral-400 font-semibold text-base text-center">
                  {genre} {showDot ? '•' : null}
                </Text>
              );
            })}
          </View>

          <Text className="text-neutral-400 mx-4 tracking-wide text-center">
            {item.description}
          </Text>
        </View>
        {item?.id && item.casts.length > 0 && <CastList casts={item.casts} />}
        <Text className="text-white text-lg mx-4 mb-5">Watch Movie</Text>
        <VedioPlayer backdrop={item.backdrop} />
        {item?.id && similarMovie.length > 0 && (
          <MovieList title={'Similar Movies'} hideSeeAll data={similarMovie} />
        )}
      </ScrollView>
    </>
  );
};

export default Details;
