import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {SERVER_API_URL} from '../app.constants';
import {Category} from "../model/category.model";
import {Observable} from "rxjs";

type EntityResponseType = HttpResponse<Category>;
type EntityArrayResponseType = HttpResponse<Category[]>;

@Injectable({providedIn: 'root'})
export class CategoryService {
    constructor(private http: HttpClient) {
    }

    findAll(): Observable<EntityArrayResponseType> {
        return this.http.get<Category[]>(`${SERVER_API_URL}/categories`, {observe: 'response'});
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
    // find(id: number): Observable<EntityResponseType> {
    //     return this.http
    //         .get<IAccount>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    // }

}
