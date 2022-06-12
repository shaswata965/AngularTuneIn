import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import {IndustryService} from "../../service/industry.service";
import {Industry} from "../../models/industry.model";
import {ActivatedRoute, Router} from "@angular/router";
import * as $ from "jquery";
import {AlbumService} from "../../service/album.service";
import {Album} from "../../models/album.model";
import {PageEvent} from "@angular/material/paginator";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-filtered-results',
  templateUrl: './filtered-results.component.html',
  styleUrls: ['./filtered-results.component.css']
})
export class FilteredResultsComponent implements OnInit{
  public allIndustries : any;
  public industryId: any;
  industry: any;
  elm: any;
  removeElm: any;
  letter: any;
  capital: any;
  combined: any;
  objects: any;
  public industryAlbums: any;
  totalSongs = 0;
  public letterAlbums: any;
  filter = '';
  finalFilter = '';

  industrySubscription: Subscription;
  albumSubscription: Subscription;
  industrySpecificSubscription: Subscription;

  constructor(public industryService: IndustryService,
              public route : ActivatedRoute,
              public albumService: AlbumService) {}

  ngOnInit(){
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

    let combinedArray = [];
    for(let i=10; i<36; i++){
      this.letter = i.toString(36);
      this.capital = this.letter.toUpperCase();
      this.combined = {letter: this.letter, capital: this.capital};
      combinedArray.push(this.combined);
      this.objects = combinedArray;
    }

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
    $("#previous").on("click",function(){
      setTimeout(function (){
        $("#firstYears").toggleClass("visible");
        $("#secondYears").toggleClass("invisible");},300);
    });
  }

  nextClicker(){
    $("#next").on("click",function(){
      setTimeout(function (){
        $("#secondYears").toggleClass("invisible");
        $("#firstYears").toggleClass("visible");
      },300);
    })
  }

  alphabetFilter(filter:any){
    this.filter = filter;
    if(this.filter === 'All'){
        this.finalFilter =filter;
    }else{
      let filterArray = filter.split('');
      this.finalFilter = filterArray[0];
    }

    this.albumService.getLetterFiltered(this.industryId, this.finalFilter, 6,1);
      this.albumService.getLetterUpdateListener().subscribe((albumData:{albums: Album[], albumCount: number})=>{
        this.letterAlbums = albumData.albums;
        this.totalSongs = albumData.albumCount;
    });
  }

  onChangedPage(pageEvent: PageEvent){
    this.albumService.getIndustryFilterAlbum(this.industryId,pageEvent.pageSize, pageEvent.pageIndex+1);
  }

  onChangedLetterPage(pageEvent: PageEvent, filter: any){
    let filterArray = filter.split('');
    this.filter = filterArray[0];
    this.albumService.getLetterFiltered(this.industryId, this.filter, pageEvent.pageSize, pageEvent.pageIndex+1);
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

}
