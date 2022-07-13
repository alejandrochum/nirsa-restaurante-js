import { useAuth } from './useAuth.js';
import { useDb } from './useDb.js';
import { auth } from '../firebaseConfig.js';

const { signin } = useAuth;
const { getuserinfo } = useDb;

auth.onAuthStateChanged(async function (user) {
    if (user) {
        const userinfo = await getuserinfo(user);
        if (userinfo.hasLoggedIn == false) {
            $(location).prop('href', 'newuser.html');
        } else {
            $(location).prop('href', 'index.html');
        }
    }
})

$('#signInForm').submit(function (e) {
    e.preventDefault();
    var email = $('#email').val();
    var password = $('#password').val();
    signin(email, password);
});

