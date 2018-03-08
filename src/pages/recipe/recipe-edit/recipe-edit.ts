import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { LocalisationService } from '../../../services/localisation';

@Component({
  selector: 'page-recipe-edit',
  templateUrl: 'recipe-edit.html',
})
export class RecipeEditPage implements OnInit {
  edit: Boolean;
  title: String;

  constructor(private navParams: NavParams,
              private localeService: LocalisationService,) {}

  ngOnInit() {
    this.edit = this.navParams.get('edit');
    this.title = this.edit ? this.localeService.localise('editRecipe') :
      this.localeService.localise('addRecipe');
  }
}
