import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {Industry} from "../../models/industry.model";
import {IndustryService} from "../../service/industry.service";
import {ActivatedRoute} from "@angular/router";
import {AlbumService} from "../../service/album.service";
import {Subscription} from "rxjs";
import {Album} from "../../models/album.model";
import {OwlOptions} from "ngx-owl-carousel-o";
import {SongService} from "../../service/song.service";
import {Song} from "../../models/song.model";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-album-filter',
  templateUrl: './album-filter.component.html',
  styleUrls: ['./album-filter.component.css']
})
export class AlbumFilterComponent implements OnInit, AfterViewInit {

  public allIndustries : any;
  public industryId: any;
  public industryAlbums: any;
  public bollywoodSongs: any;
  totalSongs = 0;
  public letterAlbums: any;
  public bollywoodAlbums: any;
  filter = '';
  industry: any;
  elm: any;
  removeElm: any;
  letter: any;
  capital: any;
  combined: any;
  objects: any;
  yearCount1: any;
  yearCount2: any;
  totalBollywood = 0;

  industrySubscription: Subscription;
  albumSubscription: Subscription;
  industrySpecificSubscription: Subscription;

  constructor(public industryService: IndustryService,
              public route: ActivatedRoute,
              public albumService: AlbumService,
              public songService: SongService) { }

  ngOnInit(){
    this.industryService.getIndustries(1000,1);
    this.industrySubscription = this.industryService.getIndustriesUpdateListener().subscribe((industryData:{industries: Industry[], industryCount: number})=>{
      this.allIndustries = industryData.industries;
      this.route.paramMap.subscribe((paramMap)=>{
        if(paramMap.has('industryId')){
          this.industryId = paramMap.get('industryId');
          this.industrySpecificSubscription = this.industryService.getEditIndustry(this.industryId).subscribe(industryData=>{
            this.industry = {id: industryData._id, name: industryData.name};
          });
        }else{
          this.industry = {id:this.allIndustries[0].id, name: "All"};
        }
      });
    });

    this.albumService.getBollywoodAlbums(20,1);
    this.albumService.getBollywoodAlbumsUpdateListener().subscribe((albumData:{albums: Album[], albumCount: number})=>{
      this.bollywoodAlbums = albumData.albums;
    });

    this.songService.getBollywoodSongs(9,1);
    this.songService.getBollywoodSongsUpdateListener().subscribe((songData:{songs: Song[], songCount: number})=>{
      this.bollywoodSongs = songData.songs;
      this.totalBollywood = songData.songCount;
    });

    let combinedArray = [];
    for(let i=10; i<36; i++){
      this.letter = i.toString(36);
      this.capital = this.letter.toUpperCase();
      this.combined = {letter: this.letter, capital: this.capital};
      combinedArray.push(this.combined);
      this.objects = combinedArray;
    }

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

  }

  ngAfterViewInit(){

    this.removeElm = document.getElementsByClassName("industry_dynamic_name");

    for(let i=0; i<this.removeElm.length; i++){
      this.removeElm[i].removeClass('active_album_name');
    }

    this.elm = document.getElementById(""+this.industryId);
    this.elm.classList.toggle('active_album_name');

    // // @ts-ignore
    // document.getElementById("previous").addEventListener('click',()=>{
    //   // @ts-ignore
    //   document.getElementById('firstYears').classList.toggle('visible');
    //   // @ts-ignore
    //   document.getElementById('secondYears').classList.toggle('visible');
    // })
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

  customOptions: OwlOptions = {
    loop: !0,
    margin: 15,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    smartSpeed: 1200,
    navSpeed: 700,
    navText: ['<i class="flaticon-left-arrow"></i>', '<i class="flaticon-right-arrow"></i>'],
    responsive: {
      0: {
        items: 1,
        nav: !0
      },
      600: {
        items: 3,
        nav: !0
      },
      1000: {
        items: 5,
        nav: !0,
        loop: !0,
        margin: 20
      }
    },
    nav: true
  }

  onBollywoodChangedPage(pageEvent: PageEvent){
    this.songService.getBollywoodSongs(pageEvent.pageSize, pageEvent.pageIndex+1);
  }

}
