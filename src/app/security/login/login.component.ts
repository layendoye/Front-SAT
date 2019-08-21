import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SecurityService } from 'src/app/services/security.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  token: string='';
  signInForm: FormGroup;
  errorMessage: string;
  constructor(private formBuilder: FormBuilder,
              private securityService: SecurityService ,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }
  initForm(){
    this.signInForm=this.formBuilder.group({
      username: ['',[Validators.required]],
      password: ['',[Validators.required,Validators.pattern(/[0-9a-z-A-Z]{2,}/)]]//comme ca le password va contenir au moins 2 caracteres
    });
  }
  onSubmit(){
    this.logOut();
    const username=this.signInForm.get('username').value;
    const password=this.signInForm.get('password').value;
    this.securityService.login(username,password);
    console.log(localStorage);

    this.router.navigate(['entreprises/liste']);
  }
  logOut(){
    localStorage.removeItem('id_token');
  }

}
