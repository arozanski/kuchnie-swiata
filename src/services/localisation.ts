export class LocalisationService {
  locale = 'pl-PL';

  labels = {
    appName : {
      'en-GB' : 'Cooking adventures',
      'pl-PL' : 'Kuchnie świata'
    }
  }

  getLocale() {
    return this.locale;
  }

  public setLocale(locale: string) {
    this.locale = locale;
  }

  getLabel(label: string, locale: string) {
    return this.labels[label][locale];
  }

  public localise(label: string) {
    return this.getLabel(label, this.getLocale());
  }
}