import {Subject} from "rxjs";
import {User} from "../models/user.model";
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

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

  logIn(email:string, password:string){
    // @ts-ignore
    const user: User = { email: email, password: password};
    this.http.post<{token: string}>('http://localhost:3000/api/users/login', user)
      .subscribe((response)=>{
        const token = response.token;
        this.token = token;
        if(token){
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.router.navigate(['/profile']);
        }
      });
  }

  logOut(){
    // @ts-ignore
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
  }

}
