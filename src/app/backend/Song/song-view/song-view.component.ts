import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {Song} from "../../../frontend/models/song.model";
import {SongService} from "../../../frontend/service/song.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SongListComponent} from "../song-list/song-list.component";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-song-view',
  templateUrl: './song-view.component.html',
  styleUrls: ['./song-view.component.css']
})
export class SongViewComponent implements OnInit {

  public songsSub: Subscription;
  public songs: Song[] = [];
  isLoading = false;
  totalSongs = 0;

  constructor(public songsService: SongService, private Dialog: MatDialog) { }

  ngOnInit(){
    this.isLoading = true;
    this.songsService.getSongs(3, 1);
    this.songsSub = this.songsService.getSongsUpdateListener().subscribe((songData:{songs:Song[], songCount:number})=>{
      this.songs = songData.songs;
      this.totalSongs = songData.songCount;
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
    this.isLoading = true;
    this.songsService.deleteSong(songId).subscribe(()=>{
      this.songsService.getSongs(3,1);
    });
  }

  onChangedPage(pageEvent: PageEvent){
    this.songsService.getSongs(pageEvent.pageSize, pageEvent.pageIndex+1);
  }


}
