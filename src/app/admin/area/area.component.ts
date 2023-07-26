import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Area } from 'src/app/models/area.model';
import { AppConstants } from 'src/app/models/const.model';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  area: Area[] = [];
  selectedArea!: any;

  isAreaLoading = true;
  showAreaModal = false;
  showSubAreaModal = false;

  statuses = AppConstants.AREA_STATUSES;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getArea();
  }

  getArea() {
    this.isAreaLoading = true;
    this.adminService.getArea().subscribe(res => {
      if (res.status === 200) {
        this.area = res.data;
        this.isAreaLoading = false;
      }
    });
  }

  onEdit(area: any) {
    this.selectedArea = area;
    this.showAreaModal = true;
  }

  onViewSubArea(area: any) {
    this.selectedArea = area;
    this.showSubAreaModal = true;
  }

  onAreaModalClose() {
    this.selectedArea = null;
    this.showAreaModal = false;
  }

  onSubAreaModalClose() {
    this.selectedArea = null;
    this.showSubAreaModal = false;
  }

  onSaveArea(area: any) {
    if (!this.selectedArea)
      this.area.push(area);
    else {
      const index = this.area.findIndex(x => x._id === area._id);
      this.area[index] = area;
    }
    this.onAreaModalClose();
  }

  filter(areaDt: any, event: any) {
    areaDt.filterGlobal(event.target.value, 'contains');
  }

}
