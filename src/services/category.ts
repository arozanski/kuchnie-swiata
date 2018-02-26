import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Category } from '../models/category';

@Injectable()
export class CategoryService {
  url = 'https://kuchnie-swiata.firebaseio.com/';
  private categories: Category[];

  constructor(private http: Http) {}

  getCategories(token: string) {
    return this.http.get(this.url + 'categories.json?auth=' + token)
      .map((response: Response) => {
        return response.json();
      })
      .do((data) => {
        this.categories = data;
      });
  }
}