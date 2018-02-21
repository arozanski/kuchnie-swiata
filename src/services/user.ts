import { Injectable } from '@angular/core';
import { AuthService } from './auth';

import { User } from '../models/user';

@Injectable()
export class UserService {
  constructor(private authService: AuthService) {}

  updateUserName(user: User) {
    let activeUser = this.authService.getActiveUser();

    return activeUser.updateProfile({
      displayName: user.displayName,
      photoURL: user.photoURL
    });
  }

  getUID() {
    return this.authService.getActiveUser().uid;
  }
}