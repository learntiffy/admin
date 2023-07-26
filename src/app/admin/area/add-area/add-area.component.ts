import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Area } from 'src/app/models/area.model';
import { AdminService } from '../../admin.service';
import { AppConstants } from 'src/app/models/const.model';

@Component({
  selector: 'app-add-area',
  templateUrl: './add-area.component.html',
  styleUrls: ['./add-area.component.css'],
})
export class AddAreaComponent implements OnInit {
  @Input() _area!: any;
  @Output() onSaveArea = new EventEmitter<Area>();
  @Output() onClose = new EventEmitter();

  statuses = AppConstants.AREA_STATUSES;
  display = true;
  area: any = {
    name: null,
    pincode: null,
    status: this.statuses[0],
  };

  constructor(private adminSerive: AdminService) { }

  ngOnInit(): void {
    if (this._area) this.area = { ...this._area };
  }

  addArea() {
    const area: Area = { ...this.area };
    this.adminSerive.saveArea(area).subscribe((res) => {
      if (res.status == 200) {
        this.area._id = res.data._id;
        this.onSaveArea.emit(this.area);
      }
    });
  }
}
