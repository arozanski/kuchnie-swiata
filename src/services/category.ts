import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthService } from './auth';
import 'rxjs/Rx';

import { Categories } from '../models/categories';

@Injectable()
export class CategoryService {
  url = 'https://kuchnie-swiata.firebaseio.com/';
  private categories: Categories[] = [];

  constructor(private authService: AuthService,
              private http: Http) {}

  getCategories(token: string) {
    return this.http.get(this.url + 'categories.json?auth=' + token)
      .map((response : Response) => {
        return response.json();
      })
      .do((data) => {
        this.categories = data
      });
  }
}