import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Clock, MapPin, Phone } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { GlassCard } from '@/components/GlassCard';

const mockOrders = [
  {
    id: '1',
    status: 'preparing',
    items: ['Wagyu Beef Tenderloin', 'Truffle Arancini'],
    total: 103,
    estimatedTime: '25 min',
    orderType: 'dine-in',
    tableNumber: 12,
  },
  {
    id: '2',
    status: 'delivered',
    items: ['Smoked Old Fashioned', 'Lobster Bisque'],
    total: 38,
    estimatedTime: 'Delivered',
    orderType: 'delivery',
    address: '123 Main St, New York',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'preparing': return theme.colors.warning;
    case 'ready': return theme.colors.success;
    case 'delivered': return theme.colors.success;
    case 'cancelled': return theme.colors.error;
    default: return theme.colors.textMuted;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'preparing': return 'Preparing';
    case 'ready': return 'Ready';
    case 'delivered': return 'Delivered';
    case 'cancelled': return 'Cancelled';
    default: return 'Unknown';
  }
};

export default function OrdersScreen() {
  return (
    <LinearGradient
      colors={[theme.colors.background, theme.colors.surface]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Orders</Text>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {mockOrders.map((order) => (
            <GlassCard key={order.id} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <View style={styles.orderInfo}>
                  <Text style={styles.orderId}>Order #{order.id}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
                    <Text style={styles.statusText}>{getStatusText(order.status)}</Text>
                  </View>
                </View>
                <Text style={styles.orderTotal}>${order.total}</Text>
              </View>

              <View style={styles.orderItems}>
                {order.items.map((item, index) => (
                  <Text key={index} style={styles.orderItem}>• {item}</Text>
                ))}
              </View>

              <View style={styles.orderDetails}>
                <View style={styles.orderDetail}>
                  <Clock size={16} color={theme.colors.textMuted} />
                  <Text style={styles.orderDetailText}>{order.estimatedTime}</Text>
                </View>
                
                {order.orderType === 'dine-in' ? (
                  <View style={styles.orderDetail}>
                    <MapPin size={16} color={theme.colors.textMuted} />
                    <Text style={styles.orderDetailText}>Table {order.tableNumber}</Text>
                  </View>
                ) : (
                  <View style={styles.orderDetail}>
                    <MapPin size={16} color={theme.colors.textMuted} />
                    <Text style={styles.orderDetailText}>{order.address}</Text>
                  </View>
                )}
              </View>

              <View style={styles.orderActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Track Order</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
                  <Phone size={16} color={theme.colors.primary} />
                  <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>Contact</Text>
                </TouchableOpacity>
              </View>
            </GlassCard>
          ))}

          {mockOrders.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No orders yet</Text>
              <Text style={styles.emptySubtitle}>
                Start exploring our menu to place your first order
              </Text>
            </View>
          )}

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
  orderCard: {
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  orderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  orderId: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  statusText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
  },
  orderTotal: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
  },
  orderItems: {
    marginBottom: theme.spacing.md,
  },
  orderItem: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  orderDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  orderDetailText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
  },
  orderActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  actionButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xs,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  actionButtonText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.background,
  },
  secondaryButtonText: {
    color: theme.colors.primary,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.md,
  },
  emptyTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  emptySubtitle: {
    fontSize: theme.fontSize.base,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 100,
  },
});