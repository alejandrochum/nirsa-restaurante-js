// import { auth } from "../firebaseConfig.js";


function loading(loading) {
    $('body').attr('hidden', true);
}

export { loading };

// auth.onAuthStateChanged((user) => {
//     if (!user) {
//         $(location).prop('href', 'login.html');
//     } else {
//         loading = false;
//     }
// });