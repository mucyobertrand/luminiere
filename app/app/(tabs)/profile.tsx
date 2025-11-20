import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  User, 
  MapPin, 
  CreditCard, 
  Bell, 
  Gift, 
  Settings, 
  LogOut,
  ChevronRight,
  Star
} from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { GlassCard } from '@/components/GlassCard';
import { useAuth } from '@/hooks/useAuth';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: logout },
      ]
    );
  };

  const menuItems = [
    { icon: MapPin, title: 'Addresses', subtitle: 'Manage delivery addresses' },
    { icon: CreditCard, title: 'Payment Methods', subtitle: 'Cards and digital wallets' },
    { icon: Bell, title: 'Notifications', subtitle: 'Order updates and promotions' },
    { icon: Gift, title: 'Loyalty Program', subtitle: `${user?.loyaltyPoints || 0} points available` },
    { icon: Settings, title: 'Settings', subtitle: 'App preferences and privacy' },
  ];

  return (
    <LinearGradient
      colors={[theme.colors.background, theme.colors.surface]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Profile</Text>
          </View>

          {/* User Info */}
          <GlassCard style={styles.userCard}>
            <View style={styles.userInfo}>
              <View style={styles.avatar}>
                <User size={32} color={theme.colors.primary} />
              </View>
              <View style={styles.userDetails}>
                <Text style={styles.userName}>{user?.name}</Text>
                <Text style={styles.userEmail}>{user?.email}</Text>
                <View style={styles.loyaltyInfo}>
                  <Star size={16} color={theme.colors.primary} fill={theme.colors.primary} />
                  <Text style={styles.loyaltyText}>
                    {user?.loyaltyPoints || 0} loyalty points
                  </Text>
                </View>
              </View>
            </View>
          </GlassCard>

          {/* Menu Items */}
          <View style={styles.menuSection}>
            {menuItems.map((item, index) => (
              <TouchableOpacity key={index} activeOpacity={0.7}>
                <GlassCard style={styles.menuItem}>
                  <View style={styles.menuItemContent}>
                    <View style={styles.menuItemLeft}>
                      <View style={styles.menuItemIcon}>
                        <item.icon size={20} color={theme.colors.primary} />
                      </View>
                      <View style={styles.menuItemText}>
                        <Text style={styles.menuItemTitle}>{item.title}</Text>
                        <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                      </View>
                    </View>
                    <ChevronRight size={20} color={theme.colors.textMuted} />
                  </View>
                </GlassCard>
              </TouchableOpacity>
            ))}
          </View>

          {/* Logout */}
          <TouchableOpacity onPress={handleLogout} activeOpacity={0.7}>
            <GlassCard style={styles.logoutCard}>
              <View style={styles.logoutContent}>
                <LogOut size={20} color={theme.colors.error} />
                <Text style={styles.logoutText}>Sign Out</Text>
              </View>
            </GlassCard>
          </TouchableOpacity>

          <View style={styles.bottomSpacing} />
        </ScrollView>
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
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
  },
  title: {
    fontSize: theme.fontSize['3xl'],
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  userCard: {
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: theme.fontSize.base,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  loyaltyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  loyaltyText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.medium,
  },
  menuSection: {
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  menuItem: {
    marginBottom: 0,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  logoutCard: {
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  logoutContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  logoutText: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.error,
  },
  bottomSpacing: {
    height: 100,
  },
});