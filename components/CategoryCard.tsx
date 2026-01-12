import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { MenuCategory } from '@/types';
import { theme } from '@/constants/theme';
import { GlassCard } from './GlassCard';

interface CategoryCardProps {
  category: MenuCategory;
  isSelected?: boolean;
  onPress: () => void;
}

export function CategoryCard({ category, isSelected = false, onPress }: CategoryCardProps) {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <GlassCard style={[
          styles.card,
          isSelected && { backgroundColor: theme.colors.glassStrong }
        ]}>
          <View style={[styles.iconContainer, { backgroundColor: category.color }]}>
            <Text style={styles.icon}>{category.icon}</Text>
          </View>
          <Text style={styles.name}>{category.name}</Text>
          <Text style={styles.description}>{category.description}</Text>
        </GlassCard>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    marginRight: theme.spacing.md,
  },
  card: {
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    marginLeft: theme.spacing.lg,
  },
  icon: {
    fontSize: 20,
  },
  name: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  description: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
    textAlign: 'center',
    lineHeight: 14,
  },
});