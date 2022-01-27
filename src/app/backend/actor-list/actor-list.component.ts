import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ActorService} from "../../frontend/service/actor.service";

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.css']
})
export class ActorListComponent implements OnInit {

  public actorDetails: any;

  constructor(public dialogRef: MatDialogRef<ActorListComponent>, public actorService: ActorService) { }

  ngOnInit(){
    this.actorDetails = this.actorService.getModalActor();
  }

  onClose(){
    this.dialogRef.close();
  }

}
