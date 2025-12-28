import axios from 'axios';
import { collection, query, where, getDocs, doc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "@/firebase/ConectDb";
import { useToast } from "vue-toastification";

const toast = useToast();


class LoginService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }


  //FUNÇÃO DE VALIDAR TOKEN DEVE ESTAR PRESENTE EM TODOS OS COMPONENTES COM ROTAS AS PROTEGIDAS
  async validateToken(token) {
    
    if (token) {
      const q = query(
        collection(db, "colaboradores"),
        where("token", "==", token)
      );

      const response = await getDocs(q);
      return !response.empty;

    } else {
      console.log("Token não existe no localStorage.");
    }
  }

  async registerToken(idClient, token) {
  try {
    const docRef = doc(db, "colaboradores", idClient);

    await updateDoc(docRef, {
      token: token,
    });

    return true;
  } catch (error) {
    console.error("Erro ao registrar token:", error);
    return false;
  }
}

async validarLogin(email, senha) {
  try {
    const q = query(
      collection(db, "colaboradores"),
      where("email", "==", email),
      where("password", "==", senha)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const userDoc = snapshot.docs[0].data();

      if (userDoc.isActive) {
        return userDoc;
      } else {
        toast.warning("Sua conta ainda não está liberada. Solicite a liberação junto ao responsável.", {
        toastClassName: "toast-orange",
        });
        return null;
      }
    }

    toast.error("Credenciais inválidas ou erro na autenticação.");
    return null;
  } catch (error) {
    console.error("Erro ao validar login:", error);
    toast.error("Erro ao validar login. Tente novamente.");
    return null;
  }
}


async logout(idClient) {
  try {
    const docRef = doc(db, "colaboradores", idClient);

    await updateDoc(docRef, {
      token: deleteField(),
    });

    return true;
  } catch (error) {
    console.error("Erro ao remover token:", error);
    return false;
  }
}



}

export default new LoginService();
