import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Switch,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation, onLogout }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);

  const profileData = {
    name: 'Administrador',
    email: 'admin@admin.net',
    phone: '+55 (11) 99999-9999',
    document: '***.***.***-**',
    memberSince: 'Janeiro 2024'
  };

  const menuItems = [
    {
      section: 'Conta',
      items: [
        { icon: 'person-outline', title: 'Dados Pessoais', subtitle: 'Editar informações' },
        { icon: 'shield-outline', title: 'Segurança', subtitle: 'Senha e autenticação' },
        { icon: 'card-outline', title: 'Métodos de Pagamento', subtitle: 'Cartões e conta bancária' },
        { icon: 'document-outline', title: 'Documentos', subtitle: 'Comprovantes e extratos' }
      ]
    },
    {
      section: 'Preferências',
      items: [
        { 
          icon: 'notifications-outline', 
          title: 'Notificações', 
          subtitle: 'Alertas e avisos',
          toggle: notificationsEnabled,
          onToggle: setNotificationsEnabled
        },
        { 
          icon: 'finger-print-outline', 
          title: 'Biometria', 
          subtitle: 'Login com digital/face',
          toggle: biometricEnabled,
          onToggle: setBiometricEnabled
        },
        { 
          icon: 'moon-outline', 
          title: 'Tema Escuro', 
          subtitle: 'Aparência do aplicativo',
          toggle: darkModeEnabled,
          onToggle: setDarkModeEnabled
        }
      ]
    },
    {
      section: 'Suporte',
      items: [
        { icon: 'help-circle-outline', title: 'Central de Ajuda', subtitle: 'FAQ e tutoriais' },
        { icon: 'chatbubble-outline', title: 'Fale Conosco', subtitle: 'Atendimento ao cliente' },
        { icon: 'star-outline', title: 'Avaliar App', subtitle: 'Deixe sua opinião' },
        { icon: 'information-circle-outline', title: 'Sobre', subtitle: 'Versão e termos' }
      ]
    }
  ];

  const handleLogout = () => {
    Alert.alert(
      'Sair da Conta',
      'Tem certeza que deseja sair da sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Sair', 
          style: 'destructive', 
          onPress: onLogout 
        }
      ]
    );
  };

  const renderMenuItem = (item, index) => (
    <TouchableOpacity key={index} style={styles.menuItem}>
      <View style={styles.menuItemLeft}>
        <View style={styles.menuItemIcon}>
          <Ionicons name={item.icon} size={24} color="#4ECDC4" />
        </View>
        <View style={styles.menuItemContent}>
          <Text style={styles.menuItemTitle}>{item.title}</Text>
          <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
        </View>
      </View>
      <View style={styles.menuItemRight}>
        {item.toggle !== undefined ? (
          <Switch
            trackColor={{ false: '#374151', true: '#4ECDC4' }}
            thumbColor={item.toggle ? '#FFFFFF' : '#9CA3AF'}
            value={item.toggle}
            onValueChange={item.onToggle}
          />
        ) : (
          <Ionicons name="chevron-forward" size={20} color="#6B7280" />
        )}
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
          <Text style={styles.headerTitle}>Perfil</Text>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Card */}
          <View style={styles.profileCard}>
            <LinearGradient
              colors={['rgba(78, 205, 196, 0.1)', 'rgba(68, 160, 141, 0.05)']}
              style={styles.profileGradient}
            >
              <View style={styles.profileHeader}>
                <View style={styles.avatarContainer}>
                  <LinearGradient
                    colors={['#4ECDC4', '#44A08D']}
                    style={styles.avatar}
                  >
                    <Text style={styles.avatarText}>
                      {profileData.name.charAt(0)}
                    </Text>
                  </LinearGradient>
                  <View style={styles.statusBadge}>
                    <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                  </View>
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>{profileData.name}</Text>
                  <Text style={styles.profileEmail}>{profileData.email}</Text>
                  <Text style={styles.memberSince}>
                    Membro desde {profileData.memberSince}
                  </Text>
                </View>
              </View>

              <View style={styles.profileStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>R$ 275.550</Text>
                  <Text style={styles.statLabel}>Patrimônio</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>+15,2%</Text>
                  <Text style={styles.statLabel}>Rentabilidade</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>156</Text>
                  <Text style={styles.statLabel}>Transações</Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Menu Sections */}
          {menuItems.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.menuSection}>
              <Text style={styles.sectionTitle}>{section.section}</Text>
              <View style={styles.menuCard}>
                {section.items.map((item, itemIndex) => renderMenuItem(item, itemIndex))}
              </View>
            </View>
          ))}

          {/* Account Actions */}
          <View style={styles.actionsSection}>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionButtonContent}>
                <Ionicons name="download-outline" size={20} color="#4ECDC4" />
                <Text style={styles.actionButtonText}>Exportar Dados</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionButtonContent}>
                <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
                <Text style={[styles.actionButtonText, { color: '#FF6B6B' }]}>
                  Excluir Conta
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Logout Button */}
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <View style={styles.logoutButtonContent}>
              <Ionicons name="log-out-outline" size={20} color="#FF6B6B" />
              <Text style={styles.logoutButtonText}>Sair da Conta</Text>
            </View>
          </TouchableOpacity>

          {/* App Version */}
          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>RTX Investment v1.0.0</Text>
            <Text style={styles.versionSubtext}>
              © 2025 RTX. Todos os direitos reservados.
            </Text>
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
  editButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  profileCard: {
    marginHorizontal: 24,
    marginVertical: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  profileGradient: {
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(78, 205, 196, 0.2)',
    borderRadius: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statusBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4ECDC4',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#133134',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 14,
    color: '#6B7280',
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 24,
    marginBottom: 12,
  },
  menuCard: {
    marginHorizontal: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(78, 205, 196, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  menuItemRight: {
    marginLeft: 12,
  },
  actionsSection: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 12,
  },
  actionButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 16,
    color: '#4ECDC4',
    fontWeight: '600',
  },
  logoutButton: {
    marginHorizontal: 24,
    marginBottom: 32,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.2)',
  },
  logoutButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  versionContainer: {
    alignItems: 'center',
    paddingBottom: 32,
  },
  versionText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  versionSubtext: {
    fontSize: 12,
    color: '#4B5563',
    textAlign: 'center',
  },
});

export default ProfileScreen;