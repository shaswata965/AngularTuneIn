import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-player-component',
  templateUrl: './player-component.component.html',
  styleUrls: ['./player-component.component.css']
})
export class PlayerComponentComponent implements OnInit {

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
}
