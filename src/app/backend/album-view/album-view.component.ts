import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {Album} from "../../frontend/models/album.model";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AlbumService} from "../../frontend/service/album.service";
import {AlbumListComponent} from "../album-list/album-list.component";

@Component({
  selector: 'app-album-view',
  templateUrl: './album-view.component.html',
  styleUrls: ['./album-view.component.css']
})
export class AlbumViewComponent implements OnInit {

  albums: Album[] =[];
  private albumsSub: Subscription | undefined;
  public modalAlbum : any | null;

  constructor(public albumService: AlbumService,
              private Dialog: MatDialog) { }

  ngOnInit(){

    this.albumService.getAlbums();
    this.albumsSub = this.albumService.getAlbumsUpdateListener().subscribe((albums: Album[])=>{
      this.albums = albums;
      console.log(this.albums);
    });

  }

  onDelete(albumId: string){
    this.albumService.deleteAlbum(albumId);
  }

  openViewModal(album : any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "60%";
    this.Dialog.open(AlbumListComponent, dialogConfig);
    this.albumService.addModalAlbum(album);
  }

}
