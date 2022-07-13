import { auth, db } from "../firebaseConfig.js";
import { onSnapshot, doc } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";
import { signInWithEmailAndPassword, updatePassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";


onAuthStateChanged(auth, (user) => {
    if (!user) {
        if ($(location).attr('pathname') != '/login.html') {
            $(location).prop('href', 'login.html');
        }
        localStorage.clear();
    } else {
        onSnapshot(doc(db, "users", user.uid), (doc) => {
            if(doc.data()){
                localStorage.setItem('user', JSON.stringify(doc.data()));
            }
        })
    }
});


function signout() {
    auth.signOut();
}

function signin(email, password) {
    signInWithEmailAndPassword(auth, email, password);
}

function getuser() {
    return auth.currentUser;
}

function updatepassword(currentUser, password) {
    return updatePassword(currentUser, password);
}

const useAuth = {
    signout,
    signin,
    getuser,
    updatepassword,
}

export { useAuth };
