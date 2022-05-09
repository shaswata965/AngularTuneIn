import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-actor',
  templateUrl: './create-actor.component.html',
  styleUrls: ['./create-actor.component.css']
})
export class CreateActorComponent implements OnInit {

  public title1: string = "Actor"
  public title2: string = "Create"

  constructor() { }

  ngOnInit(): void {
  }

}
