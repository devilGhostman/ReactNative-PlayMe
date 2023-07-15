import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userLogin} from '../api/apiCall';

export interface AuthContextType {
  isloading: boolean;
  isError: boolean;
  user: null | {
    email: string;
    id: string;
    image: string;
    message: string;
    name: string;
    token: string;
  };
  userToken: string | null;
  login: (data: {email: string; password: string}) => void;
  logout: () => void;

  userFavorites: object[];
  addFavorite: (item: any) => void;
  removeFavorite: (item: any) => void;
  clearFavoraite: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isloading: true,
  user: null,
  userToken: null,
  isError: false,
  login: () => {},
  logout: () => {},

  userFavorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  clearFavoraite: () => {},
});

export const AuthProvider = ({children}: any) => {
  const [isloading, setisLoading] = useState(false);
  const [isError, setisError] = useState(false);
  const [userToken, setuserToken] = useState<null | string>(null);
  const [user, setUser] = useState<null | {
    email: string;
    id: string;
    image: string;
    message: string;
    name: string;
    token: string;
  }>(null);

  const [userFavorites, setuserFavorites] = useState<any>([]);

  const login = async (data: {email: string; password: string}) => {
    setisLoading(true);
    setisError(false);

    try {
      const res = await userLogin(data);
      // console.log('inside login', res);
      setUser(res);
      setuserToken(res.token);
      AsyncStorage.setItem('userToken', res.token);
      AsyncStorage.setItem('user', JSON.stringify(res));
    } catch (error) {
      console.log('Login Error');
      setisError(true);
    }
    setisLoading(false);
  };

  const logout = async () => {
    setisLoading(true);
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('user');
      setUser(null);
      setuserToken(null);
      console.log('userToken removed successfully');
    } catch (error) {
      console.log('Error removing userToken:', error);
    } finally {
      setisLoading(false);
      setisError(false);
    }
  };

  const isLoggedIn = async () => {
    setisLoading(true);
    setisError(false);
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const user = await AsyncStorage.getItem('user');

      setuserToken(userToken);
      if (user) {
        setUser(JSON.parse(user));
      }
      // console.log('jwt', userJWTToken);
    } catch (error) {
      console.log('isLoggenIn failed');
      setisError(true);
    } finally {
      setisError(false);
      setisLoading(false);
    }
  };

  const addFavorite = async (item: any) => {
    try {
      const updatedFavorites = [...userFavorites, item];
      setuserFavorites(updatedFavorites);
      await AsyncStorage.setItem(
        'userFavorites',
        JSON.stringify(updatedFavorites),
      );
      // console.log('Added to favorites:', item);
    } catch (error) {
      console.log('Error adding to favorites:', error);
    }
  };

  const removeFavorite = async (item: any) => {
    try {
      const updatedFavorites = userFavorites.filter(
        (favorite: {id: any}) => favorite.id !== item.id,
      );
      setuserFavorites(updatedFavorites);
      await AsyncStorage.setItem(
        'userFavorites',
        JSON.stringify(updatedFavorites),
      );
      // console.log('Removed from favorites:', item);
    } catch (error) {
      console.log('Error removing from favorites:', error);
    }
  };

  const clearFavoraite = () => {
    AsyncStorage.removeItem('userToken');
    setuserFavorites([]);
  };

  const fetchFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('userFavorites');
      if (storedFavorites) {
        setuserFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.log('Error loading favorites:', error);
    }
  };

  useEffect(() => {
    isLoggedIn();
    fetchFavorites();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isloading,
        isError,
        userToken,
        user,
        userFavorites,
        addFavorite,
        removeFavorite,
        clearFavoraite,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
