import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public subMenuOne = true;
  public subMenuTwo =true;

  constructor() { }

  ngOnInit(): void {
  }

  menuOpener(){
    $("#toggle").on("click", function() {
      // @ts-ignore
      $("#sidebar").width(), 0 == $("#sidebar").offset().left ? $("#sidebar").animate({
        left: -500
      }, "slow") : $("#sidebar").animate({
        left: "0"
      }, "slow")
    })
  }

  menuCloser(){
    $("#toggle_close").on("click", function() {
      // @ts-ignore
      $("#sidebar").width(), 0 == $("#sidebar").offset().left ? $("#sidebar").animate({
        left: -500
      }, "slow") : $("#sidebar").animate({
        left: "0"
      }, "slow")
    })
  }


}
