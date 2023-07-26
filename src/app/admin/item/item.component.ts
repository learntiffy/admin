import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { AppConstants } from 'src/app/models/const.model';
import { Item } from 'src/app/models/item.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  item: Item[] = [];
  selectedItem!: any;

  isItemLoading = true;
  showItemModal = false;

  statuses = AppConstants.ITEM_STATUSES;
  types = AppConstants.ITEM_TYPES;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getItem();
  }

  getItem() {
    this.isItemLoading = true;
    this.adminService.getItem().subscribe(res => {
      if (res.status === 200) {
        this.item = res.data;
        this.isItemLoading = false;
      }
    });
  }

  onEdit(area: any) {
    this.selectedItem = area;
    this.showItemModal = true;
  }

  onItemModalClose() {
    this.selectedItem = null;
    this.showItemModal = false;
  }

  onSaveItem(item: any) {
    if (!this.selectedItem)
      this.item.push(item);
    else {
      const index = this.item.findIndex(x => x._id === item._id);
      this.item[index] = item;
    }
    this.onItemModalClose();
  }

  filter(areaDt: any, event: any) {
    areaDt.filterGlobal(event.target.value, 'contains');
  }

}
