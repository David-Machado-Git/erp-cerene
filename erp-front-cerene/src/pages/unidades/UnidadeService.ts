import { collection, doc, setDoc, getDocs, deleteDoc, updateDoc, writeBatch } from "firebase/firestore";
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
        mostrarSelect: dados.configuracoes?.mostrarSelect ?? false,
        selectName: dados.configuracoes?.selectName || '',
        dataCadastro: dados.configuracoes?.dataCadastro || '',
        ultimaAtualizacao: new Date().toISOString()
      },
      cordenadas: {
        lat: dados.cordenadas?.lat ?? null,
        long: dados.cordenadas?.long ?? null,
        mostrarUnidadeMapa: dados.cordenadas?.mostrarUnidadeMapa ?? false,
        descricao: dados.cordenadas?.descricao || ''
      },
      textoSelect: dados.textoSelect || '',
      ie: dados.ie || '',
      im: dados.im || '',
      urlPhoto: dados.urlPhoto || ''
    }

    // atualiza a unidade
    await updateDoc(unidadeRef, dadosTratados)

    // 🔹 após atualizar a unidade, atualiza todos os colaboradores vinculados
    await this.atualizarColaboradoresUnidade(id, dadosTratados.configuracoes.selectName)

    return true
  } catch (error) {
    console.error('Erro ao atualizar unidade:', error)
    throw error
  }
}



// atualizar colaboradores vinculados a uma unidade
async atualizarColaboradoresUnidade(unidadeId: string, novoDesc: string) {
  try {
    // 1. Busca todos os colaboradores
    const snapshot = await getDocs(collection(db, "colaboradores"))

    // 2. Cria um batch para atualizar em lote
    const batch = writeBatch(db)

    snapshot.forEach((docSnap) => {
      const data = docSnap.data()
      const unidade = data.unidade?.[0]

      // 3. Se o colaborador tiver a unidade com o mesmo id, atualiza
      if (unidade?.id === unidadeId) {
        const colabRef = doc(db, "colaboradores", docSnap.id)
        batch.update(colabRef, {
          unidade: [{ id: unidadeId, desc: novoDesc }]
        })
      }
    })

    // 4. Envia todas as atualizações de uma vez
    await batch.commit()
    console.log(`Colaboradores vinculados à unidade ${unidadeId} atualizados com sucesso.`)
  } catch (error) {
    console.error("Erro ao atualizar colaboradores da unidade:", error)
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


  atualizarStatusUnidade = async (id: string, dados: any) => {
    try {
      const unidadeRef = doc(db, "unidades", id);
      await updateDoc(unidadeRef, dados);
      return true;
    } catch (error) {
      console.error("Erro ao atualizar colaborador:", error);
      throw error;
    }
  };





}

export default new UnidadeService();