import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'SA Transfert';
  isAuth:boolean=false;
  jwtHelper = new JwtHelperService();
  constructor(private router: Router){}
  ngOnInit(){
    console.log(localStorage);
    
    if(!this.isAuth && localStorage.getItem('token')){     
      this.isAuth=true;
      this.router.navigate(['/entreprises/liste']);
    }
    this.tokenExpire();
  }
  tokenExpire(){
    const token=localStorage.getItem('token')
    if(this.jwtHelper.isTokenExpired(token)){
      localStorage.removeItem('token');
    }
  }
}
