import React, {useEffect} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {StatusBar} from 'react-native';

import Home from '../screens/Home';
import Details from '../screens/Details';
import Search from '../screens/Search';
import Favouraites from '../screens/Favouraites';

import CustomDrawer from '../components/CustomDrawer';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  useEffect(() => {
    StatusBar.setBackgroundColor('#101011');
    StatusBar.setBarStyle('light-content');
    return () => {
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setBarStyle('dark-content');
    };
  }, []);
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        swipeEdgeWidth: 100,
        drawerStyle: {
          backgroundColor: '#101011',
          width: 240,
        },
        drawerLabelStyle: {
          marginLeft: -20,
        },
        drawerActiveBackgroundColor: '#ef4444',
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: 'white',
      }}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          drawerIcon: ({focused, color, size}) => (
            <MaterialIcon name="home" size={35} color="white" />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorite"
        component={Favouraites}
        options={{
          title: 'Favourite',
          drawerIcon: ({focused, color, size}) => (
            <MaterialIcon name="favorite" size={35} color="white" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Drawer"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigation}
        options={{
          headerStyle: {backgroundColor: '#27272a'},
        }}
      />
      <Stack.Screen
        name="Detail"
        component={Details}
        options={{
          headerStyle: {backgroundColor: '#27272a'},
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerStyle: {backgroundColor: '#27272a'},
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
