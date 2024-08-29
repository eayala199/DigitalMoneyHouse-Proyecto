class TransactionsAPI {
  baseUrl: string;
  
  constructor(baseURL) {
    this.baseURL = baseURL || 'https://digitalmoney.digitalhouse.com';
  }

  // Obtener todas las transacciones de una cuenta
  async getAllTransactions(accountId) {
    const response = await fetch(`${this.baseURL}/api/accounts/${accountId}/activity`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`  // Elimina el prefijo 'Bearer '
      }
    });
    return response.json();
  }

  // Crear una nueva transacción
  async createTransaction(accountId, transactionData) {
    const response = await fetch(`${this.baseURL}/api/accounts/${accountId}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`  // Elimina el prefijo 'Bearer '
      },
      body: JSON.stringify(transactionData)
    });
    return response.json();
  }

  // Obtener detalles de una transacción específica
  async getTransaction(accountId, transactionId) {
    const response = await fetch(`${this.baseURL}/api/accounts/${accountId}/transactions/${transactionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`  // Elimina el prefijo 'Bearer '
      }
    });
    return response.json();
  }
}

export const transactionsAPI = new TransactionsAPI();
