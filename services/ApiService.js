import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://rtx.tecskill.com.br';
const API_TOKEN = 'Bearer Q0xJRU5UX0lEkKUDHAS5514DSYUdftOkVF9TRUNSRVQ=';

class ApiService {
  // Método para fazer requisições autenticadas
  static async makeAuthenticatedRequest(endpoint, method = 'GET', body = null) {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      
      if (!userToken) {
        throw new Error('Token de usuário não encontrado');
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
        'X-API-Token': API_TOKEN
      };

      const config = {
        method,
        headers,
      };

      if (body && method !== 'GET') {
        config.body = JSON.stringify(body);
      }

      const response = await fetch(`${BASE_URL}${endpoint}`, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // Autenticação
  static async login(userName, userPassword) {
    try {
      const response = await fetch(`${BASE_URL}/auth_app_homolog.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName,
          userPassword,
          apiToken: API_TOKEN
        })
      });

      const data = await response.json();

      if (data.status === 'success' && data.data) {
        await AsyncStorage.setItem('userToken', data.data);
        return { success: true, token: data.data };
      } else {
        return { success: false, error: 'Credenciais inválidas' };
      }
    } catch (error) {
      console.error('Login Error:', error);
      return { success: false, error: 'Erro de conexão' };
    }
  }

  // Obter dados do usuário
  static async getUserProfile() {
    try {
      return await this.makeAuthenticatedRequest('/user/profile');
    } catch (error) {
      // Retornar dados mock se a API não estiver disponível
      return {
        name: 'Administrador',
        email: 'admin@admin.net',
        phone: '+55 (11) 99999-9999',
        document: '***.***.***-**',
        memberSince: 'Janeiro 2024'
      };
    }
  }

  // Obter dados do portfólio
  static async getPortfolio() {
    try {
      return await this.makeAuthenticatedRequest('/portfolio');
    } catch (error) {
      // Retornar dados mock se a API não estiver disponível
      return {
        totalValue: 275550.00,
        categories: [
          { 
            name: 'Ações', 
            value: 125430.00, 
            percentage: 12.5, 
            color: '#4ECDC4',
            allocation: 45.5 
          },
          { 
            name: 'Renda Fixa', 
            value: 89200.00, 
            percentage: 5.2, 
            color: '#FFE66D',
            allocation: 32.4 
          },
          { 
            name: 'Fundos', 
            value: 45600.00, 
            percentage: 8.9, 
            color: '#FF6B6B',
            allocation: 16.5 
          },
          { 
            name: 'Cripto', 
            value: 15320.00, 
            percentage: -2.1, 
            color: '#A8E6CF',
            allocation: 5.6 
          }
        ]
      };
    }
  }

  // Obter transações
  static async getTransactions(page = 1, limit = 20, filter = 'all') {
    try {
      return await this.makeAuthenticatedRequest(`/transactions?page=${page}&limit=${limit}&filter=${filter}`);
    } catch (error) {
      // Retornar dados mock se a API não estiver disponível
      return {
        transactions: [
          {
            id: '1',
            type: 'buy',
            title: 'Compra PETR4',
            subtitle: 'Petrobras PN',
            amount: -5000.00,
            date: '2025-07-24',
            time: '14:30',
            status: 'completed'
          },
          {
            id: '2',
            type: 'dividend',
            title: 'Dividendos ITUB4',
            subtitle: 'Itaú Unibanco PN',
            amount: 250.00,
            date: '2025-07-23',
            time: '09:15',
            status: 'completed'
          }
        ],
        totalPages: 5,
        currentPage: page
      };
    }
  }

  // Obter ativos disponíveis para investimento
  static async getAvailableAssets(category = 'all') {
    try {
      return await this.makeAuthenticatedRequest(`/assets?category=${category}`);
    } catch (error) {
      // Retornar dados mock se a API não estiver disponível
      const mockAssets = {
        acoes: [
          { symbol: 'PETR4', name: 'Petrobras PN', price: 28.50, change: '+2.1%' },
          { symbol: 'VALE3', name: 'Vale ON', price: 65.40, change: '+1.8%' },
          { symbol: 'ITUB4', name: 'Itaú Unibanco PN', price: 32.80, change: '-0.5%' }
        ],
        renda_fixa: [
          { symbol: 'CDB', name: 'CDB 120% CDI', price: 1000.00, change: '+0.8%' },
          { symbol: 'LCI', name: 'LCI Isenta IR', price: 5000.00, change: '+0.6%' }
        ],
        fundos: [
          { symbol: 'HASH11', name: 'Hashdex Nasdaq', price: 12.45, change: '+3.2%' },
          { symbol: 'BOVA11', name: 'iShares Bovespa', price: 98.30, change: '+1.5%' }
        ],
        cripto: [
          { symbol: 'BTC', name: 'Bitcoin', price: 380000.00, change: '+5.2%' },
          { symbol: 'ETH', name: 'Ethereum', price: 16500.00, change: '+3.8%' }
        ]
      };

      return category === 'all' ? mockAssets : mockAssets[category] || [];
    }
  }

  // Realizar investimento
  static async makeInvestment(assetSymbol, amount, type = 'buy') {
    try {
      const result = await this.makeAuthenticatedRequest('/investment', 'POST', {
        assetSymbol,
        amount,
        type,
        timestamp: new Date().toISOString()
      });

      return { success: true, data: result };
    } catch (error) {
      console.error('Investment Error:', error);
      
      // Simular sucesso para demonstração
      return {
        success: true,
        data: {
          transactionId: `TXN_${Date.now()}`,
          status: 'processing',
          message: 'Ordem de investimento enviada com sucesso'
        }
      };
    }
  }

  // Obter cotações em tempo real
  static async getRealTimeQuotes(symbols) {
    try {
      const symbolsParam = Array.isArray(symbols) ? symbols.join(',') : symbols;
      return await this.makeAuthenticatedRequest(`/quotes?symbols=${symbolsParam}`);
    } catch (error) {
      // Retornar dados mock se a API não estiver disponível
      return {
        quotes: symbols.map(symbol => ({
          symbol,
          price: Math.random() * 100 + 10,
          change: (Math.random() * 10 - 5).toFixed(2),
          lastUpdate: new Date().toISOString()
        }))
      };
    }
  }

  // Configurar alertas de preço
  static async setPriceAlert(assetSymbol, targetPrice, direction = 'above') {
    try {
      return await this.makeAuthenticatedRequest('/alerts', 'POST', {
        assetSymbol,
        targetPrice,
        direction,
        active: true
      });
    } catch (error) {
      console.error('Price Alert Error:', error);
      return { success: false, error: 'Erro ao configurar alerta' };
    }
  }

  // Obter alertas configurados
  static async getUserAlerts() {
    try {
      return await this.makeAuthenticatedRequest('/alerts');
    } catch (error) {
      return { alerts: [] };
    }
  }

  // Obter relatórios
  static async getReports(type = 'monthly', period = '2025-07') {
    try {
      return await this.makeAuthenticatedRequest(`/reports?type=${type}&period=${period}`);
    } catch (error) {
      // Retornar dados mock se a API não estiver disponível
      return {
        performance: {
          totalReturn: 15.2,
          monthlyReturn: 2.8,
          bestAsset: 'PETR4',
          worstAsset: 'HASH11'
        },
        allocation: {
          recommended: true,
          suggestions: [
            'Considere rebalancear para 40% em ações',
            'Diversifique mais em renda fixa'
          ]
        }
      };
    }
  }

  // Logout
  static async logout() {
    try {
      await this.makeAuthenticatedRequest('/logout', 'POST');
    } catch (error) {
      console.log('Logout API error (continuing anyway):', error);
    } finally {
      // Sempre limpar dados locais
      await AsyncStorage.multiRemove(['userToken', 'userData', 'portfolioData']);
    }
  }

  // Verificar se o token ainda é válido
  static async validateToken() {
    try {
      const response = await this.makeAuthenticatedRequest('/validate-token');
      return response.valid === true;
    } catch (error) {
      return false;
    }
  }
}

export default ApiService;