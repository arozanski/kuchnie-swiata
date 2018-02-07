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
    signinProgress : {
      'en-GB' : 'Signing in',
      'pl-PL' : 'Logowanie'
    },
    signinError : {
      'en-GB' : 'Signin error',
      'pl-PL' : 'Błąd logowania'
    },
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