import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {SongService} from "../../frontend/service/song.service";
import {SanitizeUrlPipe} from "../song-create/sanitize-url.pipe";

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {
  public songInfo: any;
  public songDetails: any;
  public songsSub: any;
  public lowSongPreview:  string | null;

  constructor(public dialogRef: MatDialogRef<SongListComponent>, public songService: SongService) { }

  ngOnInit(){
    this.songDetails = this.songService.getModalSong();
    this.songService.getModalSong();
    this.songsSub = this.songService.getSongInfoUpdateListener().subscribe((info:any)=>{
      this.songInfo = info;
    });
  }

  playLowSong(){
    let audio = new Audio();
    audio.src = this.songDetails.lowPath;
    audio.load();
    audio.play().then(result=>{
      console.log(result);
    }).catch(err=>{
      console.log(err);
    });
  }

  playHighSong(){
    let audio = new Audio();
    audio.src = this.songDetails.highPath;
    audio.load();
    audio.play().then(result=>{
      console.log(result);
    }).catch(err=>{
      console.log(err);
    });
  }

  onClose(){
    this.dialogRef.close();
  }

}
