import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { PrimeNGConfig } from 'primeng/api';
import { AppService } from './shared/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router, private primengConfig: PrimeNGConfig, private appService: AppService) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.checkLoginStatus();
      }
    });
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  checkLoginStatus() {
    const token = localStorage.getItem('token');
    token ? this.appService.login() : this.appService.logout();
  }
}
