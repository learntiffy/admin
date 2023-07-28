import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { AppConstants } from 'src/app/models/const.model';
import { User } from 'src/app/models/user.model';
// @ts-ignore
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  isLoading = true;
  statuses = AppConstants.USER_STATUSES;

  cols!: any[];
  exportColumns!: any[];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'firstName', header: 'First Name' },
      { field: 'lastName', header: 'Last Name' },
      { field: 'mobile', header: 'Mobile No.' },
      { field: 'email', header: 'Email' },
      { field: 'status', header: 'Status' },
    ];
    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));

    this.getUsers();
  }

  getUsers() {
    this.adminService.getUsers().subscribe((res) => {
      if (res.status === 200) {
        this.users = res.data;
        this.isLoading = false;
      }
    });
  }

  filter(userDt: any, event: any) {
    userDt.filterGlobal(event.target.value, 'contains');
  }

  exportPdf() {
    this.adminService.exportPdf('users.pdf', this.exportColumns, this.users);
  }

  exportExcel() {
    this.adminService.exportExcel('users', this.users);
  }

}
