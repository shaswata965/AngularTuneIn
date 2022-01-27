import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Genre} from "../../frontend/models/genre.model";
import {GenreService} from "../../frontend/service/genre.service";

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.css']
})
export class GenreListComponent implements OnInit {

  genreDetails: Genre;

  constructor(public dialogRef: MatDialogRef<GenreListComponent>, public genreService: GenreService) { }

  ngOnInit(){
    this.genreDetails = this.genreService.getModalGenre();
  }

  onClose(){
    this.dialogRef.close();
  }
}
