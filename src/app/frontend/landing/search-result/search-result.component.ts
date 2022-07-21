import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../service/user.service";
import {Subscription} from "rxjs";
import * as $ from "jquery";
import {Ad} from "../../models/ad.model";
import {AdService} from "../../service/ad.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  userIsAuthenticated = false;

  // @ts-ignore
  private authListenerSubs: Subscription;

  public searchResult: any;
  public albums: any;
  public artists: any;
  public songs: any;
  public ads: Ad[]=[];
  public rightAd: any;
  public leftAd: any;
  public currentRoute: any;

  constructor(public route: ActivatedRoute,
              public userService: UserService,
              public adService: AdService,
              public toastr: ToastrService) { }

  ngOnInit() {

    this.userIsAuthenticated = this.userService.getIsAuthenticated();
    this.authListenerSubs = this.userService.getAuthStatusListener().subscribe(isAuthenticated=>{
      this.userIsAuthenticated = isAuthenticated;
    });

    this.route.paramMap.subscribe((paramMap)=>{
      this.searchResult = paramMap.get('searchText');

      this.userService.Search(this.searchResult);
      this.userService.getSearchDataUpdateListener().subscribe((searchData:any)=>{
        this.artists = searchData[0];
        this.albums = searchData[1];
        this.songs = searchData[2];
      })
    });

    this.adService.getPageAd("search",1000,1);
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

  OpenTrending() {
    $(".m24_tranding_more_icon").on("click", function (e) {
      if (e.preventDefault(), e.stopImmediatePropagation(), void 0 !== $(this).attr("data-other")) var t = $(this).parent().parent();
      else t = $(this).parent();
      t.find("ul.tranding_more_option").hasClass("tranding_open_option") ? t.find("ul.tranding_more_option").removeClass("tranding_open_option") : ($("ul.tranding_more_option.tranding_open_option").removeClass("tranding_open_option"), t.find("ul.tranding_more_option").addClass("tranding_open_option"))
    }), $(document).on("click", function (e) {
      $("ul.tranding_more_option.tranding_open_option").removeClass("tranding_open_option")
    })
  }

  Copy( album: string){
    this.currentRoute =window.location.protocol+"//"+ window.location.host + "/singles" + "/"+ album;
    this.toastr.success('Share Link Copied Successfully','Success',{closeButton: true})
  }


}
