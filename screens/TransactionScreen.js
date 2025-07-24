import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const TransactionScreen = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = ['Todas', 'Compra', 'Venda', 'Dividendos', 'Resgate'];

  const transactions = [
    {
      id: '1',
      type: 'buy',
      title: 'Compra PETR4',
      subtitle: 'Petrobras PN',
      amount: -5000.00,
      date: '2025-07-24',
      time: '14:30',
      status: 'completed',
      icon: 'arrow-up',
      color: '#FF6B6B'
    },
    {
      id: '2',
      type: 'dividend',
      title: 'Dividendos ITUB4',
      subtitle: 'Itaú Unibanco PN',
      amount: 250.00,
      date: '2025-07-23',
      time: '09:15',
      status: 'completed',
      icon: 'cash',
      color: '#4ECDC4'
    },
    {
      id: '3',
      type: 'sell',
      title: 'Venda VALE3',
      subtitle: 'Vale ON',
      amount: 8500.00,
      date: '2025-07-23',
      time: '16:45',
      status: 'completed',
      icon: 'arrow-down',
      color: '#4ECDC4'
    },
    {
      id: '4',
      type: 'buy',
      title: 'Compra BBDC4',
      subtitle: 'Bradesco PN',
      amount: -3200.00,
      date: '2025-07-22',
      time: '11:20',
      status: 'completed',
      icon: 'arrow-up',
      color: '#FF6B6B'
    },
    {
      id: '5',
      type: 'redemption',
      title: 'Resgate CDB',
      subtitle: 'CDB Banco Inter',
      amount: 10000.00,
      date: '2025-07-22',
      time: '08:30',
      status: 'completed',
      icon: 'card',
      color: '#4ECDC4'
    },
    {
      id: '6',
      type: 'buy',
      title: 'Compra HASH11',
      subtitle: 'Hashdex Nasdaq',
      amount: -2500.00,
      date: '2025-07-21',
      time: '15:10',
      status: 'pending',
      icon: 'arrow-up',
      color: '#FFE66D'
    },
    {
      id: '7',
      type: 'dividend',
      title: 'Dividendos VALE3',
      subtitle: 'Vale ON',
      amount: 180.00,
      date: '2025-07-20',
      time: '10:00',
      status: 'completed',
      icon: 'cash',
      color: '#4ECDC4'
    },
    {
      id: '8',
      type: 'buy',
      title: 'Compra BTC',
      subtitle: 'Bitcoin',
      amount: -5000.00,
      date: '2025-07-19',
      time: '13:25',
      status: 'completed',
      icon: 'logo-bitcoin',
      color: '#FF6B6B'
    }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(Math.abs(value));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoje';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Ontem';
    } else {
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#4ECDC4';
      case 'pending':
        return '#FFE66D';
      case 'failed':
        return '#FF6B6B';
      default:
        return '#9CA3AF';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Concluída';
      case 'pending':
        return 'Pendente';
      case 'failed':
        return 'Falhou';
      default:
        return 'Desconhecido';
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesFilter = selectedFilter === 'Todas' || 
      (selectedFilter === 'Compra' && transaction.type === 'buy') ||
      (selectedFilter === 'Venda' && transaction.type === 'sell') ||
      (selectedFilter === 'Dividendos' && transaction.type === 'dividend') ||
      (selectedFilter === 'Resgate' && transaction.type === 'redemption');

    const matchesSearch = transaction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.subtitle.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const renderTransaction = ({ item }) => (
    <TouchableOpacity style={styles.transactionCard}>
      <View style={styles.transactionContent}>
        <View style={styles.transactionLeft}>
          <View style={[styles.transactionIcon, { backgroundColor: `${item.color}20` }]}>
            <Ionicons name={item.icon} size={20} color={item.color} />
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTitle}>{item.title}</Text>
            <Text style={styles.transactionSubtitle}>{item.subtitle}</Text>
            <View style={styles.transactionMeta}>
              <Text style={styles.transactionDate}>
                {formatDate(item.date)}, {item.time}
              </Text>
              <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(item.status)}20` }]}>
                <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                  {getStatusText(item.status)}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.transactionRight}>
          <Text style={[
            styles.transactionAmount,
            { color: item.amount >= 0 ? '#4ECDC4' : '#FF6B6B' }
          ]}>
            {item.amount >= 0 ? '+' : ''}{formatCurrency(item.amount)}
          </Text>
          <Ionicons name="chevron-forward" size={16} color="#6B7280" />
        </View>
      </View>
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
          <Text style={styles.headerTitle}>Transações</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar transações..."
              placeholderTextColor="#6B7280"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity 
                onPress={() => setSearchQuery('')}
                style={styles.clearButton}
              >
                <Ionicons name="close-circle" size={20} color="#6B7280" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterTabs}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterTabsContent}
          >
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterTab,
                  selectedFilter === filter && styles.filterTabActive
                ]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text style={[
                  styles.filterTabText,
                  selectedFilter === filter && styles.filterTabTextActive
                ]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <LinearGradient
            colors={['rgba(78, 205, 196, 0.1)', 'rgba(68, 160, 141, 0.05)']}
            style={styles.summaryGradient}
          >
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Este mês</Text>
                <Text style={styles.summaryValue}>+R$ 12.430,00</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Total de transações</Text>
                <Text style={styles.summaryValue}>{filteredTransactions.length}</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Transactions List */}
        <FlatList
          data={filteredTransactions}
          keyExtractor={(item) => item.id}
          renderItem={renderTransaction}
          style={styles.transactionsList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.transactionsContent}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="receipt-outline" size={48} color="#6B7280" />
              <Text style={styles.emptyStateText}>Nenhuma transação encontrada</Text>
              <Text style={styles.emptyStateSubtext}>
                Tente ajustar os filtros ou o termo de busca
              </Text>
            </View>
          }
        />
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
  filterButton: {
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: 44,
    color: '#FFFFFF',
    fontSize: 16,
  },
  clearButton: {
    padding: 4,
  },
  filterTabs: {
    paddingBottom: 16,
  },
  filterTabsContent: {
    paddingHorizontal: 24,
    gap: 12,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  filterTabActive: {
    backgroundColor: '#4ECDC4',
    borderColor: '#4ECDC4',
  },
  filterTabText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  filterTabTextActive: {
    color: '#FFFFFF',
  },
  summaryCard: {
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  summaryGradient: {
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(78, 205, 196, 0.2)',
    borderRadius: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 16,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  transactionsList: {
    flex: 1,
  },
  transactionsContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  transactionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  transactionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
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
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 2,
  },
  transactionSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  transactionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  transactionDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  transactionRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});

export default TransactionScreen;