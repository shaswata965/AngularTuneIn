import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {Song} from "../../../frontend/models/song.model";
import {SongService} from "../../../frontend/service/song.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SongListComponent} from "../song-list/song-list.component";

@Component({
  selector: 'app-song-view',
  templateUrl: './song-view.component.html',
  styleUrls: ['./song-view.component.css']
})
export class SongViewComponent implements OnInit {

  public songsSub: Subscription;
  public songs: Song[] = [];
  isLoading = false;

  constructor(public songsService: SongService, private Dialog: MatDialog) { }

  ngOnInit(){
    this.isLoading = true;
    this.songsService.getSongs();
    this.songsSub = this.songsService.getSongsUpdateListener().subscribe((songs:Song[])=>{
      this.songs = songs;
      this.isLoading = false;
    });
  }

  openViewModal(song : any){
    this.isLoading = true;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "60%";
    this.Dialog.open(SongListComponent, dialogConfig);
    this.songsService.addModalSong(song);
    this.isLoading = false;
  }

  onDelete(songId: string){
    this.songsService.deleteSong(songId);
  }


}