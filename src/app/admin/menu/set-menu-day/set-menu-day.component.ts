import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Menu } from 'src/app/models/menu.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-set-menu-day',
  templateUrl: './set-menu-day.component.html',
  styleUrls: ['./set-menu-day.component.css'],
  providers: [MessageService]
})
export class SetMenuDayComponent implements OnInit {
  @Input() menuDay: any;
  @Input() meal: any;
  @Output() onSaveMenuDay = new EventEmitter<any>();
  @Output() onClose = new EventEmitter();

  display = true;

  menu = [];
  selectedMenu: any;
  isMenuLoading = true;

  showMenuItemsModal = false;

  constructor(private adminService: AdminService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getMenu();
  }

  getMenu() {
    this.adminService.getMenu().subscribe(res => {
      if (res.status === 200) {
        this.menu = res.data;
        this.menu = this.menu.filter((x: any) => x.meal === this.meal.toUpperCase())
        this.isMenuLoading = false;
      }
    });
  }

  saveMenuDay() {
    if (this.selectedMenu) {
      const menuDay = { ...this.menuDay };
      this.menuDay.menu = this.selectedMenu;
      menuDay.menu = this.selectedMenu._id;
      this.adminService.saveMenuDay(menuDay).subscribe(res => { });
      this.onClose.emit();
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select the menu' });
    }
  }

  onViewMenuItems(menu: Menu) {
    this.selectedMenu = menu;
    this.showMenuItemsModal = true;
  }

}
