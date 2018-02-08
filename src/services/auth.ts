import firebase from 'firebase';

export class AuthService {
  firebase = firebase.auth();

  signup(email: string, password: string) {
    return this.firebase.createUserWithEmailAndPassword(email, password);
  }

  signin(email: string, password: string) {
    return this.firebase.signInWithEmailAndPassword(email, password);
  }

  resetPassword(email: string) {
    return this.firebase.sendPasswordResetEmail(email);
  }

  setEmailLanguageCode(languageCode: string) {
    this.firebase.languageCode = languageCode;
  }
}