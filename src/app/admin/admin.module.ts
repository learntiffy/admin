import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { PickListModule } from 'primeng/picklist';
import { DragDropModule } from 'primeng/dragdrop';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressBarModule } from 'primeng/progressbar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AreaComponent } from './area/area.component';
import { AddAreaComponent } from './area/add-area/add-area.component';
import { SubAreaComponent } from './area/sub-area/sub-area.component';
import { AddSubAreaComponent } from './area/add-sub-area/add-sub-area.component';
import { ItemComponent } from './item/item.component';
import { AddItemComponent } from './item/add-item/add-item.component';
import { MenuComponent } from './menu/menu.component';
import { AddMenuComponent } from './menu/add-menu/add-menu.component';
import { MenuItemsComponent } from './menu/menu-items/menu-items.component';
import { SetMenuComponent } from './menu/set-menu/set-menu.component';
import { SetMenuDayComponent } from './menu/set-menu-day/set-menu-day.component';
import { UsersComponent } from './users/users.component';
import { UserChartComponent } from './dashboard/user-chart/user-chart.component';
import { OrderChartComponent } from './dashboard/order-chart/order-chart.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AreaComponent,
    AddAreaComponent,
    SubAreaComponent,
    AddSubAreaComponent,
    ItemComponent,
    AddItemComponent,
    MenuComponent,
    AddMenuComponent,
    MenuItemsComponent,
    SetMenuComponent,
    SetMenuDayComponent,
    UsersComponent,
    UserChartComponent,
    OrderChartComponent,
    OrdersComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    ChartModule,
    TableModule,
    ToastModule,
    RatingModule,
    DialogModule,
    RippleModule,
    ButtonModule,
    SidebarModule,
    TooltipModule,
    CalendarModule,
    DropdownModule,
    PickListModule,
    DragDropModule,
    InputTextModule,
    FileUploadModule,
    ProgressBarModule,
    OverlayPanelModule,
    SelectButtonModule,
    InputTextareaModule
  ]
})
export class AdminModule { }
