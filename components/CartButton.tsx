import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { ShoppingBag } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { useCart } from '@/hooks/useCart';
import { router } from 'expo-router';

export function CartButton() {
  const { itemCount, totalAmount } = useCart();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (itemCount > 0) {
      Animated.sequence([
        Animated.spring(scaleAnim, { toValue: 1.1, useNativeDriver: true }),
        Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
      ]).start();
    }
  }, [itemCount]);

  if (itemCount === 0) return null;

  const handlePress = () => {
    router.push('/cart');
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity style={styles.button} onPress={handlePress} activeOpacity={0.9}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <ShoppingBag size={20} color={theme.colors.background} />
            {itemCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{itemCount}</Text>
              </View>
            )}
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.itemCount}>{itemCount} items</Text>
            <Text style={styles.total}>${totalAmount.toFixed(2)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    left: theme.spacing.md,
    right: theme.spacing.md,
    zIndex: 1000,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    ...theme.shadows.lg,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'relative',
    marginRight: theme.spacing.md,
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: theme.colors.error,
    borderRadius: theme.borderRadius.full,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  textContainer: {
    alignItems: 'center',
  },
  itemCount: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.background,
  },
  total: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.background,
  },
});