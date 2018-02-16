import { Component, OnInit } from '@angular/core';
import 'rxjs/Rx';

import { Categories } from '../../models/categories';

import { LocalisationService } from '../../services/localisation';
import { CategoryService } from '../../services/category';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  appName = this.localeService.localise('appName');

  constructor(private localeService: LocalisationService,
              private categoryService: CategoryService,
              private authService: AuthService) {}

  ngOnInit() {
    this.authService.getActiveUser().getToken()
      .then((token: string) => {
        this.categoryService.getCategories(token)
          .subscribe(
            (categories: Categories[]) => {
              console.log(categories);
            },
            (error) => { console.log(error); }
          );
      });
  }
}
