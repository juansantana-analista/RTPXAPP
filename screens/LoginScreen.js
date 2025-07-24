import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = ({ onLogin }) => {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!userName.trim() || !userPassword.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://rtx.tecskill.com.br/auth_app_homolog.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: userName.trim(),
          userPassword: userPassword,
          apiToken: "Bearer Q0xJRU5UX0lEkKUDHAS5514DSYUdftOkVF9TRUNSRVQ="
        })
      });

      const data = await response.json();

      if (data.status === 'success' && data.data) {
        await onLogin(data.data);
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
      } else {
        Alert.alert('Erro', 'Credenciais inválidas. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#0a1f21', '#133134', '#1a4247']}
      style={styles.container}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Ionicons name="trending-up" size={40} color="#4ECDC4" />
            </View>
            <Text style={styles.logoText}>RTX</Text>
            <Text style={styles.subtitleText}>Banco de Investimentos</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.welcomeText}>Bem-vindo de volta</Text>
            <Text style={styles.descriptionText}>
              Faça login para acessar sua conta
            </Text>

            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#4ECDC4" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Nome de usuário"
                placeholderTextColor="#6B7280"
                value={userName}
                onChangeText={setUserName}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#4ECDC4" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#6B7280"
                value={userPassword}
                onChangeText={setUserPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons 
                  name={showPassword ? "eye-outline" : "eye-off-outline"} 
                  size={20} 
                  color="#6B7280" 
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <LinearGradient
                colors={['#4ECDC4', '#44A08D']}
                style={styles.loginButtonGradient}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.loginButtonText}>Entrar</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgotPasswordButton}>
              <Text style={styles.forgotPasswordText}>
                Esqueceu sua senha?
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(78, 205, 196, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'rgba(78, 205, 196, 0.3)',
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(78, 205, 196, 0.2)',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#FFFFFF',
    fontSize: 16,
  },
  eyeIcon: {
    padding: 8,
  },
  loginButton: {
    marginTop: 24,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  forgotPasswordText: {
    color: '#4ECDC4',
    fontSize: 16,
  },
});

export default LoginScreen;