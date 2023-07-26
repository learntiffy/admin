import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Item } from 'src/app/models/item.model';
import { Menu } from 'src/app/models/menu.model';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.css']
})
export class MenuItemsComponent implements OnInit {
  @Input() menu!: Menu;
  @Output() onClose = new EventEmitter();

  display = true;
  isItemsLoading = true;
  items: Item[] = [];

  constructor(private adminServie: AdminService) { }

  ngOnInit(): void {
    this.getMenuItems();
  }

  getMenuItems() {
    this.adminServie.getMenuItems(this.menu._id).subscribe(res => {
      if (res.status == 200) {
        this.items = res.data.items;
        this.isItemsLoading = false;
      }
    });
  }

}
