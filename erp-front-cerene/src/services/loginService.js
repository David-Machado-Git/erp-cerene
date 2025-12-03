import axios from 'axios';



class LoginService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  
  async loginUser(login, password) {
    try {
      const response = await this.api.post('/auth/login', { login, password });
      return response.data.token;
    } catch (error) {
      throw new Error('Credenciais inválidas ou erro na autenticação.');
    }
  }

  //FUNÇÃO DE VALIDAR TOKEN DEVE ESTAR PRESENTE EM TODOS OS COMPONENTES COM ROTAS AS PROTEGIDAS
  async validateToken(token) {
    try {
      const response = await this.api.get('/auth/validate-token', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  async logout(token) {
    try {
        console.log('Bateu no logout do Service');
        
        // Envia a requisição de logout com o cabeçalho correto
        await this.api.post(
            '/auth/logout',
            {}, // Corpo vazio
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    } catch (error) {
        console.error("Erro ao realizar logout:", error);
        throw new Error("Erro ao realizar logout.");
    }
}


}


export default new LoginService();
