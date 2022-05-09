import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Genre} from "../../../frontend/models/genre.model";
import {GenreService} from "../../../frontend/service/genre.service";

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.css']
})
export class GenreListComponent implements OnInit {

  genreDetails: Genre;
  isLoading = false;

  constructor(public dialogRef: MatDialogRef<GenreListComponent>, public genreService: GenreService) { }

  ngOnInit(){
    this.isLoading = true;
    this.genreDetails = this.genreService.getModalGenre();
    this.isLoading = false;
  }

  onClose(){
    this.dialogRef.close();
  }
}
