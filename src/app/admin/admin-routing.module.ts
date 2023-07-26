import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AreaComponent } from './area/area.component';
import { ItemComponent } from './item/item.component';
import { MenuComponent } from './menu/menu.component';
import { SetMenuComponent } from './menu/set-menu/set-menu.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'login',
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
            },
            {
                path: 'users',
                component: UsersComponent,
            },
            {
                path: 'area',
                component: AreaComponent,
            },
            {
                path: 'item',
                component: ItemComponent,
            },
            {
                path: 'menu',
                component: MenuComponent,
            },
            {
                path: 'set-menu',
                component: SetMenuComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule { }
