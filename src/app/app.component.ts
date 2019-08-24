import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'SATransfert';
  isAuth:boolean=false;
  ngOnInit(){
    //localStorage.removeItem('token')
    if(localStorage.getItem('token')){     
      this.isAuth=true;
    }
  }
}
