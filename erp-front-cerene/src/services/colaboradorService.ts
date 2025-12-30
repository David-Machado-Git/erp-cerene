import { collection, query, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/ConectDb";
import { useToast } from "vue-toastification";


const toast = useToast();

class ColaboradorService {
    async findColaboradores() {
      try {
        const q = query(collection(db, "colaboradores"));
        const snapshot = await getDocs(q);
    
        if (!snapshot.empty) {
          const colaboradores = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          
          return colaboradores;
        }
    
        toast.error("Nenhum colaborador encontrado.");
        return [];
      } catch (error) {
        console.error("Erro ao buscar colaboradores:", error);
        toast.error("Erro ao buscar colaboradores.");
        return [];
      }
    }

    deleteColaborador = async (id: string) => {
      try {
        const colaboradorRef = doc(db, "colaboradores", id);
        await deleteDoc(colaboradorRef);
        return true;
      } catch (error) {
        console.error("Erro ao excluir colaborador:", error);
        throw error;
      }
    };

    atualizarColaborador = async (id: string, dados: any) => {
      try {
        const colaboradorRef = doc(db, "colaboradores", id);
        await updateDoc(colaboradorRef, dados);
        return true;
      } catch (error) {
        console.error("Erro ao atualizar colaborador:", error);
        throw error;
      }
    };





}



export default new ColaboradorService();