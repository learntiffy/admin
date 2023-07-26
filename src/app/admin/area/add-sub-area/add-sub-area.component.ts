import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppConstants } from 'src/app/models/const.model';
import { SubArea } from 'src/app/models/subarea.model';
import { AdminService } from '../../admin.service';
import { Area } from 'src/app/models/area.model';

@Component({
  selector: 'app-add-sub-area',
  templateUrl: './add-sub-area.component.html',
  styleUrls: ['./add-sub-area.component.css']
})
export class AddSubAreaComponent implements OnInit {
  @Input() _subArea!: any;
  @Input() area!: Area;
  @Output() onSaveSubArea = new EventEmitter<SubArea>();
  @Output() onClose = new EventEmitter();

  statuses = AppConstants.SUBAREA_STATUSES;
  display = true;
  subArea: any = {
    name: null,
    area: null,
    status: this.statuses[0],
  };

  constructor(private adminSerive: AdminService) { }

  ngOnInit(): void {
    if (this._subArea) this.subArea = { ...this._subArea };
    else this.subArea.area = this.area._id;
  }

  addSubArea() {
    const subArea: SubArea = { ...this.subArea };
    this.adminSerive.saveSubArea(subArea).subscribe((res) => {
      if (res.status == 200) {
        this.subArea._id = res.data._id;
        this.onSaveSubArea.emit(this.subArea);
      }
    });
  }
}