import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

import DashboardScreen from '../screens/DashboardScreen';
import PortfolioScreen from '../screens/PortfolioScreen';
import InvestmentScreen from '../screens/InvestmentScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ onLogout }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Portfolio') {
            iconName = focused ? 'pie-chart' : 'pie-chart-outline';
          } else if (route.name === 'Investment') {
            iconName = focused ? 'trending-up' : 'trending-up-outline';
          } else if (route.name === 'Transactions') {
            iconName = focused ? 'receipt' : 'receipt-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return (
            <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
              {focused && (
                <LinearGradient
                  colors={['rgba(78, 205, 196, 0.2)', 'rgba(68, 160, 141, 0.1)']}
                  style={styles.iconBackground}
                />
              )}
              <Ionicons name={iconName} size={size} color={color} />
            </View>
          );
        },
        tabBarActiveTintColor: '#4ECDC4',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: '#0a1f21',
          borderTopWidth: 1,
          borderTopColor: 'rgba(255, 255, 255, 0.1)',
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        options={{ tabBarLabel: 'Início' }}
      >
        {props => <DashboardScreen {...props} onLogout={onLogout} />}
      </Tab.Screen>
      
      <Tab.Screen 
        name="Portfolio" 
        component={PortfolioScreen}
        options={{ tabBarLabel: 'Portfólio' }}
      />
      
      <Tab.Screen 
        name="Investment" 
        component={InvestmentScreen}
        options={{ tabBarLabel: 'Investir' }}
      />
      
      <Tab.Screen 
        name="Transactions" 
        component={TransactionsScreen}
        options={{ tabBarLabel: 'Extrato' }}
      />
      
      <Tab.Screen 
        name="Profile"
        options={{ tabBarLabel: 'Perfil' }}
      >
        {props => <ProfileScreen {...props} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  iconContainerFocused: {
    transform: [{ scale: 1.1 }],
  },
  iconBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
});

export default BottomTabNavigator;