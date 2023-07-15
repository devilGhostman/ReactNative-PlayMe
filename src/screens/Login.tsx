import {View, Text, SafeAreaView, Pressable, Image} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import InputField from '../components/Input/InputField';
import CustomButton from '../components/Button/CustomButton';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useForm} from 'react-hook-form';
import {AuthContext} from '../context/AuthContext';

const Login = ({navigation}: any) => {
  const {login, isError} = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isSubmitSuccessful},
  } = useForm<{email: string; password: string}>();

  const onSignIn = (data: {email: string; password: string}) => {
    login(data);
  };

  const onSignInTestUser = () => {
    login({email: 'rahul@gmail.com', password: 'test@123'});
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  return (
    <SafeAreaView className="flex-1 justify-center bg-[#101011]">
      <View className="px-6">
        <View className="h-[150px] w-[95%] mb-5 flex-row items-center justify-center">
          <Image
            source={require('../assets/images/logo.png')}
            className="h-[50%] w-[90%]"
          />
        </View>
        <Text className="text-xl font-medium mb-7 text-[#fff]">Login</Text>
        <InputField
          icon={
            <MaterialIcons
              name="person"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          name="email"
          control={control}
          placeholder="Enter Your email"
          secureTextEntry={false}
          rules={{
            required: 'Email is required',
          }}
        />
        <InputField
          icon={
            <Ionicons
              name="lock-closed"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          name="password"
          control={control}
          placeholder="Enter Your Password"
          secureTextEntry
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be of 8 character long.',
            },
          }}
        />
        {isError && (
          <Text className="font-medium text-red-500 text-center">
            Invalid Credential
          </Text>
        )}
        <CustomButton onPress={handleSubmit(onSignIn)} text={'Sign In'} />
        <CustomButton onPress={onSignInTestUser} text={'Sign In As TestUser'} />

        <View className="flex-row justify-center items-center mt-6">
          <Text className="text-white">Dont have account?</Text>
          <Pressable
            className="ml-2"
            onPress={() => navigation.navigate('Register')}>
            <Text className="font-medium text-red-500">Register here</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
