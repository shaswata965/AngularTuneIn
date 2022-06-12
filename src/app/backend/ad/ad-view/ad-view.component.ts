import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AdService} from "../../../frontend/service/ad.service";
import {Ad} from "../../../frontend/models/ad.model";
import {AdListComponent} from "../ad-list/ad-list.component";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-ad-view',
  templateUrl: './ad-view.component.html',
  styleUrls: ['./ad-view.component.css']
})
export class AdViewComponent implements OnInit {

  public adsSub: Subscription;
  public ads: any | null;
  isLoading = false;
  totalSongs = 0;

  constructor( public adService: AdService, private Dialog: MatDialog) { }

  ngOnInit(){
    this.isLoading = true;
    this.adService.getAd(3,1);
    this.adsSub = this.adService.getAdsUpdateListener().subscribe((adData:{ads: Ad[], adCount: number})=>{
      this.ads = adData.ads;
      this.totalSongs = adData.adCount;
      this.isLoading = false;
    });
  }

  openViewModal(ad : any){
    this.isLoading = true;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "60%";
    this.Dialog.open(AdListComponent, dialogConfig);
    this.adService.addModalAd(ad);
    this.isLoading = false;
  }

  onDelete(adId: string){
    this.isLoading = true;
    this.adService.deleteAd(adId).subscribe(()=>{
      this.adService.getAd(3,1);
    });
  }

  onChangedPage(pageEvent: PageEvent){
    this.adService.getAd(pageEvent.pageSize, pageEvent.pageIndex+1);
  }


}
