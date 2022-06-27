import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  public searchResult: any;
  public albums: any;
  public artists: any;
  public songs: any;

  constructor(public route: ActivatedRoute,
              public userService: UserService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap)=>{
      this.searchResult = paramMap.get('searchText');

      this.userService.Search(this.searchResult);
      this.userService.getSearchDataUpdateListener().subscribe((searchData:any)=>{
        this.artists = searchData[0];
        this.albums = searchData[1];
        this.songs = searchData[2];
      })

    });
  }


}
