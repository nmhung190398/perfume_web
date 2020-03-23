import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import {AuthGuard} from "../../comom/auth/auth.guard";
import {CartComponent} from "./cart/cart.component";
import {LoginComponent} from "./login/login.component";
import {ListProductComponent} from "./list-product/list-product.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {WebComponent} from "./web.component";


const routes: Routes = [

    {
        path: '',
        component: WebComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent,

            },
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'about',
                component: AboutComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'cart',
                component: CartComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'checkout',
                component: CartComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'products/:category',
                component: ListProductComponent
            },
            {
                path: '404',
                component: NotFoundComponent
            },
            {
                path: '**',
                redirectTo: '404',
                pathMatch: 'full'
            },
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WebRoutingModule {
}
