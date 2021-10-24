import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-player-component',
  templateUrl: './player-component.component.html',
  styleUrls: ['./player-component.component.css']
})
export class PlayerComponentComponent implements OnInit {
  count: number = 0;
  clickCount: number=0;

  constructor() { }

  ngOnInit(): void {
  }
  shuffleOver(){
     $('.playlist-tags').addClass('playlist-tags-display-visible');
  }
  shuffleOut(){
    $('.playlist-tags').removeClass('playlist-tags-display-visible');
  }
  previousOver(){
    $('.playlist-tags-previous').addClass('playlist-tags-display-visible');
  }
  previousOut(){
    $('.playlist-tags-previous').removeClass('playlist-tags-display-visible');
  }
  playOver(){
    $('.playlist-tags-play').addClass('playlist-tags-display-visible');
  }
  playOut(){
    $('.playlist-tags-play').removeClass('playlist-tags-display-visible');
  }
  nextOver(){
    $('.playlist-tags-next').addClass('playlist-tags-display-visible');
  }
  nextOut(){
    $('.playlist-tags-next').removeClass('playlist-tags-display-visible');
  }
  repeatOver(){
    $('.playlist-tags-repeat').addClass('playlist-tags-display-visible');
  }
  repeatOut(){
    $('.playlist-tags-repeat').removeClass('playlist-tags-display-visible');
  }
  repeatClick(): void{
    this.count++;
    let  colorChange = this.count;
    let changingColor = colorChange%2;

    if(changingColor === 1){
      $('.repeat-icon-player').addClass('sidebar-icon-color');
    }else{
      $('.repeat-icon-player').removeClass('sidebar-icon-color');
    }

  }
  shuffleClick(): void{
    this.clickCount++;
    let colorChange = this.clickCount;
    let changingColor = colorChange%2;

    if(changingColor === 1){
      $('.shuffle-icon-player').addClass('sidebar-icon-color');
    }else{
      $('.shuffle-icon-player').removeClass('sidebar-icon-color');
    }

  }
}
