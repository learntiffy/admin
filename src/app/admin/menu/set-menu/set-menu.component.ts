import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Menu } from 'src/app/models/menu.model';

@Component({
  selector: 'app-set-menu',
  templateUrl: './set-menu.component.html',
  styleUrls: ['./set-menu.component.css']
})
export class SetMenuComponent implements OnInit {

  todayDate!: Date;
  tomoDate!: Date;

  isLoading = true;
  menuDays: any = {};

  showMenuModal = false;
  showMenuItemsModal = false;
  showMenuSelectionModal = false;
  selectedMenu: any = null;

  menuDay: any;
  meal: any

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.setDates();
    this.getMenuByDay();
  }

  setDates() {
    this.todayDate = new Date();
    const tomoDate = new Date();
    tomoDate.setDate(tomoDate.getDate() + 1);
    this.tomoDate = tomoDate;
  }

  getMenuByDay() {
    this.adminService.getMenuByDay().subscribe(res => {
      if (res.status == 200) {
        this.menuDays = res.data;
        this.isLoading = false;
      }
    })
  }

  onViewMenuItems(menu: Menu) {
    this.selectedMenu = menu;
    this.showMenuItemsModal = true;
  }

  onEdit(menu: any) {
    this.selectedMenu = menu;
    this.showMenuModal = true;
  }

  onMenuSelection(menuDay: any, meal: any) {
    this.menuDay = menuDay;
    this.meal = meal;
    this.showMenuSelectionModal = true;
  }

}
