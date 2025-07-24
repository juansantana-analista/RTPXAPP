import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Importar as telas
import DashboardScreen from '../screens/DashboardScreen';
import InvestmentScreen from '../screens/InvestmentScreen';
import PortfolioScreen from '../screens/PortfolioScreen';
import TransactionsScreen from '../screens/TransactionScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const colors = {
  // Cores exatas da imagem
  tabBarBackground: '#1a4247', // Verde escuro da imagem
  tabBarBorder: '#2a5257',     // Borda sutil
  active: '#4ECDC4',           // Verde água para ativo
  inactive: '#7A9B9E',         // Cinza esverdeado para inativo
  glow: 'rgba(78, 205, 196, 0.12)', // Glow bem sutil
};

const BottomTabNavigator = ({ onLogout }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarBackground: () => (
          <View style={styles.tabBarBackground} />
        ),
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = 'home';
          } else if (route.name === 'Portfolio') {
            iconName = 'wallet';
          } else if (route.name === 'Investir') {
            iconName = 'trending-up';
          } else if (route.name === 'Transacoes') {
            iconName = 'document-text';
          } else if (route.name === 'Perfil') {
            iconName = 'person';
          }

          return (
            <View style={[
              styles.iconContainer,
              focused && styles.iconContainerActive
            ]}>
              <Ionicons 
                name={iconName} 
                size={21} 
                color={focused ? colors.active : colors.inactive} 
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Dashboard">
        {props => <DashboardScreen {...props} onLogout={onLogout} />}
      </Tab.Screen>

      <Tab.Screen name="Portfolio">
        {props => <PortfolioScreen {...props} onLogout={onLogout} />}
      </Tab.Screen>

      <Tab.Screen name="Investir">
        {props => <InvestmentScreen {...props} onLogout={onLogout} />}
      </Tab.Screen>

      <Tab.Screen name="Transacoes">
        {props => <TransactionsScreen {...props} onLogout={onLogout} />}
      </Tab.Screen>

      <Tab.Screen name="Perfil">
        {props => <ProfileScreen {...props} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 40 : 30,
    left: 20,
    right: 20,
    height: 52,
    borderRadius: 12,
    paddingBottom: 0,
    paddingTop: 0,
    paddingHorizontal: 12,
    borderTopWidth: 0,
    elevation: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  tabBarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.tabBarBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.tabBarBorder,
  },
  tabBarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  iconContainerActive: {
    backgroundColor: colors.glow,
  },
});

export default BottomTabNavigator;