import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
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

const PortfolioScreen = ({ navigation }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('1M');

  const periods = ['1D', '1S', '1M', '3M', '6M', '1A'];

  const portfolioData = [
    { 
      name: 'Ações', 
      value: 125430.00, 
      percentage: 12.5, 
      color: colors.success,
      allocation: 45.5,
      icon: 'trending-up',
      assets: [
        { symbol: 'PETR4', name: 'Petrobras PN', value: 45320.00, change: '+8.2%', isPositive: true },
        { symbol: 'VALE3', name: 'Vale ON', value: 38150.00, change: '+12.4%', isPositive: true },
        { symbol: 'ITUB4', name: 'Itaú Unibanco PN', value: 28960.00, change: '-2.1%', isPositive: false },
        { symbol: 'BBDC4', name: 'Bradesco PN', value: 13000.00, change: '+5.7%', isPositive: true }
      ]
    },
    { 
      name: 'Renda Fixa', 
      value: 89200.00, 
      percentage: 5.2, 
      color: colors.warning,
      allocation: 32.4,
      icon: 'shield-checkmark',
      assets: [
        { symbol: 'CDB', name: 'CDB Banco Inter', value: 45000.00, change: '+0.8%', isPositive: true },
        { symbol: 'LCI', name: 'LCI Bradesco', value: 25000.00, change: '+0.6%', isPositive: true },
        { symbol: 'TESOURO', name: 'Tesouro Selic', value: 19200.00, change: '+0.7%', isPositive: true }
      ]
    },
    { 
      name: 'Fundos', 
      value: 45600.00, 
      percentage: 8.9, 
      color: colors.info,
      allocation: 16.5,
      icon: 'pie-chart',
      assets: [
        { symbol: 'HASH11', name: 'Hashdex Nasdaq', value: 25600.00, change: '+15.2%', isPositive: true },
        { symbol: 'BOVA11', name: 'iShares Bovespa', value: 20000.00, change: '+7.8%', isPositive: true }
      ]
    },
    { 
      name: 'Cripto', 
      value: 15320.00, 
      percentage: -2.1, 
      color: colors.primary,
      allocation: 5.6,
      icon: 'logo-bitcoin',
      assets: [
        { symbol: 'BTC', name: 'Bitcoin', value: 12320.00, change: '-3.2%', isPositive: false },
        { symbol: 'ETH', name: 'Ethereum', value: 3000.00, change: '+1.5%', isPositive: true }
      ]
    }
  ];

  const totalValue = portfolioData.reduce((sum, item) => sum + item.value, 0);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const renderChart = () => {
    return (
      <View style={styles.chartContainer}>
        <View style={styles.chartPlaceholder}>
          <Ionicons name="pie-chart" size={80} color={colors.primary} />
          <Text style={styles.chartText}>Gráfico de Alocação</Text>
        </View>
        
        {/* Legend */}
        <View style={styles.chartLegend}>
          {portfolioData.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: item.color }]} />
              <Text style={styles.legendText}>{item.name}</Text>
              <Text style={styles.legendValue}>{item.allocation}%</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={[colors.background, colors.backgroundSecondary, colors.backgroundTertiary]}
      style={styles.container}
    >
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={colors.background}
        translucent={false}
      />
      
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Meu Portfólio</Text>
          <TouchableOpacity style={styles.menuButton}>
            <Ionicons name="ellipsis-vertical" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Performance Card */}
          <View style={styles.section}>
            <View style={styles.performanceCard}>
              <LinearGradient
                colors={['rgba(78, 205, 196, 0.1)', 'rgba(68, 160, 141, 0.05)']}
                style={styles.performanceGradient}
              >
                <Text style={styles.performanceLabel}>Valor Total do Portfólio</Text>
                <Text style={styles.performanceValue}>{formatCurrency(totalValue)}</Text>
                <View style={styles.performanceChange}>
                  <View style={styles.performanceChangeIcon}>
                    <Ionicons name="trending-up" size={16} color={colors.success} />
                  </View>
                  <Text style={styles.performanceChangeText}>+R$ 24.850 (+9,9%) este mês</Text>
                </View>
              </LinearGradient>
            </View>
          </View>

          {/* Period Selector */}
          <View style={styles.section}>
            <View style={styles.periodSelector}>
              {periods.map((period) => (
                <TouchableOpacity
                  key={period}
                  style={[
                    styles.periodButton,
                    selectedPeriod === period && styles.periodButtonActive
                  ]}
                  onPress={() => setSelectedPeriod(period)}
                >
                  <Text style={[
                    styles.periodButtonText,
                    selectedPeriod === period && styles.periodButtonTextActive
                  ]}>
                    {period}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Chart Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Alocação por Categoria</Text>
            {renderChart()}
          </View>

          {/* Assets by Category */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Detalhes por Categoria</Text>
            <View style={styles.categoriesContainer}>
              {portfolioData.map((category, categoryIndex) => (
                <View key={categoryIndex} style={styles.categoryCard}>
                  <TouchableOpacity style={styles.categoryHeader}>
                    <View style={styles.categoryLeft}>
                      <View style={[styles.categoryIcon, { backgroundColor: `${category.color}20` }]}>
                        <Ionicons name={category.icon} size={24} color={category.color} />
                      </View>
                      <View style={styles.categoryInfo}>
                        <Text style={styles.categoryName}>{category.name}</Text>
                        <Text style={styles.categoryValue}>{formatCurrency(category.value)}</Text>
                      </View>
                    </View>
                    <View style={styles.categoryRight}>
                      <Text style={styles.categoryAllocation}>{category.allocation}%</Text>
                      <View style={styles.categoryChangeContainer}>
                        <Ionicons 
                          name={category.percentage >= 0 ? "trending-up" : "trending-down"} 
                          size={12} 
                          color={category.percentage >= 0 ? colors.success : colors.error} 
                        />
                        <Text style={[
                          styles.categoryPercentage,
                          { color: category.percentage >= 0 ? colors.success : colors.error }
                        ]}>
                          {category.percentage >= 0 ? '+' : ''}{category.percentage}%
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  {/* Assets List */}
                  <View style={styles.assetsList}>
                    {category.assets.map((asset, assetIndex) => (
                      <TouchableOpacity key={assetIndex} style={styles.assetItem}>
                        <View style={styles.assetLeft}>
                          <View style={styles.assetIcon}>
                            <Text style={styles.assetSymbol}>{asset.symbol}</Text>
                          </View>
                          <View style={styles.assetInfo}>
                            <Text style={styles.assetName}>{asset.name}</Text>
                            <Text style={styles.assetSymbolText}>{asset.symbol}</Text>
                          </View>
                        </View>
                        <View style={styles.assetRight}>
                          <Text style={styles.assetValue}>{formatCurrency(asset.value)}</Text>
                          <View style={styles.assetChangeContainer}>
                            <Ionicons 
                              name={asset.isPositive ? "trending-up" : "trending-down"} 
                              size={12} 
                              color={asset.isPositive ? colors.success : colors.error} 
                            />
                            <Text style={[
                              styles.assetChange,
                              { color: asset.isPositive ? colors.success : colors.error }
                            ]}>
                              {asset.change}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.section}>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButtonPrimary}>
                <LinearGradient
                  colors={[colors.success, colors.primaryDark]}
                  style={styles.actionButtonGradient}
                >
                  <Ionicons name="add" size={20} color={colors.textPrimary} />
                  <Text style={styles.actionButtonPrimaryText}>Investir</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButtonSecondary}>
                <Ionicons name="swap-horizontal" size={20} color={colors.primary} />
                <Text style={styles.actionButtonSecondaryText}>Rebalancear</Text>
              </TouchableOpacity>
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
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  menuButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 24, // Espaço do primeiro card em relação ao header
    paddingBottom: 140, // Espaço para a barra de navegação e botões
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  performanceCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  performanceGradient: {
    padding: 24,
    borderWidth: 1,
    borderColor: colors.borderHigh,
    borderRadius: 16,
  },
  performanceLabel: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 8,
    fontWeight: '500',
  },
  performanceValue: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  performanceChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  performanceChangeIcon: {
    backgroundColor: 'rgba(78, 205, 196, 0.2)',
    borderRadius: 12,
    padding: 4,
    marginRight: 8,
  },
  performanceChangeText: {
    fontSize: 14,
    color: colors.success,
    fontWeight: '600',
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  periodButtonActive: {
    backgroundColor: colors.primary,
  },
  periodButtonText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  periodButtonTextActive: {
    color: colors.textPrimary,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  chartContainer: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chartPlaceholder: {
    alignItems: 'center',
    marginBottom: 24,
  },
  chartText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 12,
    fontWeight: '500',
  },
  chartLegend: {
    width: '100%',
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  legendValue: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  categoriesContainer: {
    gap: 16,
  },
  categoryCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: '700',
    marginBottom: 2,
  },
  categoryValue: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  categoryRight: {
    alignItems: 'flex-end',
  },
  categoryAllocation: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: '700',
    marginBottom: 4,
  },
  categoryChangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  categoryPercentage: {
    fontSize: 14,
    fontWeight: '600',
  },
  assetsList: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  assetItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  assetLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  assetIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceHigh,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  assetSymbol: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '700',
  },
  assetInfo: {
    flex: 1,
  },
  assetName: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 2,
  },
  assetSymbolText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  assetRight: {
    alignItems: 'flex-end',
  },
  assetValue: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 4,
  },
  assetChangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  assetChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20, // Margem extra para evitar corte
  },
  actionButtonPrimary: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    height: 56, // Altura fixa para igualar os botões
  },
  actionButtonGradient: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: '100%', // Ocupa toda a altura do container
  },
  actionButtonPrimaryText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  actionButtonSecondary: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: colors.primary,
    height: 56, // Altura fixa igual ao primary
  },
  actionButtonSecondaryText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default PortfolioScreen;