import {NgModule} from '@angular/core';
import {CommonModule, HashLocationStrategy, LocationStrategy} from "@angular/common";
import {AppAsideModule, AppBreadcrumbModule, AppFooterModule, AppHeaderModule, AppSidebarModule} from '@coreui/angular';
import {PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {AdminLayoutComponent} from "./admin-layout";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../../app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BsDropdownModule} from "ngx-bootstrap";
import {ChartsModule} from 'ng2-charts';
import {AdminRoutingModule} from "./admin-routing.module";
import { CategoryComponent } from './category/category.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    imports: [
        AdminRoutingModule,
        AppAsideModule,
        AppBreadcrumbModule.forRoot(),
        AppFooterModule,
        AppHeaderModule,
        AppSidebarModule,
        PerfectScrollbarModule,
        BsDropdownModule.forRoot(),
        TabsModule.forRoot(),
        ChartsModule
    ],
    declarations: [
        AdminLayoutComponent,
        CategoryComponent,
    ],
    providers: [{
        provide: LocationStrategy,
        useClass: HashLocationStrategy
    }],
    bootstrap: [AdminLayoutComponent],
    exports: []
})
export class AdminModule {
}
