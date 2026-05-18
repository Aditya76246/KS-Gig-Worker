import React from 'react';
import { Text } from 'react-native';

const CustomText = ({ children, style, numberOfLines, ...props }) => {
  return (
    <Text
      style={style}
      allowFontScaling={false}
      numberOfLines={numberOfLines}
      {...props}
    >
      {children}
    </Text>
  );
};

export default CustomText;
