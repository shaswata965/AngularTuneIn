import {Subject} from "rxjs";
import {User} from "../models/user.model";
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private tokenTimer: any;

  // @ts-ignore
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private modalUser: any | null;

  private users: User[] = [];
  private userUpdated = new Subject<User []>();

  constructor(private http: HttpClient, private router: Router) { }

  getUsers(){
    this.http.get<{message:string, users: any }>(
      "http://localhost:3000/api/users"
    ).pipe(map((userData)=>{
      // @ts-ignore
      return userData.users.map(user=>{
        return{
          name: user.name,
          email: user.email,
          id: user._id,
          imagePath: user.imagePath
        };
      });
    }))
      .subscribe(users=>{
        this.users = users;
        this.userUpdated.next([...this.users]);
      });
  }

  getUsersUpdateListener(){
    return this.userUpdated.asObservable();
  }

  deleteUser(userId:string){
    this.http.delete("http://localhost:3000/api/users/" +userId)
      .subscribe(()=>{
        const updatedUsers = this.users.filter(user=> user.id !=userId);
        this.users = updatedUsers;
        this.userUpdated.next([...this.users]);
      });
  }

  getThisUser(){
    const currentUser = this.getCurrentUser().currentUser;
    const currentEmail = this.getCurrentUser().currentEmail;
    const currentImage = this.getCurrentUser().currentImage;
    return {
      currentUser: currentUser,
      currentEmail: currentEmail,
      currentImage: currentImage
    }
  }

  addModalUser(user: any){
    this.modalUser = user;
  }

  getModalUser(){
    return this.modalUser;
  }

  getToken(){
    return this.token;
  }

  getIsAuthenticated(){
   return this.isAuthenticated;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  addUser(name: string, email:string, password:string, image: File){
    // @ts-ignore
    const userData = new FormData();
    userData.append('name', name);
    userData.append('email',email);
    userData.append('password',password);
    userData.append('image', image, name);
    this.http.post<{message: string}>('http://localhost:3000/api/users', userData)
      .subscribe((responseData)=>{
        console.log(responseData.message);
        this.router.navigate(['/']);
      });
  }

  addSocialUser(name: string, email:string, image:string){
    console.log('I am here');
    // @ts-ignore
    const user: User = { name: name, email: email, image:image};
    this.http.post<{message: string}>('http://localhost:3000/api/users/social', user)
      .subscribe((responseData)=>{
        console.log(responseData.message);
        this.router.navigate(['/']);
      });
  }

  logIn(email:string, password:string){
    // @ts-ignore
    const user: User = { email: email, password: password};
    this.http.post<{token: string, expiresIn:number, currentUser:string,currentEmail:string, currentImage: string}>('http://localhost:3000/api/users/login', user)
      .subscribe((response)=>{
        const token = response.token;
        this.token = token;
        if(token){
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          const currentUser = response.currentUser;
          const currentEmail = response.currentEmail;
          const currentImage = response.currentImage;
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate, currentUser, currentEmail,currentImage);
          this.router.navigate(['/profile']);
        }
      });
  }

  socialLogIn(email:string){
    // @ts-ignore
    const user: User = { email: email};
    this.http.post<{token: string, expiresIn:number, currentUser:string, currentEmail:string, currentImage: string}>('http://localhost:3000/api/users/social/login', user)
      .subscribe((response)=>{
        const token = response.token;
        this.token = token;
        if(token){
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          const currentUser = response.currentUser;
          const currentEmail = response.currentEmail;
          const currentImage = response.currentImage;
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate, currentUser, currentEmail, currentImage);
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

  private saveAuthData(token:string, expirationDate: Date, currentUser:string, currentEmail:string, currentImage:string){
    localStorage.setItem('token',token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('currentUser', currentUser);
    localStorage.setItem('currentEmail', currentEmail);
    localStorage.setItem('currentImage', currentImage);
  }

  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentEmail');
    localStorage.removeItem('currentImage');
  }

  private getCurrentUser(){
    const currentUser = localStorage.getItem('currentUser');
    const currentEmail = localStorage.getItem('currentEmail');
    const currentImage = localStorage.getItem('currentImage');
    return{
      currentUser: currentUser,
      currentEmail: currentEmail,
      currentImage: currentImage
    }
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

