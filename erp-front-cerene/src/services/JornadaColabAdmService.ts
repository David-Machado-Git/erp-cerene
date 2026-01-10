import { collection, query, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref, set, get } from "firebase/database";
import { db, dbrt } from "@/firebase/ConectDb";
import { useToast } from "vue-toastification";


const toast = useToast();

export interface RegistroPonto {
  id?: string;
  date: string;
  workSchedule: string;
  checkIn: string;
  breakStart: string;
  breakEnd: string;
  checkOut: string;
  totalWorked: string;
  timeBank: string;
}


class JornadaColabAdmService {
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

    salvarRegistro = async (idUser: string, registro: RegistroPonto) => {
      // console.log("Chegou aqui no service com os dados +>+> ", idUser, registro);

      // usa o id do registro como chave
      const registroRef = ref(dbrt, `controlePonto/${idUser}/registros/${registro.id}`);
      await set(registroRef, registro);

    };

    buscarRegistros = async (idUser: string): Promise<RegistroPonto[]> => {
      const registrosRef = ref(dbrt, `controlePonto/${idUser}/registros`);
      const snapshot = await get(registrosRef);
      console.log('Buscando registro com o IDUSER => ', idUser);
      
      if (!snapshot.exists()) return [];

      const data = snapshot.val();

      // transforma objeto em array
      return Object.entries(data).map(([id, registro]: any) => ({
        ...registro,
        id // garante que o id esteja presente
      }));
    };









}



export default new JornadaColabAdmService();