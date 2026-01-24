import axios from 'axios';
import { collection, doc, setDoc, addDoc, query, getDocs  } from "firebase/firestore";
import { db } from "@/firebase/ConectDb";

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

    const docRef = doc(collection(db, "colaboradores"));
    const idGerado = docRef.id;
    const dadosTratados = {
      ...dados,
      id: idGerado,
      nome: this.capitalizeFirst(dados.nome),
      cpf: dados.cpf,
      email: dados.email.toLowerCase(),
      password: dados.usuario[0].password,
      role: dados.usuario[0].role,
      isActive: false,
      unidade: dados.unidade,
      usuario: dados.usuario.map(u => ({
        ...u,
        login: u.login.toLowerCase(),
      })),

    };
    
    await setDoc(docRef, dadosTratados);
    await this.sendBoasVindas(dadosTratados.email);
    return docRef.id;
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    throw error;
  }
}

async sendBoasVindas(email) {
  try {
    await addDoc(collection(db, "mail"), {
      to: email,
      message: {
        subject: "Bem-vindo à nova era do Cerene!",
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <h1 style="color: #2c3e50;">Bem-vindo ao Cerene!</h1>
            
            <p>É com alegria que informamos que você <strong>acabou de realizar seu cadastro</strong> em nossa nova 
            <strong>Plataforma de Gestão de Ponto</strong>.</p>
            
            <p>Este passo representa mais do que um avanço tecnológico: é um sinal de <strong>crescimento</strong>, 
            <strong>organização</strong> e <strong>cuidado</strong> com cada pessoa que faz parte da nossa missão.</p>
            
            <p>O <strong>Cerene</strong> é, antes de tudo, uma unidade terapêutica dedicada à transformação de vidas. 
            Agora, com esta ferramenta, buscamos também transformar a forma como acompanhamos e valorizamos a jornada 
            de nossos colaboradores.</p>
            
            <p>Se você já caminha conosco há muitos anos, este momento simboliza uma nova etapa dessa história. 
            Se você está chegando agora, é o início de uma nova trajetória onde queremos que seja marcada por 
            <strong>acolhimento</strong>, <strong>evolução</strong> e <strong>propósito</strong>.</p>
            
            <p style="font-size: 1.1em; color: #27ae60;"><strong>E você faz parte de tudo isso 🌱</strong></p>
            
            <p>Estamos muito felizes em ter você aqui. Juntos, seguimos construindo um Cerene cada vez mais 
            <strong>humano</strong>, <strong>transparente</strong> e <strong>preparado para o futuro</strong>.</p>
            
            <hr style="margin: 20px 0;">
            
            <p><strong>Atenciosamente,</strong><br>Equipe Cerene</p>
            
            <img src="https://firebasestorage.googleapis.com/v0/b/cerene---controle-ponto.firebasestorage.app/o/assinatura_boas_vindas.png?alt=media&token=3321a5c0-09d7-45b9-aadf-28e50744f591" 
                 alt="Assinatura Cerene" style="margin-top: 15px; max-width: 650px;"/>
          </div>
        `
      }
    });
    console.log("Documento criado na coleção 'mail' para envio de e-mail.");
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
  }
}


capitalizeFirst(str) {
  if (!str) return "";
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}


async findUnidadesConfiguracoes() {
  // console.log('SIM BATEU NO SERVICE');
  
  try {
    const q = query(collection(db, "unidades")); // sem select

    const querySnapshot = await getDocs(q);
    const unidades = [];

    querySnapshot.forEach((doc) => {
      unidades.push({
        id: doc.id,
        configuracoes: doc.data().configuracoes // pega só esse campo manualmente
      });
    });

    return unidades;
  } catch (error) {
    console.error("Erro ao buscar configurações das unidades:", error);
    throw error;
  }
}



}

 


export default new CadastroService();