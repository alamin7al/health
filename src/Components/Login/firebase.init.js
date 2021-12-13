import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

const initialaizeFirebase=()=>{
    initializeApp(firebaseConfig);
}
export default initialaizeFirebase