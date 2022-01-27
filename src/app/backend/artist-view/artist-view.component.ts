import { Component, OnInit } from '@angular/core';
import {ArtistService} from "../../frontend/service/artist.service";
import {Subscription} from "rxjs";
import {Artist} from "../../frontend/models/artist.model";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ArtistListComponent} from "../artist-list/artist-list.component";

@Component({
  selector: 'app-artist-view',
  templateUrl: './artist-view.component.html',
  styleUrls: ['./artist-view.component.css']
})
export class ArtistViewComponent implements OnInit {

  public artistsSub: Subscription;
  public artists: any | null;

  constructor( public artistService: ArtistService, private Dialog: MatDialog) { }

  ngOnInit(){
    this.artistService.getArtist();
    this.artistsSub = this.artistService.getArtistsUpdateListener().subscribe((artists: Artist[])=>{
      this.artists = artists;
    });
  }

  openViewModal(artist : any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "60%";
    this.Dialog.open(ArtistListComponent, dialogConfig);
    this.artistService.addModalArtist(artist);
  }

  onDelete(artistId: string){
    this.artistService.deleteArtist(artistId);
  }

}
