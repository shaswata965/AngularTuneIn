import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-album-filter',
  templateUrl: './album-filter.component.html',
  styleUrls: ['./album-filter.component.css']
})
export class AlbumFilterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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

}
