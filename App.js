import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar, View, Platform } from 'react-native';

// Importações das telas
import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';
import BottomTabNavigator from './navigation/BottomTabNavigator';

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    // Verificar se o usuário já está logado
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      setUserToken(token);
    } catch (error) {
      console.log('Erro ao verificar token:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (token) => {
    try {
      await AsyncStorage.setItem('userToken', token);
      setUserToken(token);
    } catch (error) {
      console.log('Erro ao salvar token:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setUserToken(null);
    } catch (error) {
      console.log('Erro ao fazer logout:', error);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar 
          barStyle="light-content" 
          backgroundColor="#0a1f21"
          translucent={false}
        />
        <LoadingScreen />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="#0a1f21"
        translucent={false}
      />
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{ 
            headerShown: false,
            cardStyle: { backgroundColor: '#0a1f21' }
          }}
        >
          {userToken == null ? (
            <Stack.Screen name="Login">
              {props => <LoginScreen {...props} onLogin={login} />}
            </Stack.Screen>
          ) : (
            <Stack.Screen name="Main">
              {props => <BottomTabNavigator {...props} onLogout={logout} />}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}