import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {AlbumService} from "../../frontend/service/album.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit, OnDestroy {
  public albumDetails: any;
  public albumLanguage: any;
  private albumsSub: Subscription;

  constructor(public dialogRef: MatDialogRef<AlbumListComponent>, public albumService: AlbumService) { }

  ngOnInit(){
    this.albumDetails = this.albumService.getModalAlbum();
    this.albumsSub = this.albumService.getAlbumLanguageUpdateListener().subscribe((language:any)=>{
      this.albumLanguage = language;
    });
  }

  ngOnDestroy(){
    this.albumsSub.unsubscribe();
  }

  onClose(){
    this.dialogRef.close();
  }

}
