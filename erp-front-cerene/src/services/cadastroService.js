import axios from 'axios';
import { collection, doc, setDoc, addDoc  } from "firebase/firestore";
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
        subject: "Bem-vindo ao Cerene!",
        html: `
          <h1>Bem-vindo ao Cerene!</h1>
          <p>Estamos felizes em tê-lo conosco.</p>
          <hr>
          <p>Atenciosamente,<br>Cerene</p>
          <img src="https://firebasestorage.googleapis.com/v0/b/cerene---controle-ponto.firebasestorage.app/o/assinatura_boas_vindas.png?alt=media&token=3321a5c0-09d7-45b9-aadf-28e50744f591" alt="Assinatura Cerene"/>
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



}

 


export default new CadastroService();