import { Component, OnInit } from '@angular/core';
import {Industry} from "../../models/industry.model";
import {IndustryService} from "../../service/industry.service";
import {Subscription} from "rxjs";
import {Album} from "../../models/album.model";
import {ActivatedRoute} from "@angular/router";
import {AlbumService} from "../../service/album.service";
import * as $ from "jquery";
import {PageEvent} from "@angular/material/paginator";
import {UserService} from "../../service/user.service";
import {Ad} from "../../models/ad.model";
import {AdService} from "../../service/ad.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-filtered-year',
  templateUrl: './filtered-year.component.html',
  styleUrls: ['./filtered-year.component.css']
})
export class FilteredYearComponent implements OnInit {

  userIsAuthenticated = false;

  // @ts-ignore
  private authListenerSubs: Subscription;

  public allIndustries : any;
  public industryId: any;
  public industryAlbums: any;
  public yearAlbums: any;
  public ads: any;
  public leftAd: any;
  public rightAd: any;
  public middleAd: any;
  public currentRoute: any;

  totalSongs = 0;
  industry: any;
  yearCount1: any;
  yearCount2: any;
  elm: any;
  removeElm: any;
  filter = '';

  industrySubscription: Subscription;
  albumSubscription: Subscription;
  industrySpecificSubscription: Subscription;

  constructor(public industryService: IndustryService,
              public route: ActivatedRoute,
              public albumService: AlbumService,
              public userService: UserService,
              public adService: AdService,
              public toastr: ToastrService) { }

  ngOnInit() {

    this.userIsAuthenticated = this.userService.getIsAuthenticated();
    this.authListenerSubs = this.userService.getAuthStatusListener().subscribe(isAuthenticated=>{
      this.userIsAuthenticated = isAuthenticated;
    });

    this.industryService.getIndustries(1000,1);
    this.industrySubscription = this.industryService.getIndustriesUpdateListener().subscribe((industryData:{industries: Industry[], industryCount: number})=>{
      this.allIndustries = industryData.industries;
    });

    this.route.paramMap.subscribe((paramMap)=>{
      this.industryId = paramMap.get('industryId');
      this.albumService.getIndustryFilterAlbum(this.industryId, 6,1);
      this.albumSubscription = this.albumService.getIndustryUpdateListener().subscribe((albumData:{albums: Album[], albumCount:number})=>{
        this.industryAlbums = albumData.albums;
        this.totalSongs = albumData.albumCount;
      });

      this.industrySpecificSubscription = this.industryService.getEditIndustry(this.industryId).subscribe(industryData=>{
        this.industry = {id: industryData._id, name: industryData.name};
      });
    });

    let date = new Date() ;
    let year = date.getFullYear();
    let start = year - 23;
    let yearArray = [];
    for(let i=year; i >= start; i--){
      let x = i.toString();
      yearArray.push(x);
      this.yearCount1 = yearArray;
    }

    let year1 = start - 24;
    let yearArray2 = [];
    for(let i=start-1; i >= year1; i--){
      let x = i.toString();
      yearArray2.push(x);
      this.yearCount2 = yearArray2;
    }


    this.adService.getPageAd("filtered",1000,1);
    this.adService.getPageAdsUpdateListener().subscribe((adData:{ads:Ad[],adCount:number})=>{
      this.ads = adData.ads;
      for(let i =0; i<this.ads.length; i++){
        if(this.ads[i].position === "right"){
          this.rightAd =this.ads[i];
        }else if(this.ads[i].position === "left"){
          this.leftAd = this.ads[i];
        }else if(this.ads[i].position === "middle"){
          this.middleAd = this.ads[i];
        }
      }
    });

  }

  yearFilter(filter:any){
    this.filter = filter;

    this.albumService.getYearFiltered(this.industry.name, this.filter, 6,1);
    this.albumService.getYearUpdateListener().subscribe((albumData:{albums: Album[], albumCount: number})=>{
      this.yearAlbums = albumData.albums;
      this.totalSongs = albumData.albumCount;
    });
  }

  onChangedPage(pageEvent: PageEvent){
    this.albumService.getIndustryFilterAlbum(this.industryId,pageEvent.pageSize, pageEvent.pageIndex+1);
  }

  onChangedYearPage(pageEvent: PageEvent, filter: any){
    this.filter = filter;
    this.albumService.getYearFiltered(this.industryId, this.filter, pageEvent.pageSize, pageEvent.pageIndex+1);
  }

  addActive(){

    this.removeElm = document.getElementsByClassName("industry_dynamic_name");

    for(let i=0; i<this.removeElm.length; i++){
      this.removeElm[i].removeClass('active_album_name');
    }

    this.elm = document.getElementById(""+this.industryId);
    this.elm.classList.addClass('active_album_name');
  }

  previousClicker(){
    setTimeout(function (){
      $("#firstYears").toggleClass("visible");
      $("#secondYears").toggleClass("invisible");},300);
  }

  nextClicker(){
    setTimeout(function (){
      $("#secondYears").toggleClass("invisible");
      $("#firstYears").toggleClass("visible");
    },300);
  }

  OpenTrending(){

    $(".m24_tranding_more_icon").on("click", function(e) {
      if (e.preventDefault(), e.stopImmediatePropagation(), void 0 !== $(this).attr("data-other")) var t = $(this).parent().parent();
      else t = $(this).parent();
      t.find("ul.tranding_more_option").hasClass("tranding_open_option") ? t.find("ul.tranding_more_option").removeClass("tranding_open_option") : ($("ul.tranding_more_option.tranding_open_option").removeClass("tranding_open_option"), t.find("ul.tranding_more_option").addClass("tranding_open_option"))
    }), $(document).on("click", function(e) {
      $("ul.tranding_more_option.tranding_open_option").removeClass("tranding_open_option")
    })

  }

  Copy( album: string){
    this.currentRoute =window.location.protocol+"//"+ window.location.host + "/singles" + "/"+ album;
    this.toastr.success('Share Link Copied Successfully','Success',{closeButton: true})
  }

}
