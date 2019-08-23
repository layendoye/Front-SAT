import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router) { }
  connecter:boolean=false;
  ngOnInit() {
    if(localStorage.getItem('token')){
      this.connecter=true;
    }
  }
  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/connexion']);
  }
}
