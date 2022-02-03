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
  public albumInfo: any;
  public albumDetails: any;
  private albumsSub: Subscription;

  constructor(public dialogRef: MatDialogRef<AlbumListComponent>, public albumService: AlbumService) { }

  ngOnInit(){
    this.albumInfo = this.albumService.getModalAlbum();
    this.albumsSub = this.albumService.getAlbumDetailsUpdateListener().subscribe((details:any)=>{
      this.albumDetails = details;
    });
  }

  ngOnDestroy(){
    this.albumsSub.unsubscribe();
  }

  onClose(){
    this.dialogRef.close();
  }

}
