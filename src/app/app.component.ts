import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from 'angular-jwt';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'SA Transfert';
  isAuth:boolean=false;
  constructor(private router: Router){}
  ngOnInit(){
    console.log(localStorage);
    if(this.isAuth==false && localStorage.getItem('token')){     
      this.isAuth=true;
      this.router.navigate(['/entreprises/liste']);
    }
  }
}
