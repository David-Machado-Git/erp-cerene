import axios from 'axios';
import { collection, doc, setDoc } from "firebase/firestore";
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

    return docRef.id;
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    throw error;
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