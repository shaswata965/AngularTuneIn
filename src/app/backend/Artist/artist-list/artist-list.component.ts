import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ArtistService} from "../../../frontend/service/artist.service";
import {Artist} from "../../../frontend/models/artist.model";

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit {

  artistDetails: Artist;
  isLoading = false;

  constructor(public dialogRef: MatDialogRef<ArtistListComponent>, public artistService: ArtistService) { }

  ngOnInit(){
    this.isLoading = true;
    this.artistDetails = this.artistService.getModalArtist();
    this.isLoading = false;
  }

  onClose(){
    this.dialogRef.close();
  }

}
