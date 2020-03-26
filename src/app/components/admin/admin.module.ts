import {NgModule} from '@angular/core';
import {CommonModule, HashLocationStrategy, LocationStrategy} from "@angular/common";
import {AppAsideModule, AppBreadcrumbModule, AppFooterModule, AppHeaderModule, AppSidebarModule} from '@coreui/angular';
import {PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {AdminLayoutComponent} from "./admin-layout";
import {BsDropdownModule, PaginationModule} from "ngx-bootstrap";
import {ChartsModule} from 'ng2-charts';
import {AdminRoutingModule} from "./admin-routing.module";
import { CategoryComponent } from './category/category.component';
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        AdminRoutingModule,
        AppAsideModule,
        AppBreadcrumbModule.forRoot(),
        AppFooterModule,
        AppHeaderModule,
        AppSidebarModule,
        PerfectScrollbarModule,
        BsDropdownModule.forRoot(),
        TabsModule.forRoot(),
        ChartsModule,
        PaginationModule.forRoot(),
        NgbPaginationModule,
        FormsModule,
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
