import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppConstants } from 'src/app/models/const.model';
import { AdminService } from '../../admin.service';
import { Menu } from 'src/app/models/menu.model';
import { Item } from 'src/app/models/item.model';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {
  @Input() _menu!: any;
  @Output() onSaveMenu = new EventEmitter<Menu>();
  @Output() onClose = new EventEmitter();

  mealTypes = AppConstants.MEAL_TYPES;
  display = true;

  isLoading = true;
  items: Item[] = [];
  menu: any = {
    name: null,
    meal: this.mealTypes[0],
    items: [],
  };

  constructor(private adminSerive: AdminService) { }

  ngOnInit(): void {
    this.getAllItems();
  }

  getAllItems() {
    this.adminSerive.getItem().subscribe(res => {
      if (res.status == 200) {
        this.items = res.data;
        if (this._menu) {
          const selectedItems = this.items.filter(x => this._menu.items.includes(x._id));
          const available = this.items.filter(x => !this._menu.items.includes(x._id));
          this.items = available;
          this.menu = { ...this._menu };
          this.menu.items = selectedItems;
        }
        this.isLoading = false;
      }
    })
  }

  addMenu(event: any) {
    event.target.disabled = true;
    this.menu.items = this.menu.items.map((x: any) => x._id);
    const menu: Menu = { ...this.menu };
    this.adminSerive.saveMenu(menu).subscribe((res) => {
      if (res.status == 200) {
        this.menu._id = res.data._id;
        this.onSaveMenu.emit(this.menu);
      }
    });
  }

  sortSelectedItems() {
    this.menu.items = this.menu.items.sort((a: any, b: any) => b.type.localeCompare(a.type));
  }
}