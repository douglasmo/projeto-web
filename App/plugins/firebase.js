
import firebase from "firebase/app"
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'


  const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
  };
   
    // Initialize Firebase
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
  
  
  //iniciar FIRESTORE
  export const db = firebase.firestore();
  export const realTime = firebase.database();
  export const auth = firebase.auth();

// export const refChat = realTime.ref("chat")
  // collection references
export const refLancamentos = db.collection('lancamentos')
export const refUsers = db.collection('users-temp')
export const refMensagens = db.collection('mensagens')
export const refFotos = db.collection('fotos')
export const refSessoes = db.collection('sessoes')
export const refConfiguracoes = db.collection('configuracoes')
export const refPedidos = db.collection('pedidos')
export const storageRef = firebase.storage()


