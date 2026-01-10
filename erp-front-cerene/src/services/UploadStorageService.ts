import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, updateDoc } from "firebase/firestore";


class UploadStorageService {

    private storage = getStorage();
    private db = getFirestore();


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




}


export default new UploadStorageService();