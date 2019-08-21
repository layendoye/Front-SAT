import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  
  constructor(private httpClient: HttpClient) { 
    
  }
  login(username:string,password:string){
    var ObjetToken;
    const data={
      username: username,
      password: password
    };
    this.httpClient
      .post('http://127.0.0.1:8000/connexion',data)
      .subscribe(
        (rep)=>{
          ObjetToken=rep;
          localStorage.setItem('id_token', ObjetToken.token);
        },
        (error)=>{
          console.log('Erreur d\'authentification : '+error.message);
        }
      );
  }
  // authenticate(user: any) {
  //     let url     = 'http://127.0.0.1:8000/api/login_check';
  //       let body     = new URLSearchParams();
  //       body.append('username', user.username);
  //       body.append('password', user.password);
  //     let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
  //       let options = new RequestOptions({headers: headers});

  //     return this.httpClient
  //             .post(url, body.toString(), options)
  //         .map((data: Response) => data.json());
  // }
}
