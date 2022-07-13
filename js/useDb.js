import { db } from "../firebaseConfig.js";
import { doc, getDoc, setDoc, query, where, updateDoc, collection, Timestamp, getDocs } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";

async function getuserinfo(user) {
    const docRef = doc(db, "users", user.uid);
    try {
        const doc = await getDoc(docRef);
        return (doc.data());
    } catch (error) {
        console.log(error);
    }
}

async function updatenewuser(user, _hasLoggedIn) {
    const docRef = doc(db, "users", user.uid);
    try {
        await updateDoc(docRef, { hasLoggedIn: _hasLoggedIn });
    } catch (error) {
        console.log(error);
    }
}

async function getthisperiodmeals(user) {
    const currentperiod = getcurrentperiod();
    const mealsRef = collection(db, "meals");
    let result= [];
    const q = query(mealsRef, where('user', '==', user.uid), where('date', '>=', new Date(currentperiod.start)), where('date', '<=', new Date(currentperiod.end)));

    try{
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
            result.push(doc.data());
        })
        return result;
    } catch (error) {
        return error;
    }
}

async function addmeal(user) {
    var now = new Date();
    var future = new Date();
    future = new Date(future.setDate(future.getDate() + 7));

    for (var d = now; d <= future; d.setDate(d.getDate() + 1)) {
        if (d.getDay() != 0 && d.getDay() != 6) {
            d.setHours(0, 0, 0, 0);
            console.log(new Date(d));
            let _used = Math.random() < 0.5 ? true : false;
            await setDoc(doc(db, "meals", user.uid + new Date(d)), {
                date: Timestamp.fromDate(new Date(d)),
                type: "normal",
                user: user.uid,
                used: _used,
                cancelled: false
            });
        }
    }
}


function getcurrentperiod() {
    var today = new Date();
    var period = {
        start: '',
        end: ''
    };

    if (today.getDate() <= 20) {
        period.start = today.getFullYear() + "-" + (today.getMonth()) + "-" + 21 + " 00:00:00";
        period.end = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + 20 + " 00:00:00";
    } else {
        period.start = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + 20 + " 00:00:00";
        period.end = today.getFullYear() + "-" + (today.getMonth() + 2) + "-" + 21 + " 00:00:00";
    }

    return period;
}


const useDb = {
    getuserinfo,
    updatenewuser,
    addmeal,
    getthisperiodmeals
}

export { useDb };