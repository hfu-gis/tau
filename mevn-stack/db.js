import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAbhabCHS506aXLvv04tkw0sPa9VL5VnCY",
    authDomain: "hfu-tau.firebaseapp.com",
    databaseURL: "https://hfu-tau.firebaseio.com",
    projectId: "hfu-tau",
    storageBucket: "hfu-tau.appspot.com",
    messagingSenderId: "552563339663",
    appId: "1:552563339663:web:6026f25eeb1c3456549bfa"
}

export const db = firebase.initializeApp(firebaseConfig).firestore
//Not always necessary
const {TimeStamp, GeoPoint } = firebase.firestore
export {TimeStamp, GeoPoint}