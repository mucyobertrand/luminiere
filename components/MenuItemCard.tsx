import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { Plus, Star } from 'lucide-react-native';
import { MenuItem } from '@/types';
import { theme } from '@/constants/theme';
import { GlassCard } from './GlassCard';
import { useCart } from '@/hooks/useCart';

interface MenuItemCardProps {
  item: MenuItem;
  onPress?: () => void;
}

export function MenuItemCard({ item, onPress }: MenuItemCardProps) {
  const { addItem } = useCart();
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

  const handleAddToCart = () => {
    addItem(item);
    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 1.05, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
    ]).start();
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <GlassCard style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} />
          
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
              <View style={styles.rating}>
                <Star size={14} color={theme.colors.primary} fill={theme.colors.primary} />
                <Text style={styles.ratingText}>{item.rating}</Text>
              </View>
            </View>
            
            <Text style={styles.description} numberOfLines={2}>
              {item.description}
            </Text>
            
            <View style={styles.footer}>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>${item.price}</Text>
                <Text style={styles.prepTime}>{item.preparationTime} min</Text>
              </View>
              
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddToCart}
                activeOpacity={0.8}
              >
                <Plus size={20} color={theme.colors.background} />
              </TouchableOpacity>
            </View>
          </View>
        </GlassCard>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  card: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  content: {
    padding: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  name: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    fontWeight: theme.fontWeight.medium,
  },
  description: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    lineHeight: 20,
    marginBottom: theme.spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flex: 1,
  },
  price: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
  },
  prepTime: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.md,
  },
});