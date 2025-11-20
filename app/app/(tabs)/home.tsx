import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Search, Bell, MapPin } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { GlassCard } from '@/components/GlassCard';
import { CategoryCard } from '@/components/CategoryCard';
import { MenuItemCard } from '@/components/MenuItemCard';
import { CartButton } from '@/components/CartButton';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { menuCategories, menuItems, restaurant } from '@/data/mockData';
import { router } from 'expo-router';

export default function HomeScreen() {
  const { user, loadStoredAuth } = useAuth();
  const { loadStoredCart } = useCart();
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  useEffect(() => {
    loadStoredAuth();
    loadStoredCart();
  }, [loadStoredAuth, loadStoredCart]);

  const filteredItems = selectedCategory
    ? menuItems.filter(item => item.category.id === selectedCategory)
    : menuItems.slice(0, 4);

  return (
    <LinearGradient
      colors={[theme.colors.background, theme.colors.surface]}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>Good evening,</Text>
            <Text style={styles.userName}>{user?.name || 'Guest'}</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton}>
              <Bell size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Location */}
        <GlassCard style={styles.locationCard}>
          <View style={styles.locationContent}>
            <MapPin size={20} color={theme.colors.primary} />
            <View style={styles.locationText}>
              <Text style={styles.locationTitle}>Delivery to</Text>
              <Text style={styles.locationAddress}>123 Main St, New York</Text>
            </View>
          </View>
        </GlassCard>

        {/* Search */}
        <GlassCard style={styles.searchCard}>
          <View style={styles.searchContent}>
            <Search size={20} color={theme.colors.textMuted} />
            <Text style={styles.searchPlaceholder}>Search for dishes, drinks...</Text>
          </View>
        </GlassCard>

        {/* Restaurant Hero */}
        <GlassCard style={styles.restaurantCard}>
          <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} />
          <View style={styles.restaurantOverlay}>
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
            <Text style={styles.restaurantDescription}>{restaurant.description}</Text>
            <View style={styles.restaurantInfo}>
              <Text style={styles.restaurantRating}>⭐ {restaurant.rating}</Text>
              <Text style={styles.restaurantDelivery}>{restaurant.deliveryTime}</Text>
            </View>
          </View>
        </GlassCard>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {menuCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                isSelected={selectedCategory === category.id}
                onPress={() => setSelectedCategory(
                  selectedCategory === category.id ? null : category.id
                )}
              />
            ))}
          </ScrollView>
        </View>

        {/* Featured Items */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedCategory ? 'Filtered Items' : 'Featured Items'}
            </Text>
            {selectedCategory && (
              <TouchableOpacity onPress={() => setSelectedCategory(null)}>
                <Text style={styles.clearFilter}>Clear</Text>
              </TouchableOpacity>
            )}
          </View>
          {filteredItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              onPress={() => router.push('/(tabs)/menu')}
            />
          ))}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      <CartButton />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: theme.fontSize.base,
    color: theme.colors.textSecondary,
  },
  userName: {
    fontSize: theme.fontSize['2xl'],
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  headerRight: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.glass,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationCard: {
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  locationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: theme.spacing.sm,
    flex: 1,
  },
  locationTitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
  },
  locationAddress: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
  },
  searchCard: {
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  searchContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchPlaceholder: {
    marginLeft: theme.spacing.sm,
    fontSize: theme.fontSize.base,
    color: theme.colors.textMuted,
  },
  restaurantCard: {
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    overflow: 'hidden',
  },
  restaurantImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  restaurantOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  restaurantName: {
    fontSize: theme.fontSize['2xl'],
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: 4,
  },
  restaurantDescription: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  restaurantInfo: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  restaurantRating: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.medium,
  },
  restaurantDelivery: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  clearFilter: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.medium,
  },
  categoriesScroll: {
    paddingLeft: theme.spacing.md,
  },
  bottomSpacing: {
    height: 120,
  },
});