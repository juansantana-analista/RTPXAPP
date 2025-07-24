import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Dimensions,
  StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const colors = {
  // Tema Escuro
  primary: '#4ECDC4',
  primaryLight: '#6EDCD4',
  primaryDark: '#44A08D',
  success: '#4ECDC4',
  warning: '#FFE66D',
  error: '#FF6B6B',
  info: '#A8E6CF',
  
  // Backgrounds escuros
  background: '#0a1f21',
  backgroundSecondary: '#133134',
  backgroundTertiary: '#1a4247',
  
  // Cards e superfícies
  surface: 'rgba(255, 255, 255, 0.05)',
  surfaceHigh: 'rgba(255, 255, 255, 0.1)',
  
  // Textos
  textPrimary: '#FFFFFF',
  textSecondary: '#9CA3AF',
  textTertiary: '#6B7280',
  
  // Bordas
  border: 'rgba(255, 255, 255, 0.1)',
  borderHigh: 'rgba(255, 255, 255, 0.2)',
};

const DashboardScreen = ({ onLogout }) => {
  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair da sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', style: 'destructive', onPress: onLogout }
      ]
    );
  };

  const portfolioData = [
    { name: 'Ações', value: 'R$ 125.430,00', percentage: '+12,5%', isPositive: true, color: colors.success, icon: 'trending-up' },
    { name: 'Renda Fixa', value: 'R$ 89.200,00', percentage: '+5,2%', isPositive: true, color: colors.warning, icon: 'shield-checkmark' },
    { name: 'Fundos', value: 'R$ 45.600,00', percentage: '+8,9%', isPositive: true, color: colors.info, icon: 'pie-chart' },
    { name: 'Cripto', value: 'R$ 15.320,00', percentage: '-2,1%', isPositive: false, color: colors.error, icon: 'logo-bitcoin' },
  ];

  const quickActions = [
    { icon: 'trending-up', label: 'Pagar', color: colors.success },
    { icon: 'swap-horizontal', label: 'Transferir', color: colors.primary },
    { icon: 'shield-checkmark', label: 'Segurança', color: colors.info },
    { icon: 'ellipsis-horizontal', label: 'Todos', color: colors.textSecondary },
  ];

  const recentTransactions = [
    {
      id: 1,
      type: 'buy',
      title: 'Compra PETR4',
      subtitle: 'Hoje, 14:30',
      amount: '-R$ 5.000,00',
      isPositive: false,
      icon: 'arrow-up-circle',
      color: colors.error
    },
    {
      id: 2,
      type: 'dividend',
      title: 'Dividendos ITUB4',
      subtitle: 'Ontem, 09:15',
      amount: '+R$ 250,00',
      isPositive: true,
      icon: 'cash',
      color: colors.success
    },
    {
      id: 3,
      type: 'withdrawal',
      title: 'Resgate CDB',
      subtitle: '23/07, 16:45',
      amount: '+R$ 10.000,00',
      isPositive: true,
      icon: 'card',
      color: colors.success
    },
  ];

  return (
    <LinearGradient
      colors={[colors.background, colors.backgroundSecondary, colors.backgroundTertiary]}
      style={styles.container}
    >
      {/* StatusBar personalizada */}
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={colors.background}
        translucent={false}
      />
      
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greetingText}>Boa tarde,</Text>
            <Text style={styles.nameText}>Igor Tonetti</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.notificationButton}>
              <View style={styles.notificationDot} />
              <Ionicons name="chatbubble-outline" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={styles.profileButton}>
              <Ionicons name="person-circle-outline" size={28} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Saldo Card */}
          <View style={styles.balanceSection}>
            <View style={styles.balanceCard}>
              <LinearGradient
                colors={['rgba(78, 205, 196, 0.1)', 'rgba(68, 160, 141, 0.05)']}
                style={styles.balanceGradient}
              >
                <View style={styles.balanceHeader}>
                  <View style={styles.currencyFlag}>
                    <Text style={styles.flagEmoji}>🇧🇷</Text>
                  </View>
                  <Text style={styles.currencyText}>Real</Text>
                  <View style={styles.balanceActions}>
                    <TouchableOpacity style={styles.eyeButton}>
                      <Ionicons name="eye-off" size={16} color={colors.textSecondary} />
                    </TouchableOpacity>
                    <View style={styles.usDollarFlag}>
                      <Text style={styles.flagEmoji}>🇺🇸</Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.balanceAmount}>
                  <Text style={styles.currencySymbol}>R$</Text>
                  <Text style={styles.hiddenAmount}>••••••</Text>
                </View>
                
                <TouchableOpacity style={styles.showBalanceButton}>
                  <Text style={styles.showBalanceText}>Exibir extrato</Text>
                  <Ionicons name="chevron-forward" size={16} color={colors.primary} />
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActionsSection}>
            <View style={styles.quickActionsGrid}>
              {quickActions.map((action, index) => (
                <TouchableOpacity key={index} style={styles.quickActionCard}>
                  <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}20` }]}>
                    <Ionicons name={action.icon} size={24} color={action.color} />
                  </View>
                  <Text style={styles.quickActionLabel}>{action.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Para Você Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Para Você</Text>
              <TouchableOpacity>
                <Text style={styles.seeMoreText}>Exibir menos</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.promoCard}>
              <View style={styles.promoContent}>
                <View style={styles.promoIcon}>
                  <Text style={styles.promoIconText}>RTX</Text>
                  <Text style={styles.promoSubtext}>Investment</Text>
                </View>
                <View style={styles.promoText}>
                  <Text style={styles.promoTitle}>Você, investidor do futuro</Text>
                  <Text style={styles.promoDescription}>
                    A RTX acompanha você em qualquer lugar: aproveite investimentos em ações, renda fixa e cripto.
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.promoButton}>
                <LinearGradient
                  colors={[colors.primary, colors.primaryDark]}
                  style={styles.promoButtonGradient}
                >
                  <Text style={styles.promoButtonText}>Investir Agora</Text>
                  <Ionicons name="arrow-forward" size={16} color={colors.textPrimary} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          {/* Portfolio Cards */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Meu Portfólio</Text>
            <View style={styles.portfolioGrid}>
              {portfolioData.map((item, index) => (
                <TouchableOpacity key={index} style={styles.portfolioCard}>
                  <View style={styles.portfolioHeader}>
                    <View style={[styles.portfolioIcon, { backgroundColor: `${item.color}20` }]}>
                      <Ionicons name={item.icon} size={20} color={item.color} />
                    </View>
                    <Text style={styles.portfolioName}>{item.name}</Text>
                  </View>
                  <Text style={styles.portfolioValue}>{item.value}</Text>
                  <View style={styles.portfolioChange}>
                    <Ionicons 
                      name={item.isPositive ? "trending-up" : "trending-down"} 
                      size={14} 
                      color={item.isPositive ? colors.success : colors.error} 
                    />
                    <Text style={[
                      styles.portfolioPercentage,
                      { color: item.isPositive ? colors.success : colors.error }
                    ]}>
                      {item.percentage}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Recent Transactions */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Transações Recentes</Text>
              <TouchableOpacity>
                <Text style={styles.seeMoreText}>Ver todas</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.transactionsCard}>
              {recentTransactions.map((transaction, index) => (
                <TouchableOpacity 
                  key={transaction.id} 
                  style={[
                    styles.transactionItem,
                    index !== recentTransactions.length - 1 && styles.transactionBorder
                  ]}
                >
                  <View style={styles.transactionLeft}>
                    <View style={[styles.transactionIcon, { backgroundColor: `${transaction.color}20` }]}>
                      <Ionicons name={transaction.icon} size={20} color={transaction.color} />
                    </View>
                    <View style={styles.transactionDetails}>
                      <Text style={styles.transactionTitle}>{transaction.title}</Text>
                      <Text style={styles.transactionSubtitle}>{transaction.subtitle}</Text>
                    </View>
                  </View>
                  <Text style={[
                    styles.transactionAmount,
                    { color: transaction.isPositive ? colors.success : colors.error }
                  ]}>
                    {transaction.amount}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Pix Section */}
          <View style={styles.pixSection}>
            <View style={styles.pixHeader}>
              <Ionicons name="diamond" size={24} color={colors.primary} />
              <Text style={styles.pixTitle}>Pix</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerLeft: {
    flex: 1,
  },
  greetingText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  nameText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
    zIndex: 1,
  },
  profileButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 140, // Mais espaço para a barra de navegação
  },
  balanceSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  balanceCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  balanceGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: colors.borderHigh,
    borderRadius: 16,
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  currencyFlag: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flagEmoji: {
    fontSize: 16,
  },
  currencyText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    flex: 1,
  },
  balanceActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  eyeButton: {
    padding: 4,
  },
  usDollarFlag: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceAmount: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  currencySymbol: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
    marginRight: 4,
  },
  hiddenAmount: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: 2,
  },
  showBalanceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  showBalanceText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '500',
  },
  quickActionsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  quickActionCard: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  seeMoreText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  promoCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  promoContent: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  promoIcon: {
    marginRight: 16,
    alignItems: 'center',
  },
  promoIconText: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.primary,
  },
  promoSubtext: {
    fontSize: 10,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  promoText: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  promoDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  promoButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  promoButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
  },
  promoButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  portfolioGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  portfolioCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    width: (width - 52) / 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  portfolioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  portfolioIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  portfolioName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  portfolioValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  portfolioChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  portfolioPercentage: {
    fontSize: 14,
    fontWeight: '600',
  },
  transactionsCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  transactionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  transactionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
  },
  pixSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  pixHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pixTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginLeft: 12,
  },
});

export default DashboardScreen;