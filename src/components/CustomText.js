import React from 'react';
import { Text } from 'react-native';
import { fonts } from '../styles/fonts';
import { color } from '../styles/theme';

const CustomText = ({ children, style, numberOfLines, ...props }) => {
  return (
    <Text
      style={[fonts.body, { color: color.textPrimary }, style]}
      allowFontScaling={false}
      numberOfLines={numberOfLines}
      {...props}
    >
      {children}
    </Text>
  );
};

export default CustomText;



