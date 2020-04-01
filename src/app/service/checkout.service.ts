import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {CART_ITEM, SERVER_API_URL, USER_LOGIN} from '../app.constants';
import {BehaviorSubject, Observable} from 'rxjs';
import {Checkout} from '../model/checkout.model';
import {Category} from '../model/category.model';
import {map} from 'rxjs/operators';
import {ProductService} from './product.service';
import {ResponData} from "../comom/constant/base.constant";

type EntityResponseType = HttpResponse<Checkout>;
type EntityArrayResponseType = HttpResponse<Checkout[]>;

@Injectable({providedIn: 'root'})
export class CheckoutService {

    public resourceUrl = SERVER_API_URL + '/checkout';

    constructor(private http: HttpClient, private productService: ProductService) {
    }


    create(checkout: any): Observable<HttpResponse<ResponData>> {
        return this.http.post<ResponData>(this.resourceUrl, checkout, {observe: 'response'});
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {
            observe: 'response'
        });
    }


    filterAll(filter?: any): Observable<EntityArrayResponseType> {
        if (filter == null) {
            filter = {};
        }
        return this.http
            .post<Category[]>(`${this.resourceUrl}/filter`, filter, {observe: 'response'});
    }

    findByUserLogin(id): Observable<EntityArrayResponseType> {
        //
        // return this.filterAll({
        //     userId: id
        // }).pipe(map(checkouts => {
        //     this.setCheckoutItem(checkouts.body);
        //     return checkouts;
        // }));
        return null;
    }


}
