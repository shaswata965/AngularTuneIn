import { Component, OnInit } from '@angular/core';
import {ArtistService} from "../../../frontend/service/artist.service";
import {Subscription} from "rxjs";
import {Artist} from "../../../frontend/models/artist.model";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ArtistListComponent} from "../artist-list/artist-list.component";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-artist-view',
  templateUrl: './artist-view.component.html',
  styleUrls: ['./artist-view.component.css']
})
export class ArtistViewComponent implements OnInit {

  public artistsSub: Subscription;
  public artists: any | null;
  isLoading = false;
  totalSongs = 0;

  constructor( public artistService: ArtistService, private Dialog: MatDialog) { }

  ngOnInit(){
    this.isLoading = true;
    this.artistService.getArtist(3,1);
    this.artistsSub = this.artistService.getArtistsUpdateListener().subscribe((artistData:{artists: Artist[], artistCount: number})=>{
      this.artists = artistData.artists;
      this.totalSongs = artistData.artistCount;
      this.isLoading = false;
    });
  }

  openViewModal(artist : any){
    this.isLoading = true;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "60%";
    this.Dialog.open(ArtistListComponent, dialogConfig);
    this.artistService.addModalArtist(artist);
    this.isLoading = false;
  }

  onDelete(artistId: string){
    this.isLoading = true;
    this.artistService.deleteArtist(artistId).subscribe(()=>{
      this.artistService.getArtist(3,1);
    });
  }

  onChangedPage(pageEvent: PageEvent){
    this.artistService.getArtist(pageEvent.pageSize, pageEvent.pageIndex+1);
  }

}
