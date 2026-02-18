import React from 'react';
import { Text, Pressable, StyleSheet, Platform, ViewStyle, TextStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

interface ClayButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const ClayButton: React.FC<ClayButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  style,
  textStyle,
  disabled
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const handlePressIn = () => {
    if (disabled) return;
    scale.value = withSpring(0.95, { damping: 10, stiffness: 300 });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handlePressOut = () => {
    if (disabled) return;
    scale.value = withSpring(1, { damping: 10, stiffness: 300 });
  };

  const backgroundColor = variant === 'primary' ? '#3B82F6' : // Blue-500
                         variant === 'secondary' ? '#F3F4F6' : // Gray-100
                         variant === 'danger' ? '#EF4444' : // Red-500
                         '#3B82F6';

  const textColor = variant === 'secondary' ? '#111827' : 'white';

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[
        styles.button, 
        { backgroundColor }, 
        disabled && styles.disabled, 
        style,
        animatedStyle
      ]}
    >
      <Text style={[styles.text, { color: textColor }, textStyle]}>{title}</Text>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // Claymorphism: Soft Shadow + Inner Highlight (simulated)
    ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 4, height: 4 }, // Light source from top-left
          shadowOpacity: 0.2, // Softer shadow
          shadowRadius: 8,
        },
        android: {
          elevation: 6,
        },
      }),
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  disabled: {
    opacity: 0.5,
  }
});
