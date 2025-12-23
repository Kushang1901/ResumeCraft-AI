import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export function subscribeToAuthChanges(callback) {
    onAuthStateChanged(auth, (user) => {
        callback(user);
    });
}
