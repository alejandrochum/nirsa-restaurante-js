import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js"
import { getFirestore, enableIndexedDbPersistence  } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js"
import { getAuth } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js"

const firebaseConfig = {
    apiKey: "AIzaSyAX42f9KtTSbVMasN4QQ78gd2mK568fxJs",
    authDomain: "nirsa-cocina.firebaseapp.com",
    projectId: "nirsa-cocina",
    storageBucket: "nirsa-cocina.appspot.com",
    messagingSenderId: "825414074000",
    appId: "1:825414074000:web:67c4561d23cf049d8ae215"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

enableIndexedDbPersistence(db)
  .catch((err) => {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
  });

export { db, auth };
