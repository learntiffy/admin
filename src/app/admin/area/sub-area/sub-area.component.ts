import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdminService } from '../../admin.service';
import { SubArea } from 'src/app/models/subarea.model';
import { AppConstants } from 'src/app/models/const.model';
import { Area } from 'src/app/models/area.model';

@Component({
  selector: 'app-sub-area',
  templateUrl: './sub-area.component.html',
  styleUrls: ['./sub-area.component.css']
})
export class SubAreaComponent implements OnInit {
  @Input() area!: Area;
  @Output() onClose = new EventEmitter();

  display = true;

  subArea: SubArea[] = [];
  selectedSubArea!: any;

  isSubAreaLoading = true;
  showSubAreaModal = false;

  statuses = AppConstants.SUBAREA_STATUSES;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getSubArea();
  }

  getSubArea() {
    this.isSubAreaLoading = true;
    this.adminService.getSubArea(this.area._id).subscribe(res => {
      if (res.status === 200) {
        this.subArea = res.data;
        this.isSubAreaLoading = false;
      }
    });
  }

  onEdit(subArea: any) {
    this.selectedSubArea = subArea;
    this.showSubAreaModal = true;
  }

  onSubAreaModalClose() {
    this.selectedSubArea = null;
    this.showSubAreaModal = false;
  }

  onSaveSubArea(subArea: any) {
    if (!this.selectedSubArea)
      this.subArea.push(subArea);
    else {
      const index = this.subArea.findIndex(x => x._id === subArea._id);
      this.subArea[index] = subArea;
    }
    this.onSubAreaModalClose();
  }

  filter(subAreaDt: any, event: any) {
    subAreaDt.filterGlobal(event.target.value, 'contains');
  }

}
