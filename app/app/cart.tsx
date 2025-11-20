import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Plus, Minus, Trash2 } from 'lucide-react-native';
import { router } from 'expo-router';
import { theme } from '@/constants/theme';
import { GlassCard } from '@/components/GlassCard';
import { useCart } from '@/hooks/useCart';

export default function CartScreen() {
  const { items, totalAmount, updateQuantity, removeItem, clearCart } = useCart();

  const deliveryFee = 5.99;
  const tax = totalAmount * 0.08;
  const finalTotal = totalAmount + deliveryFee + tax;

  const handleCheckout = () => {
    router.push('/checkout');
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
          <Text style={styles.title}>Your Cart</Text>
          {items.length > 0 && (
            <TouchableOpacity onPress={clearCart}>
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>

        {items.length === 0 ? (
          <View style={styles.emptyCart}>
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptySubtitle}>Add some delicious items to get started</Text>
            <TouchableOpacity
              style={styles.browseButton}
              onPress={() => router.push('/(tabs)/menu')}
            >
              <Text style={styles.browseButtonText}>Browse Menu</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
              {/* Cart Items */}
              {items.map((item) => (
                <GlassCard key={item.id} style={styles.cartItem}>
                  <View style={styles.itemContent}>
                    <Image source={{ uri: item.menuItem.image }} style={styles.itemImage} />
                    
                    <View style={styles.itemDetails}>
                      <Text style={styles.itemName}>{item.menuItem.name}</Text>
                      <Text style={styles.itemPrice}>${item.menuItem.price}</Text>
                      
                      {item.customizations.length > 0 && (
                        <Text style={styles.customizations}>
                          {item.customizations.join(', ')}
                        </Text>
                      )}
                    </View>

                    <View style={styles.itemActions}>
                      <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => removeItem(item.id)}
                      >
                        <Trash2 size={16} color={theme.colors.error} />
                      </TouchableOpacity>
                      
                      <View style={styles.quantityControls}>
                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus size={16} color={theme.colors.text} />
                        </TouchableOpacity>
                        
                        <Text style={styles.quantity}>{item.quantity}</Text>
                        
                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={16} color={theme.colors.text} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </GlassCard>
              ))}

              {/* Order Summary */}
              <GlassCard style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>Order Summary</Text>
                
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Subtotal</Text>
                  <Text style={styles.summaryValue}>${totalAmount.toFixed(2)}</Text>
                </View>
                
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Delivery Fee</Text>
                  <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
                </View>
                
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

            {/* Checkout Button */}
            <View style={styles.checkoutContainer}>
              <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                <Text style={styles.checkoutButtonText}>
                  Proceed to Checkout • ${finalTotal.toFixed(2)}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
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
    flex: 1,
    textAlign: 'center',
  },
  clearText: {
    fontSize: theme.fontSize.base,
    color: theme.colors.error,
    fontWeight: theme.fontWeight.medium,
  },
  scrollView: {
    flex: 1,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  emptyTitle: {
    fontSize: theme.fontSize['2xl'],
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  emptySubtitle: {
    fontSize: theme.fontSize.base,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  browseButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  browseButtonText: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.background,
  },
  cartItem: {
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.md,
    marginRight: theme.spacing.md,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
    marginBottom: 4,
  },
  customizations: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
  },
  itemActions: {
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  removeButton: {
    padding: theme.spacing.xs,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: 4,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.glass,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
    paddingHorizontal: theme.spacing.md,
  },
  summaryCard: {
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  summaryTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
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
  checkoutButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    ...theme.shadows.lg,
  },
  checkoutButtonText: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.background,
  },
  bottomSpacing: {
    height: 20,
  },
});