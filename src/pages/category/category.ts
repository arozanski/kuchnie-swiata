import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from 'ionic-angular';

import { RecipeEditPage } from '../recipe/recipe-edit/recipe-edit';

import { LocalisationService } from '../../services/localisation';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage implements OnInit {
  categoryLabel: string;
  categoryName: string;
  category = this.localeService.localise('category');
  loadingRecipies = this.localeService.localise('loadingRecipies');

  constructor(private navParams: NavParams,
              private localeService: LocalisationService,
              public modalController: ModalController) {}

  ngOnInit() {
    this.categoryLabel = this.navParams.get('categoryLabel');
    this.categoryName = this.navParams.get('categoryName');
  }

  onAddRecipe() {
    const modal = this.modalController.create(RecipeEditPage, { edit: false });

    modal.present();
  }
}
