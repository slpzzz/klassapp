import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

const Date = ({ data }) => {
  console.log(data);

  return <Text>{data}</Text>;
};

export default Date;
