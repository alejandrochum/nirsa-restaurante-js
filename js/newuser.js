import { useAuth } from './useAuth.js';
import { useDb } from './useDb.js';
import { auth } from '../firebaseConfig.js';

const { getuserinfo, updatenewuser } = useDb;
const { getuser, updatepassword } = useAuth;

auth.onAuthStateChanged(async function (user) {
    if (user) {
        const userinfo = await getuserinfo(user);
        if (userinfo.hasLoggedIn == true) {
            $(location).prop('href', 'index.html');
        }
    }
})

$('#updatePassword').submit(function (e) {
    e.preventDefault();
    var password = $('#password').val();
    if (password.length < 6) {
        alert("Password must be at least 6 characters long");
        return;
    }
    updatepassword(getuser(), password).then(function () {
        //update user
        updatenewuser(getuser(), true).then(function () {
            $('#toChange').html(`<div class="col-lg-6 col-12 p-0">
            <div class="card rounded-0 mb-0 px-2 py-1">
                <div class="card-header pb-1">
                    <div class="card-title">
                        <h4 class="mb-0">!Felicidades!</h4>
                    </div>
                </div>
                <p class="px-2 mb-0">Tu nueva contraseña ha sido registrada actualizada exitosamente. <br>Ahora da click en el botón ingresar.</p>
                
                <div class="card-content">
                    <div class="card-body">
                        
                        <div class="float-md-right d-block mb-1">
                            <button id="ingresar" class="btn btn-primary btn-block px-75">Ingresar</button>
                        </div>
                        
                    </div>
                </div>
                
            </div>
        </div>`);
        }).catch(function (error) {
            console.log(error);
        })
        //got to index
    }).catch(function (error) {
        console.log(error)
    });
});

// $('#ingresar').on('click', function () {
//     console.log("click");
// })

$(document).on('click', '#ingresar', function(){ 
    $(location).prop('href', 'index.html');
});