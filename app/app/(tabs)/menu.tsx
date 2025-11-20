import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Filter } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { GlassCard } from '@/components/GlassCard';
import { CategoryCard } from '@/components/CategoryCard';
import { MenuItemCard } from '@/components/MenuItemCard';
import { CartButton } from '@/components/CartButton';
import { menuCategories, menuItems } from '@/data/mockData';
import { router } from 'expo-router';

export default function MenuScreen() {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const filteredItems = selectedCategory
    ? menuItems.filter(item => item.category.id === selectedCategory)
    : menuItems;

  return (
    <LinearGradient
      colors={[theme.colors.background, theme.colors.surface]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Menu</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Search size={20} color={theme.colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Filter size={20} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Categories */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
              <TouchableOpacity
                style={[
                  styles.allCategoryButton,
                  !selectedCategory && styles.allCategoryButtonActive
                ]}
                onPress={() => setSelectedCategory(null)}
              >
                <Text style={[
                  styles.allCategoryText,
                  !selectedCategory && styles.allCategoryTextActive
                ]}>
                  All Items
                </Text>
              </TouchableOpacity>
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

          {/* Menu Items */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {selectedCategory 
                  ? menuCategories.find(c => c.id === selectedCategory)?.name 
                  : `All Items (${filteredItems.length})`
                }
              </Text>
              {selectedCategory && (
                <TouchableOpacity onPress={() => setSelectedCategory(null)}>
                  <Text style={styles.clearFilter}>Show All</Text>
                </TouchableOpacity>
              )}
            </View>
            
            <View style={styles.menuItems}>
              {filteredItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  onPress={() => console.log('Navigate to menu item:', item.id)}
                />
              ))}
            </View>
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>

        <CartButton />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
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
  title: {
    fontSize: theme.fontSize['3xl'],
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  headerActions: {
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
  allCategoryButton: {
    backgroundColor: theme.colors.glass,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    marginRight: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    minHeight: 120,
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
  },
  allCategoryButtonActive: {
    backgroundColor: theme.colors.glassStrong,
  },
  allCategoryText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  allCategoryTextActive: {
    color: theme.colors.text,
  },
  menuItems: {
    paddingHorizontal: theme.spacing.md,
  },
  bottomSpacing: {
    height: 120,
  },
});