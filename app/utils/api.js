import { firebaseapp } from "../utils/firebase";

export function  reauthenticate (password) {
    const user = firebaseapp.auth().currentUser;
    //emailauthprovider es de facebook, pon ese coso
    const credentials = firebaseapp.auth().EmailAuthProvider.credential(
        user.email,
        password
    );
    return user.reauthenticateWithCredential(credentials);
}