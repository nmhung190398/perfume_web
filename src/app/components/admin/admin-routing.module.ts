import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminLayoutComponent} from './admin-layout';
import {CategoryComponent} from "./category/category.component";
import {ProductListComponent} from "./product/list/product-list.component";
import {ProductDetailComponent} from "./product/detail/product-detail.component";
import {ProducerComponent} from "./producer/producer.component";
import {CheckoutComponent} from "./checkout/checkout.component";

const routes: Routes = [

    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: 'category',
                component: CategoryComponent
            },
            {
                path: 'product',
                component: ProductListComponent
            },
            {
                path: 'product/add',
                component: ProductDetailComponent
            },
            {
                path: 'product/edit/:id',
                component: ProductDetailComponent
            },
            {
                path: 'producer',
                component: ProducerComponent
            },
            {
                path: 'checkout/:status',
                component: CheckoutComponent
            },
            {
                path: 'base',
                loadChildren: () => import('./base/base.module').then(m => m.BaseModule)
            },
            {
                path: 'buttons',
                loadChildren: () => import('./buttons/buttons.module').then(m => m.ButtonsModule)
            },
            {
                path: 'charts',
                loadChildren: () => import('./chartjs/chartjs.module').then(m => m.ChartJSModule)
            },
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
            },
            {
                path: 'icons',
                loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule)
            },
            {
                path: 'notifications',
                loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule)
            },
            {
                path: 'theme',
                loadChildren: () => import('./theme/theme.module').then(m => m.ThemeModule)
            },
            {
                path: 'widgets',
                loadChildren: () => import('./widgets/widgets.module').then(m => m.WidgetsModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
