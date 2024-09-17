class CardService {
  constructor(apiBaseUrl) {
    this.apiBaseUrl = apiBaseUrl;
  }

  async getCardsByAccountId(accountId, token) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/api/accounts/${accountId}/cards`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`
        },
      });
      if (!response.ok) throw new Error('Error fetching cards');
      return await response.json();
    } catch (error) {
      console.error('Error getting cards:', error);
      throw error;
    }
  }

  async createCard(accountId, cardData, token) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/api/accounts/${accountId}/cards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`
        },
        body: JSON.stringify(cardData),
      });
      if (!response.ok) throw new Error('Error creating card');
      return await response.json();
    } catch (error) {
      console.error('Error creating card:', error);
      throw error;
    }
  }

  async getCardById(accountId, cardId, token) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/api/accounts/${accountId}/cards/${cardId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`
        },
      });
      if (!response.ok) throw new Error('Error fetching card');
      return await response.json();
    } catch (error) {
      console.error('Error getting card:', error);
      throw error;
    }
  }

  async deleteCard(accountId, cardId, token) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/api/accounts/${accountId}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`
        },
      });
      if (!response.ok) throw new Error('Error deleting card');
      return await response.json();
    } catch (error) {
      console.error('Error deleting card:', error);
      throw error;
    }
  }
}

const cardService = new CardService('https://digitalmoney.digitalhouse.com');

export default cardService;
