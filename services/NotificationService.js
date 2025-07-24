import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configurar como as notificações devem ser tratadas quando o app estiver em primeiro plano
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

class NotificationService {
  // Solicitar permissões para notificações
  static async registerForPushNotificationsAsync() {
    let token;
    
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      alert('Permissão para notificações não concedida!');
      return;
    }
    
    token = (await Notifications.getExpoPushTokenAsync()).data;
    
    // Salvar o token localmente
    await AsyncStorage.setItem('pushToken', token);
    
    return token;
  }

  // Agendar notificação local
  static async scheduleNotification(title, body, trigger = null) {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: 'default',
        priority: Notifications.AndroidNotificationPriority.HIGH,
        color: '#4ECDC4'
      },
      trigger: trigger || { seconds: 1 }
    });
    
    return notificationId;
  }

  // Notificações pré-definidas do app
  static async notifyInvestmentComplete(assetName, amount) {
    return this.scheduleNotification(
      'Investimento Realizado! 🎉',
      `Sua compra de ${assetName} no valor de ${amount} foi processada com sucesso.`
    );
  }

  static async notifyDividendReceived(assetName, amount) {
    return this.scheduleNotification(
      'Dividendos Recebidos! 💰',
      `Você recebeu ${amount} em dividendos de ${assetName}.`
    );
  }

  static async notifyPriceAlert(assetName, price, direction) {
    const emoji = direction === 'up' ? '📈' : '📉';
    const action = direction === 'up' ? 'subiu para' : 'caiu para';
    
    return this.scheduleNotification(
      `Alerta de Preço! ${emoji}`,
      `${assetName} ${action} ${price}.`
    );
  }

  static async notifyPortfolioUpdate(changePercent) {
    const emoji = changePercent >= 0 ? '🚀' : '📉';
    const word = changePercent >= 0 ? 'cresceu' : 'recuou';
    
    return this.scheduleNotification(
      `Atualização do Portfólio ${emoji}`,
      `Seu portfólio ${word} ${Math.abs(changePercent)}% hoje.`
    );
  }

  // Cancelar notificação específica
  static async cancelNotification(notificationId) {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  }

  // Cancelar todas as notificações
  static async cancelAllNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }

  // Configurar notificações recorrentes
  static async setupRecurringNotifications() {
    // Lembrete diário para verificar investimentos (9h)
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Bom dia, investidor! ☀️',
        body: 'Que tal verificar como estão seus investimentos hoje?',
        sound: 'default',
        color: '#4ECDC4'
      },
      trigger: {
        hour: 9,
        minute: 0,
        repeats: true
      }
    });

    // Lembrete semanal para revisar portfólio (segunda-feira, 18h)
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Revisão Semanal 📊',
        body: 'Hora de revisar e rebalancear seu portfólio!',
        sound: 'default',
        color: '#4ECDC4'
      },
      trigger: {
        weekday: 2, // Segunda-feira
        hour: 18,
        minute: 0,
        repeats: true
      }
    });
  }

  // Obter todas as notificações agendadas
  static async getScheduledNotifications() {
    return await Notifications.getAllScheduledNotificationsAsync();
  }

  // Simular notificações de mercado (para demonstração)
  static async simulateMarketNotifications() {
    // Simular notificação de dividendos em 5 segundos
    setTimeout(() => {
      this.notifyDividendReceived('ITUB4', 'R$ 0,15');
    }, 5000);

    // Simular alerta de preço em 10 segundos
    setTimeout(() => {
      this.notifyPriceAlert('PETR4', 'R$ 29,50', 'up');
    }, 10000);

    // Simular atualização do portfólio em 15 segundos
    setTimeout(() => {
      this.notifyPortfolioUpdate(2.3);
    }, 15000);
  }
}

export default NotificationService;