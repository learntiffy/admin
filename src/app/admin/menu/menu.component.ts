import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Menu } from 'src/app/models/menu.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menu: Menu[] = [];
  selectedMenu!: any;

  isMenuLoading = true;
  showMenuModal = false;
  showMenuItemsModal = false;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getMenu();
  }

  getMenu() {
    this.isMenuLoading = true;
    this.adminService.getMenu().subscribe(res => {
      if (res.status === 200) {
        this.menu = res.data;
        this.isMenuLoading = false;
      }
    });
  }

  onViewMenuItems(menu: Menu) {
    this.selectedMenu = menu;
    this.showMenuItemsModal = true;
  }

  onEdit(menu: any) {
    this.selectedMenu = menu;
    this.showMenuModal = true;
  }

  onMenuModalClose() {
    this.selectedMenu = null;
    this.showMenuModal = false;
  }

  onSaveMenu(menu: any) {
    if (!this.selectedMenu)
      this.menu.push(menu);
    else {
      const index = this.menu.findIndex(x => x._id === menu._id);
      this.menu[index] = menu;
    }
    this.onMenuModalClose();
  }

  filter(menuDt: any, event: any) {
    menuDt.filterGlobal(event.target.value, 'contains');
  }

}

