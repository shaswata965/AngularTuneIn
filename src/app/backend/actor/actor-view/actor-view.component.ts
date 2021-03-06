import { Component, OnInit } from '@angular/core';
import {ActorService} from "../../../frontend/service/actor.service";
import {Subscription} from "rxjs";
import {Actor} from "../../../frontend/models/actor.model";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ActorListComponent} from "../actor-list/actor-list.component";

@Component({
  selector: 'app-actor-view',
  templateUrl: './actor-view.component.html',
  styleUrls: ['./actor-view.component.css']
})
export class ActorViewComponent implements OnInit {

  public actorsSub: Subscription;
  public actors: Actor[] = [];
  isLoading = false;

  constructor( public actorService : ActorService , private Dialog: MatDialog) { }

  ngOnInit(){
    this.actorService.getActors();
    this.isLoading = true;
    this.actorsSub = this.actorService.getActorsUpdateListener().subscribe((actors: Actor[])=>{
      this.actors = actors;
      this.isLoading =false;
    });
  }

  openViewModal(actor : any){
    this.isLoading = true;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "60%";
    this.Dialog.open(ActorListComponent, dialogConfig);
    this.actorService.addModalActor(actor);
    this.isLoading = false;
  }

  onDelete(actorId: string){
    this.isLoading = true;
    this.actorService.deleteActor(actorId);
    this.isLoading = false;
  }

}
