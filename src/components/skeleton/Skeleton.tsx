import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
} from 'react-native';

export interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
  animated?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 8,
  style,
  animated = true,
}) => {
  const pulseAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    if (!animated) return;

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.95,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.4,
          duration: 750,
          useNativeDriver: true,
        }),
      ])
    );

    pulse.start();

    return () => {
      pulse.stop();
    };
  }, [animated, pulseAnim]);

  if (!animated) {
    return (
      <View
        style={[
          styles.skeleton,
          {
            width: width as any,
            height: height as any,
            borderRadius,
          },
          style,
        ]}
      />
    );
  }

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width: width as any,
          height: height as any,
          borderRadius,
          opacity: pulseAnim,
        },
        style,
      ]}
    />
  );
};

export const SkeletonCircle: React.FC<{
  size: number;
  style?: StyleProp<ViewStyle>;
}> = ({ size, style }) => (
  <Skeleton
    width={size}
    height={size}
    borderRadius={size / 2}
    style={style}
  />
);

export const SkeletonText: React.FC<{
  width?: number | string;
  height?: number;
  style?: StyleProp<ViewStyle>;
}> = ({ width = '100%', height = 14, style }) => (
  <Skeleton
    width={width}
    height={height}
    borderRadius={6}
    style={style}
  />
);

export const SkeletonBox: React.FC<{
  width?: number | string;
  height: number | string;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}> = ({ width = '100%', height, borderRadius = 12, style }) => (
  <Skeleton
    width={width}
    height={height}
    borderRadius={borderRadius}
    style={style}
  />
);

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#E2E8F0',
  },
});

export default Skeleton;

