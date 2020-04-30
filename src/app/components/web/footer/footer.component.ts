import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../service/authentication.service';
import {CartService} from '../../../service/cart.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CategoryService} from '../../../service/category.service';
import {UserService} from '../../../service/user.service';
import {FormBuilder} from '@angular/forms';
import {Category} from '../../../model/category.model';
import {CONSTANT_PATH, getImg} from './../../../comom/constant/base.constant';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    categories: Array<Category>;
    CONSTANT_PATH = CONSTANT_PATH;

    constructor(public authenticationService: AuthenticationService, private cartService: CartService,
                private modalService: NgbModal,
                private categoryService: CategoryService,
                private userService: UserService,
                private fb: FormBuilder) {

    }

    ngOnInit(): void {
        this.categoryService.filterAll().subscribe(res => {
            this.categories = res.body;
        });
    }

    goToTop() {
        window.scroll(0, 0);
    }

}
