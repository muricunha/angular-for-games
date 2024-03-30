import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userSubject = new BehaviorSubject<any>(null);

  constructor() {
    const user = sessionStorage.getItem('usuarioLogado');
    if(user){

      this.userSubject.next(JSON.parse(user));
    }
  }

  getUser(){
    return this.userSubject.asObservable();
  }

  getRoles(){
    return this.userSubject.getValue();
  }

  logout(){
    this.userSubject.next(null);
    sessionStorage.clear();
  }
}
