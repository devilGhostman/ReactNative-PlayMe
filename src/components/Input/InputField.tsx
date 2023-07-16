import {View, Text, TextInput} from 'react-native';
import React from 'react';
import {Controller} from 'react-hook-form';

const InputField = ({
  icon,
  name,
  control,
  rules = {},
  placeholder,
  secureTextEntry,
  keyboardType,
}: any) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
        <>
          <View
            className="flex-row pb-2 mb-1 border-b-2 border-b-[#ccc] justify-start items-center"
            style={[{borderBottomColor: error ? 'red' : '#ccc'}]}>
            {icon}
            <TextInput
              placeholder={placeholder}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              className="text-white"
            />
          </View>
          <Text className="text-red-500">{error?.message}</Text>
        </>
      )}
    />
  );
};

export default InputField;
