import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Order } from 'src/app/models/order.model';
import { AppConstants } from 'src/app/models/const.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders!: Order[];
  isLoading = true;
  statuses = AppConstants.ORDER_STATUSES;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.isLoading = true;
    const date = 'date';
    this.adminService.getOrders(date).subscribe(res => {
      if (res.status === 200) {
        this.orders = res.data;
        this.isLoading = false;
      }
    });
  }

  filter(orderDt: any, event: any) {
    orderDt.filterGlobal(event.target.value, 'contains');
  }

  exportPdf() {
    // this.adminService.exportPdf('orders.pdf', this.exportColumns, this.orders);
  }

  exportExcel() {
    this.adminService.exportExcel('orders', this.orders);
  }

}
