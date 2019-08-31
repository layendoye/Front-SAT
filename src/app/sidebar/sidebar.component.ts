import { SecurityService } from './../services/security.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  image:string;
  constructor() { }

  ngOnInit() {
    
  }

}
