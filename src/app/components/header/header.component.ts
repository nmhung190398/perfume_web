import {Component, OnInit} from '@angular/core';

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

  constructor() {
  }

  ngOnInit(): void {
  }

}
