import { Component, OnInit } from '@angular/core';
import {Artist} from "../../../frontend/models/artist.model";
import {MatDialogRef} from "@angular/material/dialog";
import {ArtistService} from "../../../frontend/service/artist.service";
import {Ad} from "../../../frontend/models/ad.model";
import {AdService} from "../../../frontend/service/ad.service";

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.css']
})
export class AdListComponent implements OnInit {

  adDetails: Ad;
  isLoading = false;

  constructor(public dialogRef: MatDialogRef<AdListComponent>, public adService: AdService) { }

  ngOnInit(){
    this.isLoading = true;
    this.adDetails = this.adService.getModalAd();
    this.isLoading = false;
  }

  onClose(){
    this.dialogRef.close();
  }
}
