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

  constructor(private adminService: AdminService) {}

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
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then((x) => {
        const doc = new jsPDF.jsPDF('p', 'in', [8.5, 12.9]);
        (doc as any).autoTable(this.exportColumns, this.users);
        doc.save('products.pdf');
      });
    });
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.users);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'products');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }
}
