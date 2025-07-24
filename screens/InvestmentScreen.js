import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
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

const InvestmentScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('acoes');
  const [amount, setAmount] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(null);

  const categories = [
    { id: 'acoes', name: 'Ações', icon: 'trending-up', color: colors.success },
    { id: 'renda_fixa', name: 'Renda Fixa', icon: 'shield-checkmark', color: colors.warning },
    { id: 'fundos', name: 'Fundos', icon: 'pie-chart', color: colors.info },
    { id: 'cripto', name: 'Cripto', icon: 'logo-bitcoin', color: colors.primary }
  ];

  const assets = {
    acoes: [
      { symbol: 'PETR4', name: 'Petrobras PN', price: 28.50, change: '+2.1%', isPositive: true },
      { symbol: 'VALE3', name: 'Vale ON', price: 65.40, change: '+1.8%', isPositive: true },
      { symbol: 'ITUB4', name: 'Itaú Unibanco PN', price: 32.80, change: '-0.5%', isPositive: false },
      { symbol: 'BBDC4', name: 'Bradesco PN', price: 13.25, change: '+0.8%', isPositive: true },
    ],
    renda_fixa: [
      { symbol: 'CDB', name: 'CDB 120% CDI', price: 1000.00, change: '+0.8%', isPositive: true },
      { symbol: 'LCI', name: 'LCI Isenta IR', price: 5000.00, change: '+0.6%', isPositive: true },
      { symbol: 'TESOURO', name: 'Tesouro Selic', price: 100.00, change: '+0.7%', isPositive: true },
    ],
    fundos: [
      { symbol: 'HASH11', name: 'Hashdex Nasdaq', price: 12.45, change: '+3.2%', isPositive: true },
      { symbol: 'BOVA11', name: 'iShares Bovespa', price: 98.30, change: '+1.5%', isPositive: true },
      { symbol: 'IVVB11', name: 'iShares S&P 500', price: 224.50, change: '+2.8%', isPositive: true },
    ],
    cripto: [
      { symbol: 'BTC', name: 'Bitcoin', price: 380000.00, change: '+5.2%', isPositive: true },
      { symbol: 'ETH', name: 'Ethereum', price: 16500.00, change: '+3.8%', isPositive: true },
      { symbol: 'SOL', name: 'Solana', price: 850.00, change: '+8.1%', isPositive: true },
    ]
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(value);
  };

  const calculateQuantity = () => {
    if (!selectedAsset || !amount) return 0;
    const numAmount = parseFloat(amount.replace(',', '.'));
    return (numAmount / selectedAsset.price).toFixed(selectedAsset.symbol === 'BTC' || selectedAsset.symbol === 'ETH' ? 6 : 2);
  };

  const handleInvest = () => {
    if (!selectedAsset || !amount || parseFloat(amount.replace(',', '.')) <= 0) {
      Alert.alert('Erro', 'Selecione um ativo e digite um valor válido');
      return;
    }

    const numAmount = parseFloat(amount.replace(',', '.'));
    Alert.alert(
      'Confirmar Investimento',
      `Investir ${formatCurrency(numAmount)} em ${selectedAsset.name}?\n\nQuantidade: ${calculateQuantity()} ${selectedAsset.symbol}`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Confirmar', 
          onPress: () => {
            Alert.alert('Sucesso', 'Ordem de investimento enviada!');
            setAmount('');
            setSelectedAsset(null);
          }
        }
      ]
    );
  };

  const renderAsset = (asset) => (
    <TouchableOpacity
      key={asset.symbol}
      style={[
        styles.assetCard,
        selectedAsset?.symbol === asset.symbol && styles.assetCardSelected
      ]}
      onPress={() => setSelectedAsset(asset)}
    >
      <View style={styles.assetHeader}>
        <View style={styles.assetLeft}>
          <View style={styles.assetIcon}>
            <Text style={styles.assetSymbolIcon}>
              {asset.symbol.substring(0, 2)}
            </Text>
          </View>
          <View style={styles.assetInfo}>
            <Text style={styles.assetName}>{asset.name}</Text>
            <Text style={styles.assetSymbolText}>{asset.symbol}</Text>
          </View>
        </View>
        <View style={styles.assetRight}>
          <Text style={styles.assetPrice}>{formatCurrency(asset.price)}</Text>
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
      </View>
      {selectedAsset?.symbol === asset.symbol && (
        <View style={styles.selectedIndicator}>
          <Ionicons name="checkmark-circle" size={20} color={colors.success} />
          <Text style={styles.selectedText}>Selecionado</Text>
        </View>
      )}
    </TouchableOpacity>
  );

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
          <Text style={styles.headerTitle}>Investir</Text>
          <TouchableOpacity style={styles.helpButton}>
            <Ionicons name="help-circle-outline" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Investment Amount Card */}
          <View style={styles.section}>
            <View style={styles.amountCard}>
              <LinearGradient
                colors={['rgba(78, 205, 196, 0.1)', 'rgba(68, 160, 141, 0.05)']}
                style={styles.amountGradient}
              >
                <Text style={styles.amountLabel}>Valor do Investimento</Text>
                <View style={styles.amountInputContainer}>
                  <Text style={styles.currencySymbol}>R$</Text>
                  <TextInput
                    style={styles.amountInput}
                    placeholder="0,00"
                    placeholderTextColor={colors.textTertiary}
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                  />
                </View>
                {selectedAsset && amount && (
                  <View style={styles.quantityContainer}>
                    <Text style={styles.quantityText}>
                      Quantidade: {calculateQuantity()} {selectedAsset.symbol}
                    </Text>
                  </View>
                )}
              </LinearGradient>
            </View>
          </View>

          {/* Category Selector */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Categorias</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesContainer}
            >
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryCard,
                    selectedCategory === category.id && styles.categoryCardSelected
                  ]}
                  onPress={() => {
                    setSelectedCategory(category.id);
                    setSelectedAsset(null);
                  }}
                >
                  <View style={[
                    styles.categoryIcon,
                    { backgroundColor: `${category.color}20` },
                    selectedCategory === category.id && { backgroundColor: category.color }
                  ]}>
                    <Ionicons 
                      name={category.icon} 
                      size={24} 
                      color={selectedCategory === category.id ? colors.textPrimary : category.color} 
                    />
                  </View>
                  <Text style={[
                    styles.categoryName,
                    selectedCategory === category.id && styles.categoryNameSelected
                  ]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Assets List */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {categories.find(c => c.id === selectedCategory)?.name}
            </Text>
            <View style={styles.assetsList}>
              {assets[selectedCategory]?.map(renderAsset)}
            </View>
          </View>

          {/* Quick Amount Buttons */}
          {selectedAsset && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Valores Rápidos</Text>
              <View style={styles.quickAmounts}>
                {['100', '500', '1000', '5000'].map((value) => (
                  <TouchableOpacity
                    key={value}
                    style={styles.quickAmountButton}
                    onPress={() => setAmount(value)}
                  >
                    <Text style={styles.quickAmountText}>R$ {value}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Investment Summary */}
          {selectedAsset && amount && (
            <View style={styles.section}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>Resumo do Investimento</Text>
                <View style={styles.summaryContent}>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Ativo:</Text>
                    <Text style={styles.summaryValue}>{selectedAsset.name}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Valor:</Text>
                    <Text style={styles.summaryValue}>
                      {formatCurrency(parseFloat(amount.replace(',', '.')) || 0)}
                    </Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Preço unitário:</Text>
                    <Text style={styles.summaryValue}>{formatCurrency(selectedAsset.price)}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Quantidade:</Text>
                    <Text style={styles.summaryValue}>{calculateQuantity()} {selectedAsset.symbol}</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Investment Button */}
        {selectedAsset && amount && (
          <View style={styles.investButtonContainer}>
            <TouchableOpacity 
              style={styles.investButton}
              onPress={handleInvest}
            >
              <LinearGradient
                colors={[colors.success, colors.primaryDark]}
                style={styles.investButtonGradient}
              >
                <Ionicons name="trending-up" size={20} color={colors.textPrimary} />
                <Text style={styles.investButtonText}>
                  Investir {formatCurrency(parseFloat(amount.replace(',', '.')) || 0)}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
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
  helpButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 24, // Espaço do primeiro card em relação ao header
    paddingBottom: 140, // Espaço para a barra de navegação
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  amountCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  amountGradient: {
    padding: 24,
    borderWidth: 1,
    borderColor: colors.borderHigh,
    borderRadius: 16,
  },
  amountLabel: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 16,
    fontWeight: '500',
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  currencySymbol: {
    fontSize: 32,
    color: colors.textPrimary,
    fontWeight: '700',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 32,
    color: colors.textPrimary,
    fontWeight: '700',
    padding: 0,
  },
  quantityContainer: {
    backgroundColor: 'rgba(78, 205, 196, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
  },
  quantityText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  categoriesContainer: {
    paddingRight: 20,
    gap: 12,
  },
  categoryCard: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: 100,
  },
  categoryCardSelected: {
    backgroundColor: colors.surfaceHigh,
    borderColor: colors.borderHigh,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  categoryNameSelected: {
    color: colors.primary,
  },
  assetsList: {
    gap: 12,
  },
  assetCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  assetCardSelected: {
    backgroundColor: colors.surfaceHigh,
    borderWidth: 2,
    borderColor: colors.success,
  },
  assetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  assetLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  assetIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceHigh,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  assetSymbolIcon: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  assetInfo: {
    flex: 1,
  },
  assetName: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 2,
  },
  assetSymbolText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  assetRight: {
    alignItems: 'flex-end',
  },
  assetPrice: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: '700',
    marginBottom: 4,
  },
  assetChangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  assetChange: {
    fontSize: 14,
    fontWeight: '600',
  },
  selectedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  selectedText: {
    fontSize: 14,
    color: colors.success,
    marginLeft: 8,
    fontWeight: '600',
  },
  quickAmounts: {
    flexDirection: 'row',
    gap: 8,
  },
  quickAmountButton: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  quickAmountText: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryTitle: {
    fontSize: 18,
    color: colors.textPrimary,
    fontWeight: '700',
    marginBottom: 16,
  },
  summaryContent: {
    gap: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  investButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  investButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  investButtonGradient: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  investButtonText: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
});

export default InvestmentScreen;