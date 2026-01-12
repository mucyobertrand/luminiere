import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, MapPin, CreditCard, Clock, CheckCircle } from 'lucide-react-native';
import { router } from 'expo-router';
import { theme } from '@/constants/theme';
import { GlassCard } from '@/components/GlassCard';
import { useCart } from '@/hooks/useCart';

export default function CheckoutScreen() {
  const { items, totalAmount, clearCart } = useCart();
  const [orderType, setOrderType] = useState<'delivery' | 'dine-in' | 'pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const deliveryFee = orderType === 'delivery' ? 5.99 : 0;
  const tax = totalAmount * 0.08;
  const finalTotal = totalAmount + deliveryFee + tax;

  const handlePlaceOrder = () => {
    Alert.alert(
      'Order Placed!',
      'Your order has been placed successfully. You will receive a confirmation shortly.',
      [
        {
          text: 'OK',
          onPress: () => {
            clearCart();
            router.replace('/(tabs)/orders');
          },
        },
      ]
    );
  };

  return (
    <LinearGradient
      colors={[theme.colors.background, theme.colors.surface]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Checkout</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Order Type */}
          <GlassCard style={styles.section}>
            <Text style={styles.sectionTitle}>Order Type</Text>
            <View style={styles.orderTypeContainer}>
              {[
                { key: 'delivery', label: 'Delivery', icon: MapPin },
                { key: 'dine-in', label: 'Dine In', icon: Clock },
                { key: 'pickup', label: 'Pickup', icon: CheckCircle },
              ].map(({ key, label, icon: Icon }) => (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.orderTypeButton,
                    orderType === key && styles.orderTypeButtonActive,
                  ]}
                  onPress={() => setOrderType(key as any)}
                >
                  <Icon
                    size={20}
                    color={orderType === key ? theme.colors.primary : theme.colors.textMuted}
                  />
                  <Text
                    style={[
                      styles.orderTypeText,
                      orderType === key && styles.orderTypeTextActive,
                    ]}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </GlassCard>

          {/* Delivery Address */}
          {orderType === 'delivery' && (
            <GlassCard style={styles.section}>
              <Text style={styles.sectionTitle}>Delivery Address</Text>
              <View style={styles.addressContainer}>
                <MapPin size={20} color={theme.colors.primary} />
                <View style={styles.addressText}>
                  <Text style={styles.addressTitle}>Home</Text>
                  <Text style={styles.addressDetails}>123 Main St, New York, NY 10001</Text>
                </View>
                <TouchableOpacity>
                  <Text style={styles.changeText}>Change</Text>
                </TouchableOpacity>
              </View>
            </GlassCard>
          )}

          {/* Payment Method */}
          <GlassCard style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            <View style={styles.paymentContainer}>
              <CreditCard size={20} color={theme.colors.primary} />
              <View style={styles.paymentText}>
                <Text style={styles.paymentTitle}>•••• •••• •••• 1234</Text>
                <Text style={styles.paymentDetails}>Visa ending in 1234</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>
          </GlassCard>

          {/* Order Summary */}
          <GlassCard style={styles.section}>
            <Text style={styles.sectionTitle}>Order Summary</Text>
            
            {items.map((item) => (
              <View key={item.id} style={styles.orderItem}>
                <Text style={styles.orderItemName}>
                  {item.quantity}x {item.menuItem.name}
                </Text>
                <Text style={styles.orderItemPrice}>
                  ${(item.menuItem.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            ))}

            <View style={styles.summaryDivider} />
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${totalAmount.toFixed(2)}</Text>
            </View>
            
            {orderType === 'delivery' && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery Fee</Text>
                <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
              </View>
            )}
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax</Text>
              <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
            </View>
            
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${finalTotal.toFixed(2)}</Text>
            </View>
          </GlassCard>

          <View style={styles.bottomSpacing} />
        </ScrollView>

        {/* Place Order Button */}
        <View style={styles.checkoutContainer}>
          <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
            <Text style={styles.placeOrderButtonText}>
              Place Order • ${finalTotal.toFixed(2)}
            </Text>
          </TouchableOpacity>
        </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.glass,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: theme.fontSize['2xl'],
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  placeholder: {
    width: 44,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  orderTypeContainer: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  orderTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    gap: theme.spacing.xs,
  },
  orderTypeButtonActive: {
    backgroundColor: theme.colors.glassStrong,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  orderTypeText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.textMuted,
  },
  orderTypeTextActive: {
    color: theme.colors.text,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
  addressTitle: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
  },
  addressDetails: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  changeText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.medium,
  },
  paymentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentText: {
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
  paymentTitle: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
  },
  paymentDetails: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  orderItemName: {
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
    flex: 1,
  },
  orderItemPrice: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  summaryLabel: {
    fontSize: theme.fontSize.base,
    color: theme.colors.textSecondary,
  },
  summaryValue: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  totalLabel: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  totalValue: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
  },
  checkoutContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
  },
  placeOrderButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    ...theme.shadows.lg,
  },
  placeOrderButtonText: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.background,
  },
  bottomSpacing: {
    height: 20,
  },
});