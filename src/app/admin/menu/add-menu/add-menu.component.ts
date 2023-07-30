import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppConstants } from 'src/app/models/const.model';
import { AdminService } from '../../admin.service';
import { Menu } from 'src/app/models/menu.model';
import { Item } from 'src/app/models/item.model';
import { ItemType } from 'src/app/models/itemtypes.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css'],
  providers: [MessageService]
})
export class AddMenuComponent implements OnInit {
  @Input() _menu!: any;
  @Output() onSaveMenu = new EventEmitter<Menu>();
  @Output() onClose = new EventEmitter();

  mealTypes = AppConstants.MEAL_TYPES;
  display = true;

  isLoading = true;
  isSaving = false;

  items: Item[] = [];
  menu: any = {
    name: null,
    meal: this.mealTypes[0],
    items: [],
  };

  constructor(private adminSerive: AdminService, private messageService: MessageService) { }

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

  addMenu() {
    if (!this.isValidMenu(this.menu)) return;
    this.menu.items = this.menu.items.map((x: any) => x._id);
    const menu: Menu = { ...this.menu };
    this.isSaving = true;
    this.adminSerive.saveMenu(menu).subscribe((res) => {
      if (res.status == 200) {
        this.menu._id = res.data._id;
        this.onSaveMenu.emit(this.menu);
      }
    });
  }

  isValidMenu(menu: any) {
    let sabjiCnt = 0, rotiCnt = 0, dalCnt = 0, riceCnt = 0;
    for (let item of menu.items) {
      const type: keyof typeof ItemType = item.type;
      switch (ItemType[type]) {
        case ItemType.SABJI:
          sabjiCnt++;
          break;
        case ItemType.ROTI:
          rotiCnt++;
          break;
        case ItemType.DAL:
          dalCnt++;
          break;
        case ItemType.RICE:
          riceCnt++;
          break;
      }
    }

    let invalid = false, minCnt, type;
    if (sabjiCnt < 2) {
      invalid = true; minCnt = 2; type = 'Sabji';
    } else if (rotiCnt < 1) {
      invalid = true; minCnt = 1; type = 'Roti';
    } else if (dalCnt < 1) {
      invalid = true; minCnt = 1; type = 'Dal';
    } else if (riceCnt < 1) {
      invalid = true; minCnt = 1; type = 'Rice';
    }

    if (invalid)
      this.messageService.add({ severity: 'error', detail: `Please select atleast ${minCnt} ${type}.` });
    return !invalid;
  }

  sortSelectedItems() {
    this.menu.items = this.menu.items.sort((a: any, b: any) => b.type.localeCompare(a.type));
  }
}