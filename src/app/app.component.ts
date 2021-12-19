import {Component, OnInit} from '@angular/core';
import {UserService} from "./frontend/service/user.service";
import {AdminService} from "./frontend/service/admin.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'TuneIn';

  constructor( private userService: UserService, private adminService: AdminService) {}

  ngOnInit() {
    this.userService.autoAuthUser();
    this.adminService.autoAuthAdmin();
  }
}
