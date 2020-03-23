import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminLayoutComponent} from './admin-layout';

const routes: Routes = [

    {
        path: '',
        component: AdminLayoutComponent,
        children: [
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
