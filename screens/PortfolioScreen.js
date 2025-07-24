import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const PortfolioScreen = ({ navigation }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('1M');

  const periods = ['1D', '1S', '1M', '3M', '6M', '1A'];

  const portfolioData = [
    { 
      name: 'Ações', 
      value: 125430.00, 
      percentage: 12.5, 
      color: '#4ECDC4',
      allocation: 45.5,
      assets: [
        { symbol: 'PETR4', name: 'Petrobras PN', value: 'R$ 45.320,00', change: '+8.2%' },
        { symbol: 'VALE3', name: 'Vale ON', value: 'R$ 38.150,00', change: '+12.4%' },
        { symbol: 'ITUB4', name: 'Itaú Unibanco PN', value: 'R$ 28.960,00', change: '-2.1%' },
        { symbol: 'BBDC4', name: 'Bradesco PN', value: 'R$ 13.000,00', change: '+5.7%' }
      ]
    },
    { 
      name: 'Renda Fixa', 
      value: 89200.00, 
      percentage: 5.2, 
      color: '#FFE66D',
      allocation: 32.4,
      assets: [
        { symbol: 'CDB', name: 'CDB Banco Inter', value: 'R$ 45.000,00', change: '+0.8%' },
        { symbol: 'LCI', name: 'LCI Bradesco', value: 'R$ 25.000,00', change: '+0.6%' },
        { symbol: 'TESOURO', name: 'Tesouro Selic', value: 'R$ 19.200,00', change: '+0.7%' }
      ]
    },
    { 
      name: 'Fundos', 
      value: 45600.00, 
      percentage: 8.9, 
      color: '#FF6B6B',
      allocation: 16.5,
      assets: [
        { symbol: 'HASH11', name: 'Hashdex Nasdaq', value: 'R$ 25.600,00', change: '+15.2%' },
        { symbol: 'BOVA11', name: 'iShares Bovespa', value: 'R$ 20.000,00', change: '+7.8%' }
      ]
    },
    { 
      name: 'Cripto', 
      value: 15320.00, 
      percentage: -2.1, 
      color: '#A8E6CF',
      allocation: 5.6,
      assets: [
        { symbol: 'BTC', name: 'Bitcoin', value: 'R$ 12.320,00', change: '-3.2%' },
        { symbol: 'ETH', name: 'Ethereum', value: 'R$ 3.000,00', change: '+1.5%' }
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

  const renderPieChart = () => {
    const center = 60;
    const radius = 50;
    let cumulativePercentage = 0;

    return (
      <View style={styles.pieChartContainer}>
        <View style={styles.pieChart}>
          {portfolioData.map((item, index) => {
            const percentage = item.allocation;
            const angle = (percentage / 100) * 360;
            const startAngle = (cumulativePercentage / 100) * 360;
            cumulativePercentage += percentage;

            return (
              <View
                key={index}
                style={[
                  styles.pieSlice,
                  {
                    backgroundColor: item.color,
                    transform: [
                      { rotate: `${startAngle}deg` },
                    ],
                  },
                ]}
              />
            );
          })}
          <View style={styles.pieChartCenter}>
            <Text style={styles.pieChartText}>Total</Text>
            <Text style={styles.pieChartValue}>{formatCurrency(totalValue)}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#0a1f21', '#133134', '#1a4247']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Meu Portfólio</Text>
          <TouchableOpacity style={styles.menuButton}>
            <Ionicons name="ellipsis-vertical" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Performance Card */}
          <View style={styles.performanceCard}>
            <LinearGradient
              colors={['rgba(78, 205, 196, 0.1)', 'rgba(68, 160, 141, 0.05)']}
              style={styles.performanceGradient}
            >
              <Text style={styles.performanceLabel}>Valor Total do Portfólio</Text>
              <Text style={styles.performanceValue}>{formatCurrency(totalValue)}</Text>
              <View style={styles.performanceChange}>
                <Ionicons name="trending-up" size={16} color="#4ECDC4" />
                <Text style={styles.performanceChangeText}>+R$ 24.850 (+9,9%) este mês</Text>
              </View>
            </LinearGradient>
          </View>

          {/* Period Selector */}
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

          {/* Chart Section */}
          <View style={styles.chartSection}>
            <Text style={styles.sectionTitle}>Alocação por Categoria</Text>
            {renderPieChart()}
          </View>

          {/* Assets by Category */}
          <View style={styles.assetsSection}>
            <Text style={styles.sectionTitle}>Detalhes por Categoria</Text>
            {portfolioData.map((category, categoryIndex) => (
              <View key={categoryIndex} style={styles.categoryCard}>
                <TouchableOpacity style={styles.categoryHeader}>
                  <View style={styles.categoryLeft}>
                    <View style={[styles.categoryIcon, { backgroundColor: `${category.color}20` }]}>
                      <View style={[styles.categoryDot, { backgroundColor: category.color }]} />
                    </View>
                    <View>
                      <Text style={styles.categoryName}>{category.name}</Text>
                      <Text style={styles.categoryValue}>{formatCurrency(category.value)}</Text>
                    </View>
                  </View>
                  <View style={styles.categoryRight}>
                    <Text style={styles.categoryAllocation}>{category.allocation}%</Text>
                    <Text style={[
                      styles.categoryPercentage,
                      { color: category.percentage >= 0 ? '#4ECDC4' : '#FF6B6B' }
                    ]}>
                      {category.percentage >= 0 ? '+' : ''}{category.percentage}%
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* Assets List */}
                <View style={styles.assetsList}>
                  {category.assets.map((asset, assetIndex) => (
                    <TouchableOpacity key={assetIndex} style={styles.assetItem}>
                      <View style={styles.assetLeft}>
                        <Text style={styles.assetSymbol}>{asset.symbol}</Text>
                        <Text style={styles.assetName}>{asset.name}</Text>
                      </View>
                      <View style={styles.assetRight}>
                        <Text style={styles.assetValue}>{asset.value}</Text>
                        <Text style={[
                          styles.assetChange,
                          { color: asset.change.includes('-') ? '#FF6B6B' : '#4ECDC4' }
                        ]}>
                          {asset.change}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <LinearGradient
                colors={['#4ECDC4', '#44A08D']}
                style={styles.actionButtonGradient}
              >
                <Ionicons name="add" size={20} color="#FFFFFF" />
                <Text style={styles.actionButtonText}>Investir</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionButton, styles.actionButtonSecondary]}>
              <View style={styles.actionButtonSecondaryContent}>
                <Ionicons name="swap-horizontal" size={20} color="#4ECDC4" />
                <Text style={styles.actionButtonSecondaryText}>Rebalancear</Text>
              </View>
            </TouchableOpacity>
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
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  menuButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  performanceCard: {
    marginVertical: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  performanceGradient: {
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(78, 205, 196, 0.2)',
    borderRadius: 16,
  },
  performanceLabel: {
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  performanceValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  performanceChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  performanceChangeText: {
    fontSize: 14,
    color: '#4ECDC4',
    marginLeft: 4,
  },
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  periodButtonActive: {
    backgroundColor: '#4ECDC4',
  },
  periodButtonText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  periodButtonTextActive: {
    color: '#FFFFFF',
  },
  chartSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  pieChartContainer: {
    alignItems: 'center',
  },
  pieChart: {
    width: 120,
    height: 120,
    borderRadius: 60,
    position: 'relative',
    backgroundColor: '#1a4247',
  },
  pieChartCenter: {
    position: 'absolute',
    top: 30,
    left: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#133134',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pieChartText: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  pieChartValue: {
    fontSize: 8,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  assetsSection: {
    marginBottom: 32,
  },
  categoryCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
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
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  categoryName: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  categoryValue: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 2,
  },
  categoryRight: {
    alignItems: 'flex-end',
  },
  categoryAllocation: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  categoryPercentage: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 2,
  },
  assetsList: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  assetItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  assetLeft: {
    flex: 1,
  },
  assetSymbol: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  assetName: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  assetRight: {
    alignItems: 'flex-end',
  },
  assetValue: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  assetChange: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  actionButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  actionButtonSecondary: {
    borderWidth: 1,
    borderColor: '#4ECDC4',
  },
  actionButtonSecondaryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  actionButtonSecondaryText: {
    color: '#4ECDC4',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PortfolioScreen;