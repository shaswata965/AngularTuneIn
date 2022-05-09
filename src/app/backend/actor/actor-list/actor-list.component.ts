import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ActorService} from "../../../frontend/service/actor.service";

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.css']
})
export class ActorListComponent implements OnInit {

  public actorDetails: any;
  isLoading = false;

  constructor(public dialogRef: MatDialogRef<ActorListComponent>, public actorService: ActorService) { }

  ngOnInit(){
    this.isLoading = true;
    this.actorDetails = this.actorService.getModalActor();
    this.isLoading = false;
  }

  onClose(){
    this.dialogRef.close();
  }

}
