import { Injectable } from '@angular/core';
import { AuthService } from './auth';

@Injectable()
export class UserService {
  constructor(private authService: AuthService) {}

  updateUserName(name: string) {
    let user = this.authService.getActiveUser();

    return user.updateProfile({
      displayName: name,
      photoURL: ''
    });
  }

  getUID() {
    return this.authService.getActiveUser().uid;
  }
}