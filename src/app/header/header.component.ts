import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isOpen = false;

  constructor(public appService: AppService) { }

  ngOnInit(): void {
    this.closeNav();
  }

  toggleNav() {
    this.isOpen = !this.isOpen;
    !this.isOpen ? this.closeNav() : this.openNav();
  }

  openNav() {
    document.getElementById('mySidenav')!.style.width = '200px';
  }

  closeNav() {
    document.getElementById('mySidenav')!.style.width = '0';
    document.getElementById('main')!.style.marginLeft = '0';
  }

  logout() {
    this.toggleNav();
    this.appService.logout();
  }

}
