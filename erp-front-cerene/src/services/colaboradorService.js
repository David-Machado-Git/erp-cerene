import { collection, query, getDocs } from "firebase/firestore";
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
          console.log('Chegaram esses Colaboradores => ', colaboradores);
          
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
}



export default new ColaboradorService();