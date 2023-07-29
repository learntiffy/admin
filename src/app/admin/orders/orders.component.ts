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

  date!: Date;
  maxDate!: Date;

  orders!: Order[];
  orderData: any;
  isLoading = true;

  exportColumns: any;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.exportColumns = [
      { title: 'User', dataKey: 'user' },
      { title: 'Contact', dataKey: 'contact' },
      { title: 'Items', dataKey: '_items' },
      { title: 'Address', dataKey: 'address' },
      { title: 'Amount', dataKey: 'amount' },
      { title: 'Meal', dataKey: 'meal' }
    ];
    this.setDates()
    this.getOrders();
  }

  setDates() {
    this.date = new Date();
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 1);
    this.maxDate = maxDate;
  }

  getOrders() {
    this.orders = [];
    this.isLoading = true;
    this.adminService.getOrders(this.date).subscribe(res => {
      if (res.status === 200) {
        this.orders = res.data;
        this.orderData = this.orders.map(x => this.mapOrderToOrderData(x));
        this.isLoading = false;
      }
    });
  }

  mapOrderToOrderData(order: Order) {
    const user = order.user;
    const address = order.address;
    const feedback = order.feedback;
    const orderData = {
      user: `${user.firstName} ${user.lastName}`,
      contact: user.mobile,
      address: `${address.homeNo}, ${address.society}, ${address.landmark}, ${address.subArea.name}, ${address.area.name} - ${address.area.pincode}`,
      area: `${address.subArea.name}, ${address.area.name}`,
      amount: order.amount,
      meal: order.meal,
      items: order.items.map(x => x.name),
      _items: order.items.map(x => x.name).toString(),
      orderDate: order.orderDate,
      rating: feedback ? feedback.foodRating : null,
      comment: feedback ? feedback.comment : null
    };
    return orderData;
  }

  filter(orderDt: any, event: any) {
    orderDt.filterGlobal(event.target.value, 'contains');
  }

  exportPdf() {
    this.adminService.exportPdf('orders.pdf', this.exportColumns, this.orderData);
  }

  exportExcel() {
    this.adminService.exportExcel('orders', this.orderData);
  }

}
