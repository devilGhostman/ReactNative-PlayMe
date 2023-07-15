import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {useContext, useEffect} from 'react';
import {AuthContext} from '../context/AuthContext';
import {ActivityIndicator, View} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import Loader from '../components/Loader';

type AuthContextType = {
  isloading: boolean;
  userToken: string | null;
};

const AppNavigation = () => {
  const {isloading, userToken}: AuthContextType = useContext(AuthContext);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  if (isloading) {
    return <Loader />;
  }
  return (
    <NavigationContainer>
      {userToken === null ? <AuthStack /> : <AppStack />}
    </NavigationContainer>
  );
};

export default AppNavigation;
