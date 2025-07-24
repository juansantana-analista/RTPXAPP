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
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const colors = {
  // Tema Escuro
  primary: '#4ECDC4',
  primaryLight: '#6EDCD4',
  primaryDark: '#44A08D',
  success: '#4ECDC4',
  warning: '#FFE66D',
  error: '#FF6B6B',
  
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

const LoginScreen = ({ onLogin }) => {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

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
      colors={[colors.background, colors.backgroundSecondary, colors.backgroundTertiary]}
      style={styles.container}
    >
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={colors.background}
        translucent={false}
      />
      
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Header Section */}
            <View style={styles.headerSection}>
              <View style={styles.logoContainer}>
                <Image 
                  source={require('../assets/logortx.png')} 
                  style={styles.logo}
                  resizeMode="contain"
                />
                <Text style={styles.subtitleText}>Operações</Text>
              </View>
            </View>

            {/* Welcome Section */}
            <View style={styles.welcomeSection}>
              <Text style={styles.welcomeTitle}>Bem-vindo de volta</Text>
              <Text style={styles.welcomeSubtitle}>
                Faça login para acessar sua conta
              </Text>
            </View>

            {/* Form Section */}
            <View style={styles.formSection}>
              {/* Username Input */}
              <View style={styles.inputGroup}>
                <View style={[
                  styles.inputContainer,
                  focusedInput === 'username' && styles.inputContainerFocused
                ]}>
                  <View style={styles.inputIcon}>
                    <Ionicons 
                      name="person-outline" 
                      size={20} 
                      color={focusedInput === 'username' ? colors.primary : colors.textSecondary} 
                    />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Nome de usuário"
                    placeholderTextColor={colors.textTertiary}
                    value={userName}
                    onChangeText={setUserName}
                    onFocus={() => setFocusedInput('username')}
                    onBlur={() => setFocusedInput(null)}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>

              {/* Password Input */}
              <View style={styles.inputGroup}>
                <View style={[
                  styles.inputContainer,
                  focusedInput === 'password' && styles.inputContainerFocused
                ]}>
                  <View style={styles.inputIcon}>
                    <Ionicons 
                      name="lock-closed-outline" 
                      size={20} 
                      color={focusedInput === 'password' ? colors.primary : colors.textSecondary} 
                    />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor={colors.textTertiary}
                    value={userPassword}
                    onChangeText={setUserPassword}
                    onFocus={() => setFocusedInput('password')}
                    onBlur={() => setFocusedInput(null)}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons 
                      name={showPassword ? "eye-outline" : "eye-off-outline"} 
                      size={20} 
                      color={colors.textSecondary} 
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Remember Me & Forgot Password */}
              <View style={styles.optionsRow}>
                <TouchableOpacity style={styles.rememberMeContainer}>
                  <View style={styles.checkbox}>
                    <Ionicons name="checkmark" size={12} color={colors.primary} />
                  </View>
                  <Text style={styles.rememberMeText}>Lembrar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity>
                  <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
                </TouchableOpacity>
              </View>

              {/* Login Button */}
              <TouchableOpacity
                style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
                onPress={handleLogin}
                disabled={isLoading}
              >
                <LinearGradient
                  colors={[colors.primary, colors.primaryDark]}
                  style={styles.loginButtonGradient}
                >
                  {isLoading ? (
                    <ActivityIndicator color={colors.textPrimary} size="small" />
                  ) : (
                    <>
                      <Text style={styles.loginButtonText}>Entrar</Text>
                      <Ionicons name="arrow-forward" size={18} color={colors.textPrimary} />
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              {/* Biometric Login */}
              <TouchableOpacity style={styles.biometricButton}>
                <View style={styles.biometricIcon}>
                  <Ionicons name="finger-print" size={20} color={colors.primary} />
                </View>
                <Text style={styles.biometricText}>Biometria</Text>
              </TouchableOpacity>
            </View>

            {/* Footer Section */}
            <View style={styles.footerSection}>
              <View style={styles.securityInfo}>
                <Ionicons name="shield-checkmark" size={14} color={colors.success} />
                <Text style={styles.securityText}>
                  Seguro e protegido
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
    justifyContent: 'space-between',
    minHeight: '100%',
  },
  headerSection: {
    alignItems: 'center',
    paddingTop: 40, // Desce mais o logo
    paddingBottom: 10,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 100,
    marginBottom: 4, // Reduzido de 12px para 4px - mais próximo
  },
  subtitleText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
  welcomeSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  formSection: {
    paddingVertical: 20,
  },
  inputGroup: {
    marginBottom: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputContainerFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.surfaceHigh,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 50,
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
  },
  eyeButton: {
    padding: 8,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    backgroundColor: `${colors.primary}20`,
    borderWidth: 1,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  rememberMeText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  loginButton: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonGradient: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  loginButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  biometricButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: colors.primary,
    gap: 8,
  },
  biometricIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: `${colors.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  biometricText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  footerSection: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
  },
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  securityText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 6,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default LoginScreen;