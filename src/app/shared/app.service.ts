import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public isLoggedIn = false;

  constructor(private router: Router) { }

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    localStorage.clear();
    this.isLoggedIn = false;
    this.router.navigateByUrl('/');
  }

}
