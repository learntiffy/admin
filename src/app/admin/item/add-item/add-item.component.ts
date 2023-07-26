import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppConstants } from 'src/app/models/const.model';
import { Item } from 'src/app/models/item.model';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  @Input() _item!: any;
  @Output() onSaveItem = new EventEmitter<Item>();
  @Output() onClose = new EventEmitter();

  statuses = AppConstants.ITEM_STATUSES;
  types = AppConstants.ITEM_TYPES;
  display = true;

  item: any = {
    name: null,
    unit: null,
    price: null,
    type: this.types[0],
    status: this.statuses[0],
    file: null,
    filePath: null
  };

  constructor(private adminSerive: AdminService) { }

  ngOnInit(): void {
    if (this._item) this.item = { ...this._item };
  }

  addItem() {
    const item: Item = { ...this.item };
    this.adminSerive.saveItem(item).subscribe((res) => {
      if (res.status == 200) {
        this.item._id = res.data._id;
        this.item.imageURL = res.data.imageURL;
        this.onSaveItem.emit(this.item);
      }
    });
  }

  onFileChange(event: any) {
    const file = event.currentFiles[0];
    if (file) {
      if (this.item._id) this.item.isUpdateImage = true;
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = (e: any) => {
        this.item.filePath = e.target.result;
        this.item.file = file;
      };
    }
  }
}