import { Component, OnInit } from '@angular/core';
import 'rxjs/Rx';
import { storage } from 'firebase';
import { NavController } from 'ionic-angular';

import { Category } from '../../models/category';

import { IntroductionPage } from '../../pages/introduction/introduction';

import { LocalisationService } from '../../services/localisation';
import { CategoryService } from '../../services/category';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  appName = this.localeService.localise('appName');
  categoryTitle = this.localeService.localise('categoryTitle');
  orRegion = this.localeService.localise('orRegion');
  categories : Category[];

  constructor(private localeService: LocalisationService,
              private categoryService: CategoryService,
              private authService: AuthService,
              private navCtrl: NavController) {}

  ngOnInit() {
    let user = this.authService.getActiveUser();

    if (user && user.displayName === null) {
      this.navCtrl.push(IntroductionPage);
      return;
    }

    user.getToken()
      .then((token: string) => {
        this.categoryService.getCategories(token)
          .subscribe(
            (categories: Category[]) => {
              let categoryTmp = [];

              for (let i of categories) {
                storage().ref(i.img).getDownloadURL()
                  .then((url) => {
                    categoryTmp.push({
                      src: url,
                      name: this.localeService.localise(i.name),
                      order: i.order
                    });
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }

              this.categories = categoryTmp;
            },
            (error) => { console.log(error); }
          );
      });
  }
}
