import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {Album} from "../../../frontend/models/album.model";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AlbumService} from "../../../frontend/service/album.service";
import {AlbumListComponent} from "../album-list/album-list.component";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-album-view',
  templateUrl: './album-view.component.html',
  styleUrls: ['./album-view.component.css']
})
export class AlbumViewComponent implements OnInit {

  albums: Album[] =[];
  private albumsSub: Subscription | undefined;
  public modalAlbum : any | null;
  isLoading = false;
  totalSongs = 0;

  constructor(public albumService: AlbumService,
              private Dialog: MatDialog) { }

  ngOnInit(){
    this.isLoading = true;
    this.albumService.getAlbums(3,1);
    this.albumsSub = this.albumService.getAlbumsUpdateListener().subscribe((albumData:{albums: Album[], albumCount:number})=>{
      this.albums = albumData.albums;
      this.totalSongs = albumData.albumCount;
      this.isLoading = false;
    });

  }

  onDelete(albumId: string){
    this.isLoading = true;
    this.albumService.deleteAlbum(albumId).subscribe(()=>{
      this.albumService.getAlbums(3,1);
    });
  }

  openViewModal(album : any){
    this.isLoading = true;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "60%";
    this.Dialog.open(AlbumListComponent, dialogConfig);
    this.albumService.addModalAlbum(album);
    this.isLoading = false;
  }

  onChangedPage(pageEvent: PageEvent){
    this.albumService.getAlbums(pageEvent.pageSize, pageEvent.pageIndex+1);
  }

}
