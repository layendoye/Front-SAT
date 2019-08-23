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
    localStorage.removeItem('token');
    const username=this.signInForm.get('username').value;
    const password=this.signInForm.get('password').value;
    this.securityService.login(username,password).then(
      ()=>{//si tous ce passe bien
        this.router.navigate(['/entreprises/liste']);
      },
      (error)=>{
        this.errorMessage='Erreur sur le login ou le mot de passe';
      }
    );
    console.log(localStorage);

    this.router.navigate(['/entreprises/liste']);
  }
}
