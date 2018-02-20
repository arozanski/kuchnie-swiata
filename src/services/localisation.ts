export class LocalisationService {
  locale = 'pl-PL';

  labels = {
    appName : {
      'en-GB' : 'Cooking adventures',
      'pl-PL' : 'Kuchnie świata'
    },
    email : {
      'en-GB' : 'Email address',
      'pl-PL' : 'Adres e-mail'
    },
    password : {
      'en-GB' : 'Password',
      'pl-PL' : 'Hasło'
    },
    submit : {
      'en-GB' : 'Sign in',
      'pl-PL' : 'Zaloguj'
    },
    signupLine1 : {
      'en-GB' : 'Don\'t you have an account?',
      'pl-PL' : 'Nie masz jeszcze konta?'
    },
    signupLine2 : {
      'en-GB' : 'Takes ~5 seconds to create one',
      'pl-PL' : 'Tylko ~5 sekund aby założyć'
    },
    here : {
      'en-GB' : 'here',
      'pl-PL' : 'tutaj'
    },
    signupTitle : {
      'en-GB' : 'Sign up',
      'pl-PL' : 'Rejestracja'
    },
    signup : {
      'en-GB' : 'Signup',
      'pl-PL' : 'Zarejestruj'
    },
    signupProgress : {
      'en-GB' : 'Signing you up..',
      'pl-PL' : 'Rejestruję konto'
    },
    signupError : {
      'en-GB' : 'Signup error',
      'pl-PL' : 'Błąd rejestracji'
    },
    signupConfirmation : {
      'en-GB' : 'Account successfully created',
      'pl-PL' : 'Rejestracja zakończona pomyślnie'
    },
    emailInvalid : {
      'en-GB' : 'Email format is invalid',
      'pl-PL' : 'Niepoprawny adres email'
    },
    passwordInvalid : {
      'en-GB' : 'Password too short',
      'pl-PL' : 'Za krótkie hasło'
    },
    signinProgress : {
      'en-GB' : 'Signing in',
      'pl-PL' : 'Logowanie'
    },
    signinError : {
      'en-GB' : 'Signin error',
      'pl-PL' : 'Błąd logowania'
    },
    signinTitle : {
      'en-GB' : 'Sign in',
      'pl-PL' : 'Zaloguj się'
    },
    resetPassword : {
      'en-GB' : 'Don\'t remember password? Reset',
      'pl-PL' : 'Nie pamiętasz hasła? Zresetuj'
    },
    resetPwdTitle : {
      'en-GB' : 'Reset password',
      'pl-PL' : 'Przypomnienie hasła'
    },
    resetPwdLbl : {
      'en-GB' : 'Reset',
      'pl-PL' : 'Resetuj'
    },
    resetProgress : {
      'en-GB' : 'Resetting',
      'pl-PL' : 'Resetuję'
    },
    resetError : {
      'en-GB' : 'Unable to reset. Have you used correct email?',
      'pl-PL' : 'Błąd. Czy aby napewno poprawny email?'
    },
    resetConfirmation : {
      'en-GB' : 'Email with reset link has been sent. Check mailbox.',
      'pl-PL' : 'Wiadomość z linkem do resetowania hasła wysłana. Sprawdź skrzynkę pocztowa'
    },
    recipies : {
      'en-GB' : 'Recipies',
      'pl-PL' : 'Przepisy'
    },
    logout : {
      'en-GB' : 'Logout',
      'pl-PL' : 'Wyloguj'
    },
    settings : {
      'en-GB' : 'User settings',
      'pl-PL' : 'Profil użytkownika'
    },
    configuration : {
      'en-GB' : 'User profile configuration',
      'pl-PL' : 'Konfiguracja profilu użytkownika'
    },
    userName : {
      'en-GB' : 'Username',
      'pl-PL' : 'Nazwa użytkownika'
    },
    confInfoMessage1 : {
      'en-GB' : 'Just quick user profile configuration.',
      'pl-PL' : 'Szybka konfiguracja profilu użytkownika.'
    },
    confInfoMessage2 : {
      'en-GB' : 'Please choose your username. You can change it later in user settings.',
      'pl-PL' : 'Podaj nazwe użytkownika. Bedziesz mogł(a) zmienić to później na profilu użytkownika.'
    },
    confInfoMessage3 : {
      'en-GB' : 'Last thing, choose one of the avatars',
      'pl-PL' : 'Ostatni krok, wybierz jeden z awatarów'
    },
    confInfoMessage4 : {
      'en-GB' : 'or take a picture!',
      'pl-PL' : 'albo zrób sobie zdjęcie!'
    },
    userNameInvalid : {
      'en-GB' : 'Username too short',
      'pl-PL' : 'Nazwa użytkownika za krótka'
    },
    next : {
      'en-GB' : 'Next step',
      'pl-PL' : 'Kolejny krok'
    },
    finish : {
      'en-GB' : 'Finish setup',
      'pl-PL' : 'Zakończ konfigurację'
    },
    close : {
      'en-GB' : 'Close',
      'pl-PL' : 'Zamknij'
    }
  }

  getLocale() {
    return this.locale;
  }

  setLocale(locale: string) {
    this.locale = locale;
  }

  getLabel(label: string, locale: string) {
    return this.labels[label][locale];
  }

  localise(label: string) {
    return this.getLabel(label, this.getLocale());
  }
}