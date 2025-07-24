import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

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
    { name: 'Ações', value: 'R$ 125.430,00', percentage: '+12,5%', color: '#4ECDC4' },
    { name: 'Renda Fixa', value: 'R$ 89.200,00', percentage: '+5,2%', color: '#FFE66D' },
    { name: 'Fundos', value: 'R$ 45.600,00', percentage: '+8,9%', color: '#FF6B6B' },
    { name: 'Cripto', value: 'R$ 15.320,00', percentage: '-2,1%', color: '#A8E6CF' },
  ];

  const quickActions = [
    { icon: 'swap-horizontal', label: 'Transferir', color: '#4ECDC4' },
    { icon: 'card', label: 'Investir', color: '#FFE66D' },
    { icon: 'analytics', label: 'Relatórios', color: '#FF6B6B' },
    { icon: 'settings', label: 'Config', color: '#A8E6CF' },
  ];

  return (
    <LinearGradient
      colors={['#0a1f21', '#133134', '#1a4247']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greetingText}>Olá, Administrador!</Text>
            <Text style={styles.dateText}>24 de julho, 2025</Text>
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={24} color="#4ECDC4" />
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Saldo Total */}
          <View style={styles.balanceCard}>
            <LinearGradient
              colors={['rgba(78, 205, 196, 0.1)', 'rgba(68, 160, 141, 0.05)']}
              style={styles.balanceGradient}
            >
              <Text style={styles.balanceLabel}>Patrimônio Total</Text>
              <Text style={styles.balanceValue}>R$ 275.550,00</Text>
              <View style={styles.balanceChange}>
                <Ionicons name="trending-up" size={16} color="#4ECDC4" />
                <Text style={styles.balanceChangeText}>+15,2% este mês</Text>
              </View>
            </LinearGradient>
          </View>

          {/* Ações Rápidas */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ações Rápidas</Text>
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

          {/* Portfólio */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Meu Portfólio</Text>
            {portfolioData.map((item, index) => (
              <TouchableOpacity key={index} style={styles.portfolioCard}>
                <View style={styles.portfolioItem}>
                  <View style={styles.portfolioLeft}>
                    <View style={[styles.portfolioIcon, { backgroundColor: `${item.color}20` }]}>
                      <View style={[styles.portfolioDot, { backgroundColor: item.color }]} />
                    </View>
                    <View>
                      <Text style={styles.portfolioName}>{item.name}</Text>
                      <Text style={styles.portfolioValue}>{item.value}</Text>
                    </View>
                  </View>
                  <View style={styles.portfolioRight}>
                    <Text style={[
                      styles.portfolioPercentage,
                      { color: item.percentage.includes('-') ? '#FF6B6B' : '#4ECDC4' }
                    ]}>
                      {item.percentage}
                    </Text>
                    <Ionicons 
                      name="chevron-forward" 
                      size={16} 
                      color="#6B7280" 
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Últimas Transações */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Últimas Transações</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>Ver todas</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.transactionCard}>
              <View style={styles.transactionItem}>
                <View style={styles.transactionLeft}>
                  <View style={[styles.transactionIcon, { backgroundColor: '#4ECDC420' }]}>
                    <Ionicons name="arrow-up" size={16} color="#4ECDC4" />
                  </View>
                  <View>
                    <Text style={styles.transactionTitle}>Compra PETR4</Text>
                    <Text style={styles.transactionDate}>Hoje, 14:30</Text>
                  </View>
                </View>
                <Text style={[styles.transactionAmount, { color: '#FF6B6B' }]}>
                  -R$ 5.000,00
                </Text>
              </View>

              <View style={styles.transactionItem}>
                <View style={styles.transactionLeft}>
                  <View style={[styles.transactionIcon, { backgroundColor: '#FFE66D20' }]}>
                    <Ionicons name="arrow-down" size={16} color="#FFE66D" />
                  </View>
                  <View>
                    <Text style={styles.transactionTitle}>Dividendos ITUB4</Text>
                    <Text style={styles.transactionDate}>Ontem, 09:15</Text>
                  </View>
                </View>
                <Text style={[styles.transactionAmount, { color: '#4ECDC4' }]}>
                  +R$ 250,00
                </Text>
              </View>

              <View style={styles.transactionItem}>
                <View style={styles.transactionLeft}>
                  <View style={[styles.transactionIcon, { backgroundColor: '#A8E6CF20' }]}>
                    <Ionicons name="card" size={16} color="#A8E6CF" />
                  </View>
                  <View>
                    <Text style={styles.transactionTitle}>Resgate CDB</Text>
                    <Text style={styles.transactionDate}>23/07, 16:45</Text>
                  </View>
                </View>
                <Text style={[styles.transactionAmount, { color: '#4ECDC4' }]}>
                  +R$ 10.000,00
                </Text>
              </View>
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
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  dateText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 4,
  },
  logoutButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  balanceCard: {
    marginVertical: 24,
    borderRadius: 16,
    overflow: 'hidden',
  },
  balanceGradient: {
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(78, 205, 196, 0.2)',
    borderRadius: 16,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  balanceChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceChangeText: {
    fontSize: 14,
    color: '#4ECDC4',
    marginLeft: 4,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: '#4ECDC4',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    alignItems: 'center',
    width: '22%',
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  portfolioCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  portfolioItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  portfolioLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  portfolioIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  portfolioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  portfolioName: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  portfolioValue: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 2,
  },
  portfolioRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  portfolioPercentage: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 8,
  },
  transactionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  transactionDate: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DashboardScreen;