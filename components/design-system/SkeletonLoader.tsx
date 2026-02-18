import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, DimensionValue, LayoutChangeEvent } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  Easing,
  cancelAnimation
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

interface SkeletonLoaderProps {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  width = '100%', 
  height = 20, 
  borderRadius = 8, 
  style 
}) => {
  const [layoutWidth, setLayoutWidth] = useState<number>(0);
  const translateX = useSharedValue(0);

  useEffect(() => {
    if (layoutWidth > 0) {
      translateX.value = -layoutWidth;
      translateX.value = withRepeat(
        withTiming(layoutWidth, {
          duration: 1200,
          easing: Easing.linear,
        }),
        -1
      );
    }
    return () => cancelAnimation(translateX);
  }, [layoutWidth]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const onLayout = (event: LayoutChangeEvent) => {
    setLayoutWidth(event.nativeEvent.layout.width);
  };

  return (
    <View 
      onLayout={onLayout}
      style={[
        styles.container, 
        { width, height, borderRadius }, 
        style
      ]}
    >
      {layoutWidth > 0 && (
        <AnimatedLinearGradient
          colors={[
            'rgba(229, 231, 235, 0.4)', 
            'rgba(243, 244, 246, 0.8)', 
            'rgba(229, 231, 235, 0.4)', 
          ] as any} // Cast colors to any to avoid TS error with LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[StyleSheet.absoluteFill, { width: layoutWidth }, animatedStyle]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
  },
});
