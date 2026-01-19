import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { getDatabase, ref as dbRef, update, get, child, } from "firebase/database";
import { deleteObject } from "firebase/storage";

class UploadStorageService {

    private storage = getStorage();
    private db = getFirestore();
    private newDb = getDatabase();

  // UPLOAD DE FOTOS PARA STORAGE E CRIAR PROPRIEDADE URLPHOTO NA COLEÇÃO COLABORADORES
  async uploadPhoto(
    idUser: string,
    file: File,
    onProgress?: (percent: number) => void
  ): Promise<string> {
    const fileRef = storageRef(this.storage, `profilePhotosColaboradores/${idUser}/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress?.(Math.round(percent));
        },
        (error) => reject(error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // 🔹 Atualiza o documento do colaborador com a nova propriedade urlPhoto
          const userRef = doc(this.db, "colaboradores", idUser);
          await updateDoc(userRef, { urlPhoto: downloadURL });

          resolve(downloadURL);
        }
      );
    });
  }

  // UPLOAD DE FOTOS PARA STORAGE E CRIAR PROPRIEDADE URLPHOTO NA COLEÇÃO COLABORADORES
  async uploadPhotoUnidade(
    idUser: string,
    file: File,
    onProgress?: (percent: number) => void
  ): Promise<string> {
    console.log("ID USUÁRIO EM UPLOAD => ", idUser)

    // ?? Determina extensão real do novo arquivo
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg"
    const filePath = `profilePhotosUnidades/${idUser}/foto_unidade.${extension}`
    const fileRef = storageRef(this.storage, filePath)

    // ?? Busca a unidade atual no Firestore para descobrir a extensão da foto antiga
    try {
      const unidadeRef = doc(this.db, "unidades", idUser)
      const unidadeSnap = await getDoc(unidadeRef)

      if (unidadeSnap.exists()) {
        const currentUrl = unidadeSnap.data().urlPhoto ?? ""
        if (currentUrl) {
          const oldExt = currentUrl.split(".").pop()?.split("?")[0] || "jpg"
          const oldRef = storageRef(
            this.storage,
            `profilePhotosUnidades/${idUser}/foto_unidade.${oldExt}`
          )
          try {
            await deleteObject(oldRef)
            console.log(`[uploadPhotoUnidade] Imagem anterior excluída: foto_unidade.${oldExt}`)
          } catch (error: any) {
            if (error.code !== "storage/object-not-found") {
              console.error(`[uploadPhotoUnidade] Erro ao excluir imagem antiga:`, error)
            }
          }
        }
      }
    } catch (error) {
      console.error("[uploadPhotoUnidade] Erro ao verificar/excluir imagem antiga:", error)
    }

    // ?? Faz upload da nova imagem
    const uploadTask = uploadBytesResumable(fileRef, file)

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          onProgress?.(Math.round(percent))
        },
        (error) => reject(error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)

          // ?? Atualiza documento da unidade
          const unidadeRef = doc(this.db, "unidades", idUser)
          await updateDoc(unidadeRef, { urlPhoto: downloadURL })

          // ?? Atualiza documento do colaborador
          await this.updateColaboradorPhoto(idUser, downloadURL)

          console.log(`[uploadPhotoUnidade] Upload finalizado e URL atualizada: ${downloadURL}`)
          resolve(downloadURL)
        }
      )
    })
  }

  /**
   * Atualiza/cria a foto do colaborador vinculado
   */
  async updateColaboradorPhoto(idUser: string, photoUrl: string) {
    try {
      const colaboradorRef = doc(this.db, "colaboradores", idUser)
      await setDoc(colaboradorRef, { urlPhoto: photoUrl }, { merge: true })
      console.log(`[updateColaboradorPhoto] Foto atualizada/criada para colaborador ${idUser}`)
    } catch (error) {
      console.error("[updateColaboradorPhoto] Erro ao atualizar foto do colaborador:", error)
    }
  }

  /**
   * Remove manualmente a foto da unidade e limpa Firestore
   */
  async removerFotoUnidade(idUser: string) {
    try {
      const unidadeRef = doc(this.db, "unidades", idUser)
      const unidadeSnap = await getDoc(unidadeRef)

      if (unidadeSnap.exists()) {
        const currentUrl = unidadeSnap.data().urlPhoto ?? ""
        if (currentUrl) {
          const oldExt = currentUrl.split(".").pop()?.split("?")[0] || "jpg"
          const fileRef = storageRef(
            this.storage,
            `profilePhotosUnidades/${idUser}/foto_unidade.${oldExt}`
          )
          try {
            await deleteObject(fileRef)
            console.log(`[removerFotoUnidade] Foto removida: foto_unidade.${oldExt}`)
          } catch (error: any) {
            if (error.code !== "storage/object-not-found") {
              console.error(`[removerFotoUnidade] Erro ao remover foto:`, error)
            }
          }
        }
      }

      // ?? Limpa propriedade no Firestore
      await updateDoc(unidadeRef, { urlPhoto: "" })

      const colaboradorRef = doc(this.db, "colaboradores", idUser)
      await setDoc(colaboradorRef, { urlPhoto: "" }, { merge: true })

      console.log(`[removerFotoUnidade] Foto removida e Firestore atualizado para ${idUser}`)
    } catch (error) {
      console.error("[removerFotoUnidade] Erro ao remover foto da unidade:", error)
    }
  }



  // 🔹 Nova função para salvar justificativa
async saveJustificativa(
  idUser: string,
  registroId: string,
  justificativa: string,
  file?: File,
  statusJustificativa: string = "Aguardando Aprovação", // default
  onProgress?: (percent: number) => void
): Promise<void> {
  const registroPath = `controlePonto/${idUser}/registros/${registroId}`;
  let fileUrl: string | null = null;
  let storagePath: string | null = null;

  const snapshot = await get(child(dbRef(this.newDb), registroPath));
  const existingData = snapshot.exists() ? snapshot.val() : {};

  if (file) {
    if (existingData.storagePath) {
      try {
        const oldFileRef = storageRef(this.storage, existingData.storagePath);
        await deleteObject(oldFileRef);
      } catch (error) {
        console.warn("Não foi possível excluir o arquivo anterior:", error);
      }
    }

    storagePath = `justificativas/${idUser}/${registroId}-${file.name}`;
    const fileRef = storageRef(this.storage, storagePath);
    const uploadTask = uploadBytesResumable(fileRef, file);

    fileUrl = await new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress?.(Math.round(percent));
        },
        (error) => reject(error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  }

  const updatePayload: any = {
    justificativa,
    statusJustificativa: statusJustificativa || "Aguardando Aprovação", // 🔹 sempre garante valor
    hasJustificativa: !!justificativa || !!fileUrl || !!existingData.fileUrl,
  };

  if (fileUrl && storagePath) {
    updatePayload.fileUrl = fileUrl;
    updatePayload.storagePath = storagePath;
  }

  await update(dbRef(this.newDb, registroPath), updatePayload);
}








}


export default new UploadStorageService();