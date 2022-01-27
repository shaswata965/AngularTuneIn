import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {GenreService} from "../../frontend/service/genre.service";
import {Genre} from "../../frontend/models/genre.model";
import {GenreListComponent} from "../genre-list/genre-list.component";

@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.css']
})
export class GenreViewComponent implements OnInit {

  public genresSub: Subscription;
  public genres: any | null;

  constructor( public genreService: GenreService, private Dialog: MatDialog) { }

  ngOnInit(){
    this.genreService.getGenre();
    this.genresSub = this.genreService.getGenresUpdateListener().subscribe((genres: Genre[])=>{
      this.genres = genres;
    });
  }

  openViewModal(genre : any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "60%";
    this.Dialog.open(GenreListComponent, dialogConfig);
    this.genreService.addModalGenre(genre);
  }

  onDelete(genreId: string){
    this.genreService.deleteGenre(genreId);
  }
}
