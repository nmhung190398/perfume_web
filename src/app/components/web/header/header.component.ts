import {Component, OnInit} from '@angular/core';
import {User} from "../../../model/user";
import {AuthenticationService} from "../../../service/authentication.service";
import {CONSTANT_PATH} from './../../../comom/constant/base.constant';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    categories: Array<String> = [
        'cho-nam',
        'cho-nu',
        'cho-let',
        'cho-gay'
    ];
    CONSTANT_PATH = CONSTANT_PATH
    userLogin: User;

    constructor(private authenticationService: AuthenticationService) {
    }

    ngOnInit(): void {
        this.authenticationService.currentUser.subscribe(value => {
            this.userLogin = value;
            console.log(this.userLogin);
        });
    }

    logout() {
        this.authenticationService.logout();
    }

}
