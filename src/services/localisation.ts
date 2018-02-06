export class LocalisationService {
  locale = 'pl';

  labels = {
    appName : {
      en : 'My cooking',
      pl : 'Kuchnie swiata'
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

  public localise(label: string) {
    return this.getLabel(label, this.getLocale());
  }
}