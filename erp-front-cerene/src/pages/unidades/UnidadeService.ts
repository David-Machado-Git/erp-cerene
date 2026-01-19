import { collection, doc, setDoc, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
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

  // atualizar unidade
  async atualizarUnidade(id: string, dados: any) {
    try {
      const unidadeRef = doc(db, 'unidades', id)
      const dadosTratados = {
        ...dados,
        nomeFantasia: dados.nomeFantasia?.trim() || '',
        cnpj: dados.cnpj?.trim() || '',
        contato: {
          telefone: dados.contato?.telefone || '',
          email: (dados.contato?.email || '').toLowerCase()
        },
        configuracoes: {
          ativo: dados.configuracoes?.ativo ?? true,
          dataCadastro: dados.configuracoes?.dataCadastro || '',
          ultimaAtualizacao: new Date().toISOString()
        },
        ie: dados.ie || '',
        im: dados.im || ''
      }

      await updateDoc(unidadeRef, dadosTratados)
      return true
    } catch (error) {
      console.error('Erro ao atualizar unidade:', error)
      throw error
    }
  }

  // excluir unidade
  async deleteUnidade(id: string) {
    try {
      const unidadeRef = doc(db, 'unidades', id)
      await deleteDoc(unidadeRef)
      return true
    } catch (error) {
      console.error('Erro ao excluir unidade:', error)
      throw error
    }
  }





}

export default new UnidadeService();