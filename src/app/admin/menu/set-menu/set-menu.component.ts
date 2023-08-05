import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Menu } from 'src/app/models/menu.model';
import { ConfirmationService } from 'primeng/api';
import { MenuDay } from 'src/app/models/const.model';

@Component({
  selector: 'app-set-menu',
  templateUrl: './set-menu.component.html',
  styleUrls: ['./set-menu.component.css'],
  providers: [ConfirmationService]
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

  constructor(
    private adminService: AdminService,
    private confirmationService: ConfirmationService
  ) { }

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

  onUnset(menuDay: any) {
    const day: keyof typeof MenuDay = menuDay.day;
    this.confirmationService.confirm({
      message: `Are you sure that you want to disable the menu? After disabling the menu, User won't be able to place the order for ${MenuDay[day]}.`,
      accept: () => {
        this.unsetMenuDay(menuDay);
      }
    });

  }

  unsetMenuDay(menuDay: any) {
    menuDay.menu = menuDay.menu._id;
    menuDay.isSet = false;
    this.adminService.saveMenuDay(menuDay).subscribe(res => { });
  }

}
