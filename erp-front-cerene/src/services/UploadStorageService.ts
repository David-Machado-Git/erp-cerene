import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getDatabase, ref as dbRef, update, get, child, } from "firebase/database";
import { deleteObject } from "firebase/storage";

class UploadStorageService {

    private storage = getStorage();
    private db = getFirestore();
    private newDb = getDatabase();


  async uploadPhoto(
    idUser: string,
    file: File,
    onProgress?: (percent: number) => void
  ): Promise<string> {
    const fileRef = storageRef(this.storage, `profilePhotos/${idUser}/${file.name}`);
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