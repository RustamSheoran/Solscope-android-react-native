import React from 'react';
import { StyleSheet, View, Platform, StyleProp, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

interface GlassCardProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  intensity?: number;
  tint?: 'light' | 'dark' | 'default';
  colors?: string[];
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  intensity = 20,
  tint = 'light',
  colors = ['rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 0.3)'],
}) => {
  return (
    <View style={[styles.container, style]}>
      {/* Blurred Background Layer (iOS mainly, Android fallback/compat) */}
      <BlurView intensity={intensity} tint={tint} style={StyleSheet.absoluteFillObject} />
      
      {/* Gradient Overlay for "Frosted" look and depth */}
      <LinearGradient
        colors={colors as any}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      
      {/* Content Container */}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    // Subtle shadow for lift
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  content: {
    // padding is usually handled by parent/children, or default here
    // keeping it minimal wrapper
  },
});
