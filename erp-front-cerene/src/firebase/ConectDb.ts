// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyDtQPz_803mEhtQeyeMIq5Lq3TfjCr6eXA",
//   authDomain: "cerene---controle-ponto.firebaseapp.com",
//   projectId: "cerene---controle-ponto",
//   storageBucket: "cerene---controle-ponto.firebasestorage.app",
//   messagingSenderId: "178063194458",
//   appId: "1:178063194458:web:60b59f7c445b7491849b63",
//   measurementId: "G-LEVK6PEJXY"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// import { createUserWithEmailAndPassword } from "firebase/auth";

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDtQPz_803mEhtQeyeMIq5Lq3TfjCr6eXA",
  authDomain: "cerene---controle-ponto.firebaseapp.com",
  projectId: "cerene---controle-ponto",
  storageBucket: "cerene---controle-ponto.firebasestorage.app",
  messagingSenderId: "178063194458",
  appId: "1:178063194458:web:60b59f7c445b7491849b63",
  measurementId: "G-LEVK6PEJXY"
};



// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const dbrt = getDatabase(app); // ✅ precisa ser getDatabase
const storage = getStorage(app);

// Inicializa Analytics (opcional, só funciona em navegador)
if (typeof window !== 'undefined') {
  getAnalytics(app);
}

// Inicializa Auth e testa conexão
const auth = getAuth(app);
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     console.log("✅ Conectado ao Firebase! Usuário logado:", user.email);
//   } else {
//     console.log("✅ Conexão com Firebase OK, mas nenhum usuário logado.");
//   }
// });


export { app, auth, db, storage, dbrt };


// createUserWithEmailAndPassword(auth, "teste@teste.com", "123456")
//   .then(userCredential => {
//     console.log("Usuário criado:", userCredential.user);
//   })
//   .catch(error => {
//     console.error("Erro ao criar usuário:", error.message);
//   });

// createUserWithEmailAndPassword();