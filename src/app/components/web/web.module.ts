import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HomeComponent} from "./home/home.component";
import {WebRoutingModule} from "./web-routing.module";
import {Ng5SliderModule} from "ng5-slider";
import {NgbCarousel, NgbCarouselModule, NgbModule, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {WebComponent} from "./web.component";
import {HeaderComponent} from "./header/header.component";
import {AboutComponent} from "./about/about.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {FooterComponent} from "./footer/footer.component";
import {ListProductComponent} from "./list-product/list-product.component";
import {DetailProductComponent} from "./detail-product/detail-product.component";
import {CartComponent} from "./cart/cart.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {LoginComponent} from "./login/login.component";
import {AlertComponent} from "../alert/alert.component";
import {FilterComponent} from "./list-product/filter/filter.component";


@NgModule({
    imports: [
        CommonModule,
        WebRoutingModule,
        ReactiveFormsModule,
        Ng5SliderModule,
        NgbModule,
        NgbPaginationModule,
        NgbCarouselModule,

    ],
    declarations: [
        WebComponent,
        HeaderComponent,
        AboutComponent,
        NotFoundComponent,
        FooterComponent,
        ListProductComponent,
        DetailProductComponent,
        CartComponent,
        CheckoutComponent,
        LoginComponent,
        AlertComponent,
        FilterComponent,
    ],
    exports: [],
    bootstrap: []
})
export class WebModule {
}
