import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { db } from "@/firebase/ConectDb";

class UnidadeService {


async inserirUnidade(dados: any) {
    try {
      const docRef = doc(collection(db, 'unidades'))
      const idGerado = docRef.id

      const dadosTratados = {
        ...dados,
        id: idGerado,
        nome: this.capitalizeFirst(dados.nomeFantasia),
        cnpj: dados.cnpj,
        email: dados.contato.email?.toLowerCase() ?? '',
        usuario: dados.usuario?.map(u => ({
          ...u,
          login: u.login?.toLowerCase() ?? ''
        })) ?? []
      }

      await setDoc(docRef, dadosTratados)
      return idGerado
    } catch (error) {
      console.error('Erro ao registrar unidade:', error)
      throw error
    }
  }

  capitalizeFirst(text: string) {
    if (!text) return ''
    return text.charAt(0).toUpperCase() + text.slice(1)
  }


  async findUnidades() {
    try {
      const querySnapshot = await getDocs(collection(db, 'unidades'))
      const unidades: any[] = []

      querySnapshot.forEach((doc) => {
        unidades.push({
          id: doc.id,
          ...doc.data()
        })
      })

      return unidades
    } catch (error) {
      console.error('Erro ao buscar unidades:', error)
      throw error
    }
  }




}

export default new UnidadeService();