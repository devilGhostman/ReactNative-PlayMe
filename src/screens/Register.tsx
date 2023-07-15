import {View, Text, SafeAreaView, Pressable, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';

import InputField from '../components/Input/InputField';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/Button/CustomButton';

import {useForm} from 'react-hook-form';
import {userRegister} from '../api/apiCall';
import Loader from '../components/Loader';

const EMAIL_REGEX =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const PHONE_REGEX = /^\+?[1-9][0-9]{7,14}$/;

const Register = ({navigation}: any) => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: {errors, isSubmitSuccessful},
  } = useForm<{
    email: string;
    password: string;
    phoneNumber: string;
    userName: string;
  }>();

  const [isloading, setisLoading] = useState(false);
  const [isError, setisError] = useState(false);
  const toConformPwd = watch('password');

  if(isloading){
    <Loader/>
  }

  const onRegister = async (data: {
    email: string;
    password: string;
    phoneNumber: string;
    userName: string;
  }) => {
    setisLoading(true);
    setisError(false);
    try {
      await userRegister(data);
      navigation.pop();
    } catch (error) {
      setisError(true);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);
  return (
    <SafeAreaView className="flex-1 justify-center bg-[#101011]">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-6">
          <Text className="text-xl font-medium mb-4 mt-8 text-white">
            Create Account
          </Text>
          <InputField
            icon={
              <MaterialIcons
                name="person"
                size={20}
                color="#666"
                style={{marginRight: 5}}
              />
            }
            name="userName"
            control={control}
            placeholder="Enter Your userName"
            secureTextEntry={false}
            rules={{
              required: 'Usename is required',
            }}
          />
          <InputField
            icon={
              <MaterialIcons
                name="alternate-email"
                size={20}
                color="#666"
                style={{marginRight: 5}}
              />
            }
            name="email"
            control={control}
            placeholder="Enter Your Email"
            secureTextEntry={false}
            keyboardType="email-address"
            rules={{
              required: 'Email is required',
              pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
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
          <InputField
            icon={
              <Ionicons
                name="lock-closed"
                size={20}
                color="#666"
                style={{marginRight: 5}}
              />
            }
            name="conformPassword"
            control={control}
            placeholder="Conform your Password"
            secureTextEntry
            rules={{
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password should be of 8 character long.',
              },
              validate: (value: string) =>
                value === toConformPwd || 'Password does not match',
            }}
          />
          <InputField
            icon={
              <MaterialIcons
                name="phone"
                size={20}
                color="#666"
                style={{marginRight: 5}}
              />
            }
            name="phoneNumber"
            control={control}
            placeholder="Enter Your Phone Number"
            keyboardType="number-pad"
            rules={{
              required: 'Phone Number is required',
              pattern: {value: PHONE_REGEX, message: 'Phone Number is invalid'},
              minLength: {
                value: 10,
                message: 'Phone Number is invalid.',
              },
              maxLength: {
                value: 10,
                message: 'Phone Number is invalid.',
              },
            }}
          />
          {isError && (
            <Text className="font-medium text-red-500 text-center">
              Unable To Create
            </Text>
          )}
          <CustomButton onPress={handleSubmit(onRegister)} text={'Register'} />
          <View className="flex-row justify-start items-center mt-6">
            <Text className="text-white">
              By registering you confirm that you accept our terms and
              condition.
            </Text>
          </View>
          <View className="flex-row justify-center items-center mt-6">
            <Text className="text-white">Have account?</Text>
            <Pressable className="ml-2" onPress={() => navigation.pop()}>
              <Text className="font-medium text-red-500">Login here</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
