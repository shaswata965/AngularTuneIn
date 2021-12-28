import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {Admin} from "../models/admin.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AdminService{

  private tokenTimer: any;

  private admins: Admin[] = [];
  private adminsUpdated = new Subject<Admin []>();

  // @ts-ignore
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private http: HttpClient, private router: Router) { }

  getAdmins(){
    this.http.get<{message:string, admins: any }>(
      "http://localhost:3000/api/admins"
    ).pipe(map((adminData)=>{
      // @ts-ignore
      return adminData.admins.map(admin=>{
        return{
          name: admin.name,
          address: admin.address,
          email: admin.email,
          id: admin._id
        };
      });
    }))
      .subscribe(admins=>{
      this.admins = admins;
      this.adminsUpdated.next([...this.admins]);
      console.log(this.admins);
    });
  }

  updateAdmin(id: string | null, name: string,  address: string, email: string, password: string){
    // @ts-ignore
    const admin: Admin = {id:id, name:name, address:address, email:email, password:password};
    this.http.put("http://localhost:3000/api/admins/" +id, admin)
      .subscribe(response=>{
        const updatedAdmin = [...this.admins];
        const oldAdminIndex = updatedAdmin.findIndex(a => a.id === admin.id);
        updatedAdmin[oldAdminIndex] = admin;
        this.admins = updatedAdmin;
        this.adminsUpdated.next([...this.admins]);
        this.router.navigate(['/admin-list']);
      });
  }

  deleteAdmin(adminId:string){
    this.http.delete("http://localhost:3000/api/admins/" +adminId)
      .subscribe(()=>{
          const updatedAdmins = this.admins.filter(admin=> admin.id !=adminId);
          this.admins = updatedAdmins;
          this.adminsUpdated.next([...this.admins]);
      });
  }

  getEditAdmin(adminId: string | null){
    return this.http.get<{_id:string, name:string, address:string, email: string, password:string}>("http://localhost:3000/api/admins/" +adminId);
  }

  getAdminsUpdateListener(){
    return this.adminsUpdated.asObservable();
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

  addAdmin(name:string,  address:string, email:string, password:string){
    // @ts-ignore
    const admin: Admin = { id: null, name: name, address:address, email: email, password: password};
    this.http.post<{message: string}>('http://localhost:3000/api/admins', admin)
      .subscribe((Data)=>{
        console.log(Data.message);
        this.router.navigate(['/admin-list']);
      });
  }

  logIn(email:string, password:string){
    // @ts-ignore
    const admin: Admin = { email: email, password: password};
    this.http.post<{token: string, expiresIn: number}>('http://localhost:3000/api/admins/login', admin)
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
          this.router.navigate(['/backend-home']);
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
    this.router.navigate(['/backend-login']);
  }

  autoAuthAdmin(){
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
