import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BarChart3, Users, DollarSign, Package, TrendingUp } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { GlassCard } from '@/components/GlassCard';

export default function AdminScreen() {
  const stats = [
    { icon: DollarSign, label: 'Revenue', value: '$12,450', change: '+12%', color: theme.colors.primary },
    { icon: Users, label: 'Customers', value: '1,234', change: '+8%', color: '#10B981' },
    { icon: Package, label: 'Orders', value: '456', change: '+15%', color: '#F59E0B' },
    { icon: TrendingUp, label: 'Growth', value: '23%', change: '+5%', color: '#8B5CF6' },
  ];

  return (
    <LinearGradient
      colors={[theme.colors.background, theme.colors.surface]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Admin Dashboard</Text>
              <Text style={styles.subtitle}>Manage your restaurant</Text>
            </View>
            <BarChart3 size={32} color={theme.colors.primary} />
          </View>

          <View style={styles.statsGrid}>
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <GlassCard key={index} style={styles.statCard}>
                  <View style={[styles.iconContainer, { backgroundColor: stat.color + '20' }]}>
                    <Icon size={24} color={stat.color} />
                  </View>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                  <Text style={[styles.statChange, { color: stat.color }]}>
                    {stat.change}
                  </Text>
                </GlassCard>
              );
            })}
          </View>

          <GlassCard style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <TouchableOpacity style={styles.actionButton}>
              <Package size={20} color={theme.colors.text} />
              <Text style={styles.actionText}>Manage Menu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Users size={20} color={theme.colors.text} />
              <Text style={styles.actionText}>View Customers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <DollarSign size={20} color={theme.colors.text} />
              <Text style={styles.actionText}>Sales Reports</Text>
            </TouchableOpacity>
          </GlassCard>

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
  subtitle: {
    fontSize: theme.fontSize.base,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.md,
  },
  statCard: {
    width: '47%',
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  statValue: {
    fontSize: theme.fontSize['2xl'],
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  statChange: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    marginTop: 4,
  },
  section: {
    marginHorizontal: theme.spacing.md,
    marginTop: theme.spacing.lg,
    padding: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  actionText: {
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
    marginLeft: theme.spacing.md,
    fontWeight: theme.fontWeight.medium,
  },
  bottomSpacing: {
    height: 120,
  },
});
