import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {SERVER_API_URL} from '../app.constants';
import {Observable} from "rxjs";
import {Product} from "../model/product.model";
import {Paging} from "../model/base-respone.model";
import {createRequestOption} from "../utils/request.utils";

type EntityResponseType = HttpResponse<Product>;
type EntityArrayResponseType = HttpResponse<Product[]>;

interface PagingResponse {
    data: Product[];
    paging: Paging;
}

type PagingResponseType = HttpResponse<PagingResponse>;

@Injectable({providedIn: 'root'})
export class ProductService {
    constructor(private http: HttpClient) {
    }

    // findAll(): Observable<EntityArrayResponseType> {
    //     return this.http.get<Product[]>(`${SERVER_API_URL}/`, {observe: 'response'});
    // }

    query(req?: any): Observable<PagingResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<PagingResponse>(`${SERVER_API_URL}/products`, {params: options, observe: 'response'});
    }

    // create(account: IAccount): Observable<EntityResponseType> {
    //     const copy = this.convertDateFromClient(account);
    //     return this.http
    //         .post<IAccount>(this.resourceUrl, copy, { observe: 'response' });
    // }
    //
    // update(account: IAccount): Observable<EntityResponseType> {
    //     const copy = this.convertDateFromClient(account);
    //     return this.http
    //         .put<IAccount>(`${this.resourceUrl}/${account.id}`, copy, { observe: 'response' });
    // }
    //
    find(code: string): Observable<EntityResponseType> {
        return this.http
            .get<Product>(`${SERVER_API_URL}/product/${code}`, {observe: 'response'});
    }

}
