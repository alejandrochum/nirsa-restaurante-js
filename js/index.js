import { useAuth } from "./useAuth.js";
import { useDb } from "./useDb.js";

const { getthisperiodmeals, addmeal } = useDb;
const { signout } = useAuth;
let requested = 0;
let used = 0;
let notused = 0;
let todaymeal = null;

$(document).ready(function () {
    const timeoutId = setTimeout(
        function () {
            let user = useAuth.getuser();
            if (user) {
                // getmeals(user);
                addmeal(user);
            }
        }, 1000);
})

async function getmeals(user) {
    await getthisperiodmeals(user).then(function (result) {
        requested = result.length;
        if (result.length > 0) {
            result.forEach(function (meal) {
                if (meal.used) {
                    used++;
                }
                if (meal.date.toDate().getDate() == new Date().getDate()) {
                    todaymeal = meal.type;
                }
                if (todaymeal == null || todaymeal == undefined) {
                    todaymeal = "No meal today";
                }
            })
        }
        notused = requested - used;
    })
    console.log("used: " + used)
    $('#usedMeals').text(used);
    console.log("requested: " + requested)
    $('#requestedMeals').text(requested);
    console.log("notused: " + notused)
    $('#notusedMeals').text(notused);
    console.log("todaymeal: " + todaymeal)
    $('#todayMeal').text(todaymeal);
}


$('#signOut').click(function () {
    signout();
});