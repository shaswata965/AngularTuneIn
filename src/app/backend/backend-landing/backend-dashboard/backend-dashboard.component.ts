import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-backend-dashboard',
  templateUrl: './backend-dashboard.component.html',
  styleUrls: ['./backend-dashboard.component.css']
})
export class BackendDashboardComponent implements OnInit {

  public title1: string;
  public title2: string;

  constructor( private router: Router ) { }

  ngOnInit(){
    let urlName = this.router.url.toString();
    let firstSplit = urlName.split("/");
    let url = firstSplit[1].split("-");
    this.title2 = url[0].charAt(0).toUpperCase() + url[0].slice(1);
    this.title1 = url[1].charAt(0).toUpperCase() + url[1].slice(1);
  }

}
