import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";
import {Ad} from "../../models/ad.model";
import {AdService} from "../../service/ad.service";

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {

  public currentUser: string | null;
  public currentEmail: string | null;
  public currentImage: string | null;
  public firstName: string | null;
  public ads: any;
  public leftAd: any;
  public rightAd: any;

  constructor(public userService: UserService,
              public adService: AdService) { }

  ngOnInit(){
    this.currentUser = this.userService.getThisUser().currentUser;
    let name = ""+this.currentUser;
    let nameArray = [];
    nameArray = name.split(" ");
    let firstNameString = nameArray[0];
    let firstName = firstNameString.replace(/"/g,"");
    this.firstName = firstName;
    this.currentEmail = this.userService.getThisUser().currentEmail;
    this.currentImage = this.userService.getThisUser().currentImage;


    this.adService.getPageAd("profile",1000,1);
    this.adService.getPageAdsUpdateListener().subscribe((adData:{ads:Ad[],adCount:number})=>{
      this.ads = adData.ads;
      for(let i =0; i<this.ads.length; i++){
        if(this.ads[i].position === "right"){
          this.rightAd =this.ads[i];
        }else if(this.ads[i].position === "left"){
          this.leftAd = this.ads[i];
        }
      }
    });
  }

}
