import { NgModule } from "@angular/core";
import {
  CommonModule,
  HashLocationStrategy,
  LocationStrategy
} from "@angular/common";
import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppFooterModule,
  AppHeaderModule,
  AppSidebarModule
} from "@coreui/angular";
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule
} from "ngx-perfect-scrollbar";
import { TabsModule } from "ngx-bootstrap/tabs";
import { AdminLayoutComponent } from "./admin-layout";
import {
  BsDropdownModule,
  CollapseModule,
  PaginationModule
} from "ngx-bootstrap";
import { ChartsModule } from "ng2-charts";
import { AdminRoutingModule } from "./admin-routing.module";
import { CategoryComponent } from "./category/category.component";
import {
  NgbButtonsModule,
  NgbPaginationModule
} from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProductDetailComponent } from "./product/detail/product-detail.component";
import { ProductListComponent } from "./product/list/product-list.component";
import { ProducerComponent } from "./producer/producer.component";
import { AmountComponent } from "./amount/amount.component";
import { FragrantComponent } from "./fragrant/fragrant.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
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
    CollapseModule,
    NgbButtonsModule,
    CKEditorModule
  ],
  declarations: [
    AdminLayoutComponent,
    CategoryComponent,
    ProductDetailComponent,
    ProductListComponent,
    ProducerComponent,
    AmountComponent,
    FragrantComponent,
    CheckoutComponent
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AdminLayoutComponent],
  exports: []
})
export class AdminModule {}
