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