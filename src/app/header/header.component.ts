import { SecurityService } from './../services/security.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  image:string;
  constructor(private router:Router,private securityService:SecurityService) { }
  connecter:boolean=false;
  ngOnInit() {
    if(localStorage.getItem('token')){
      this.connecter=true;
    }
    this.securityService.getUserConnecte().then(
      rep=>{
        this.image="/../../../../Back-SATransfert/public/images/"+rep.image
        console.log(this.image)
      }
    )
  }
  logOut(){
    localStorage.removeItem('token');
    window.location.reload();
    this.router.navigate(['/connexion']);
  }
}
