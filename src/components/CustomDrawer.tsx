import {
  View,
  Text,
  ImageBackground,
  Image,
  Dimensions,
  Pressable,
} from 'react-native';
import React, {useContext} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../context/AuthContext';
import {imgApibaseurl} from '../api/apiCall';

const CustomDrawer = (props: any) => {
  const {logout, user} = useContext(AuthContext);
  return (
    <View className="flex-1">
      <DrawerContentScrollView {...props}>
        <ImageBackground
          source={require('../assets/images/drawer-cover.jpeg')}
          style={{height: 140}}>
          <Image
            // source={require('../assets/images/user.jpg')}
            source={{uri: `${imgApibaseurl}/${user?.image}`}}
            alt="userProfile"
            className="w-[110px] h-[110px] rounded-full absolute"
            style={{left: 240 / 2 - 110 / 2, bottom: -110 / 2}}
          />
        </ImageBackground>
        <View className="mt-[65]">
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View className="p-2">
        <Pressable android_ripple={{color: 'red'}} onPress={() => logout()}>
          <View className="flex flex-row items-center bg-[#ef4444] p-2 rounded-md">
            <Ionicons name="exit-outline" size={35} color="white" />
            <Text className="text-[15px] ml-4 text-white">Logout</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default CustomDrawer;
