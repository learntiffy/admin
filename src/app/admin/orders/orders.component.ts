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

  stats: any;
  showStats = false;

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
      comment: order.comment,
      orderDate: order.orderDate,
      rating: feedback ? feedback.foodRating : null,
      feedback: feedback ? feedback.comment : null
    };
    return orderData;
  }

  onShowStats() {
    this.stats = {};
    for (const order of this.orderData)
      for (const item of order.items)
        this.stats[item] = this.stats[item] ? (this.stats[item] + 1) : 1;

    const stats = [];
    for (const [key, value] of Object.entries(this.stats)) {
      stats.push({ item: key, count: value });
    }
    this.stats = stats;
    this.stats = this.stats.sort((a: any, b: any) => b.count - a.count);
    this.showStats = true;
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
