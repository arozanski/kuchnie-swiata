import firebase from 'firebase';

export class AuthService {
  signup(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  signin(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  resetPassword(email: string) {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  setEmailLanguageCode(languageCode: string) {
    firebase.auth().languageCode = languageCode;
  }

  logout(action: Function) {
    firebase.auth().signOut().then(() => {
      if(action) {
        action();
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  getActiveUser() {
    return firebase.auth().currentUser;
  }
}