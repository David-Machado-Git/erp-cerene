import axios from 'axios';

class CadastroService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        'Content-Type': 'application/json',
    },
});
}

async registrarUsuario(dados) {
    try {
      const response = await this.api.post('/empresa', dados);
      return response.data;
    } catch (error) {
      console.error('Erro ao registrar o usuário:', error);
      throw error;
    }
  }
}

export default new CadastroService();