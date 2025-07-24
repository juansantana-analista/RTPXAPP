import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const InvestmentScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('acoes');
  const [amount, setAmount] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(null);

  const categories = [
    { id: 'acoes', name: 'Ações', icon: 'trending-up', color: '#4ECDC4' },
    { id: 'renda_fixa', name: 'Renda Fixa', icon: 'shield', color: '#FFE66D' },
    { id: 'fundos', name: 'Fundos', icon: 'pie-chart', color: '#FF6B6B' },
    { id: 'cripto', name: 'Cripto', icon: 'logo-bitcoin', color: '#A8E6CF' }
  ];

  const assets = {
    acoes: [
      { symbol: 'PETR4', name: 'Petrobras PN', price: 28.50, change: '+2.1%', color: '#4ECDC4' },
      { symbol: 'VALE3', name: 'Vale ON', price: 65.40, change: '+1.8%', color: '#4ECDC4' },
      { symbol: 'ITUB4', name: 'Itaú Unibanco PN', price: 32.80, change: '-0.5%', color: '#FF6B6B' },
      { symbol: 'BBDC4', name: 'Bradesco PN', price: 13.25, change: '+0.8%', color: '#4ECDC4' },
      { symbol: 'ABEV3', name: 'Ambev ON', price: 12.90, change: '+1.2%', color: '#4ECDC4' },
    ],
    renda_fixa: [
      { symbol: 'CDB', name: 'CDB 120% CDI', price: 1000.00, change: '+0.8%', color: '#FFE66D' },
      { symbol: 'LCI', name: 'LCI Isenta IR', price: 5000.00, change: '+0.6%', color: '#FFE66D' },
      { symbol: 'TESOURO', name: 'Tesouro Selic', price: 100.00, change: '+0.7%', color: '#FFE66D' },
      { symbol: 'DEBENTURE', name: 'Debênture IPCA+', price: 1000.00, change: '+1.1%', color: '#FFE66D' },
    ],
    fundos: [
      { symbol: 'HASH11', name: 'Hashdex Nasdaq', price: 12.45, change: '+3.2%', color: '#FF6B6B' },
      { symbol: 'BOVA11', name: 'iShares Bovespa', price: 98.30, change: '+1.5%', color: '#FF6B6B' },
      { symbol: 'IVVB11', name: 'iShares S&P 500', price: 224.50, change: '+2.8%', color: '#FF6B6B' },
      { symbol: 'XPLG11', name: 'XP Log FII', price: 105.20, change: '+0.9%', color: '#FF6B6B' },
    ],
    cripto: [
      { symbol: 'BTC', name: 'Bitcoin', price: 380000.00, change: '+5.2%', color: '#A8E6CF' },
      { symbol: 'ETH', name: 'Ethereum', price: 16500.00, change: '+3.8%', color: '#A8E6CF' },
      { symbol: 'SOL', name: 'Solana', price: 850.00, change: '+8.1%', color: '#A8E6CF' },
      { symbol: 'ADA', name: 'Cardano', price: 2.45, change: '+2.3%', color: '#A8E6CF' },
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
    return (parseFloat(amount) / selectedAsset.price).toFixed(selectedAsset.symbol === 'BTC' || selectedAsset.symbol === 'ETH' ? 6 : 2);
  };

  const handleInvest = () => {
    if (!selectedAsset || !amount || parseFloat(amount) <= 0) {
      Alert.alert('Erro', 'Selecione um ativo e digite um valor válido');
      return;
    }

    Alert.alert(
      'Confirmar Investimento',
      `Investir ${formatCurrency(parseFloat(amount))} em ${selectedAsset.name}?\n\nQuantidade: ${calculateQuantity()} ${selectedAsset.symbol}`,
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
          <View style={[styles.assetIcon, { backgroundColor: `${asset.color}20` }]}>
            <Text style={[styles.assetSymbol, { color: asset.color }]}>
              {asset.symbol.substring(0, 2)}
            </Text>
          </View>
          <View>
            <Text style={styles.assetName}>{asset.name}</Text>
            <Text style={styles.assetSymbolText}>{asset.symbol}</Text>
          </View>
        </View>
        <View style={styles.assetRight}>
          <Text style={styles.assetPrice}>{formatCurrency(asset.price)}</Text>
          <Text style={[
            styles.assetChange,
            { color: asset.change.includes('-') ? '#FF6B6B' : '#4ECDC4' }
          ]}>
            {asset.change}
          </Text>
        </View>
      </View>
      {selectedAsset?.symbol === asset.symbol && (
        <View style={styles.selectedIndicator}>
          <Ionicons name="checkmark-circle" size={20} color="#4ECDC4" />
          <Text style={styles.selectedText}>Selecionado</Text>
        </View>
      )}
    </TouchableOpacity>
  );

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
          <Text style={styles.headerTitle}>Investir</Text>
          <TouchableOpacity style={styles.helpButton}>
            <Ionicons name="help-circle-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Investment Amount */}
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
                  placeholderTextColor="#6B7280"
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="numeric"
                />
              </View>
              {selectedAsset && amount && (
                <Text style={styles.quantityText}>
                  Quantidade: {calculateQuantity()} {selectedAsset.symbol}
                </Text>
              )}
            </LinearGradient>
          </View>

          {/* Category Selector */}
          <View style={styles.categorySection}>
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
                      color={selectedCategory === category.id ? '#FFFFFF' : category.color} 
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
          <View style={styles.assetsSection}>
            <Text style={styles.sectionTitle}>
              {categories.find(c => c.id === selectedCategory)?.name}
            </Text>
            <View style={styles.assetsList}>
              {assets[selectedCategory]?.map(renderAsset)}
            </View>
          </View>

          {/* Quick Amount Buttons */}
          {selectedAsset && (
            <View style={styles.quickAmountsSection}>
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
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Resumo do Investimento</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Ativo:</Text>
                <Text style={styles.summaryValue}>{selectedAsset.name}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Valor:</Text>
                <Text style={styles.summaryValue}>{formatCurrency(parseFloat(amount))}</Text>
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
                colors={['#4ECDC4', '#44A08D']}
                style={styles.investButtonGradient}
              >
                <Ionicons name="trending-up" size={20} color="#FFFFFF" />
                <Text style={styles.investButtonText}>
                  Investir {formatCurrency(parseFloat(amount))}
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
  helpButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  amountCard: {
    marginHorizontal: 24,
    marginVertical: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  amountGradient: {
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(78, 205, 196, 0.2)',
    borderRadius: 16,
  },
  amountLabel: {
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 14,
    color: '#4ECDC4',
    marginTop: 12,
  },
  categorySection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 24,
    marginBottom: 16,
  },
  categoriesContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  categoryCard: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    minWidth: 100,
  },
  categoryCardSelected: {
    backgroundColor: 'rgba(78, 205, 196, 0.1)',
    borderColor: '#4ECDC4',
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
    color: '#9CA3AF',
    fontWeight: '500',
  },
  categoryNameSelected: {
    color: '#FFFFFF',
  },
  assetsSection: {
    marginBottom: 24,
  },
  assetsList: {
    paddingHorizontal: 24,
  },
  assetCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  assetCardSelected: {
    backgroundColor: 'rgba(78, 205, 196, 0.1)',
    borderColor: '#4ECDC4',
  },
  assetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  assetLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assetIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  assetSymbol: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  assetName: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  assetSymbolText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 2,
  },
  assetRight: {
    alignItems: 'flex-end',
  },
  assetPrice: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  assetChange: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 2,
  },
  selectedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(78, 205, 196, 0.2)',
  },
  selectedText: {
    fontSize: 14,
    color: '#4ECDC4',
    marginLeft: 8,
    fontWeight: '500',
  },
  quickAmountsSection: {
    marginBottom: 24,
  },
  quickAmounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  quickAmountButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  quickAmountText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  summaryCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  summaryTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  summaryValue: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  investButtonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  investButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  investButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  investButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default InvestmentScreen;