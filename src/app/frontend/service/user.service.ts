import {Subject} from "rxjs";
import {User} from "../models/user.model";
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {localizedString} from "@angular/compiler/src/output/output_ast";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private tokenTimer: any;

  // @ts-ignore
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;

  private users: User[] = [];
  private userUpdated = new Subject<User []>();

  constructor(private http: HttpClient, private router: Router) { }

  getToken(){
    return this.token;
  }

  getIsAuthenticated(){
   return this.isAuthenticated;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  addUser(name: string, email:string, password:string){
    // @ts-ignore
    const user: User = { id: null, name: name, email: email, password: password};
    this.http.post<{message: string}>('http://localhost:3000/api/users', user)
      .subscribe((responseData)=>{
        console.log(responseData.message);
        this.router.navigate(['/']);
      });
    this.users.push(user);
    this.userUpdated.next([...this.users]);
  }

  addSocialUser(name: string, email:string){
    // @ts-ignore
    const user: User = { name: name, email: email};
    this.http.post<{message: string}>('http://localhost:3000/api/social/users', user)
      .subscribe((responseData)=>{
        this.router.navigate(['/']);
      });
  }

  logIn(email:string, password:string){
    // @ts-ignore
    const user: User = { email: email, password: password};
    this.http.post<{token: string, expiresIn:number}>('http://localhost:3000/api/users/login', user)
      .subscribe((response)=>{
        const token = response.token;
        this.token = token;
        if(token){
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate);
          this.router.navigate(['/profile']);
        }
      });
  }

  socialLogIn(email:string){
    // @ts-ignore
    const user: User = { email: email};
    this.http.post<{token: string, expiresIn:number}>('http://localhost:3000/api/social/users/login', user)
      .subscribe((response)=>{
        const token = response.token;
        this.token = token;
        if(token){
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate);
          this.router.navigate(['/profile']);
        }
      });
  }

  logOut(){
    // @ts-ignore
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  autoAuthUser(){
    const authInformation=  this.getAuthData();
    if(!authInformation){
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if(expiresIn > 0){
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }

  }

  private setAuthTimer( duration: number){
    this.tokenTimer = setTimeout(()=>{
      this.logOut();
    }, duration*1000);
  }

  private saveAuthData(token:string, expirationDate: Date){
    localStorage.setItem('token',token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData(){
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');

    if(!token || !expirationDate){
      return;
    }

    return{
      token: token,
      expirationDate: new Date(expirationDate)
    }

  }

}

