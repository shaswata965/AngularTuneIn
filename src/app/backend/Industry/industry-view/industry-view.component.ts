import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {Industry} from "../../../frontend/models/industry.model";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {IndustryService} from "../../../frontend/service/industry.service";
import {PageEvent} from "@angular/material/paginator";
import {IndustryListComponent} from "../industry-list/industry-list.component";

@Component({
  selector: 'app-industry-view',
  templateUrl: './industry-view.component.html',
  styleUrls: ['./industry-view.component.css']
})
export class IndustryViewComponent implements OnInit {

  industries: Industry[] =[];
  private industriesSub: Subscription;
  public modalIndustry : any | null;
  isLoading = false;
  totalSongs = 0;

  constructor(public industryService: IndustryService,
              private Dialog: MatDialog) { }

  ngOnInit(){
    this.isLoading = true;
    this.industryService.getIndustries(3,1);
    this.industriesSub = this.industryService.getIndustriesUpdateListener().subscribe((industryData:{industries: Industry[], industryCount:number})=>{
      this.industries = industryData.industries;
      this.totalSongs = industryData.industryCount;
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.industriesSub.unsubscribe();
  }

  onDelete(industryId: string){
    this.isLoading = true;
    this.industryService.deleteIndustry(industryId).subscribe(()=>{
      this.industryService.getIndustries(3,1);
    });
  }

  openViewModal(industry : any){
    this.isLoading = true;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "40%";
    this.Dialog.open(IndustryListComponent, dialogConfig);
    this.industryService.addModalIndustry(industry);
    this.isLoading = false;
  }

  onChangedPage(pageEvent: PageEvent){
    this.industryService.getIndustries(pageEvent.pageSize, pageEvent.pageIndex+1);
  }

}
