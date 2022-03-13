import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {mimeType} from "../admin-signup/signup/mime-type.validator";
import {Language} from "../../frontend/models/language.model";
import {Genre} from "../../frontend/models/genre.model";
import {LanguageService} from "../../frontend/service/language.service";
import {ActorService} from "../../frontend/service/actor.service";
import {AlbumService} from "../../frontend/service/album.service";
import {GenreService} from "../../frontend/service/genre.service";
import {Subscription} from "rxjs";
import {Actor} from "../../frontend/models/actor.model";
import {Album} from "../../frontend/models/album.model";
import {ActivatedRoute} from "@angular/router";
import {Song} from "../../frontend/models/song.model";
import {SongService} from "../../frontend/service/song.service";

@Component({
  selector: 'app-song-create',
  templateUrl: './song-create.component.html',
  styleUrls: ['./song-create.component.css']
})
export class SongCreateComponent implements OnInit, OnDestroy {

  public songId: string | null;

  public mode = "Create";

  public song : Song;

  languages: Language[] =[];
  private languagesSub: Subscription;
  actors: Actor[] =[];
  private actorSub: Subscription;
  albums: Album[] =[];
  private albumsSub: Subscription;
  genres: Genre[] =[];
  private genresSub: Subscription;

  form: FormGroup;
  imagePreview: string | ArrayBuffer | null;
  lowSongPreview: string | null;
  highSongPreview: string | null;

  constructor(public route: ActivatedRoute, public songService: SongService, public languageService: LanguageService, public actorService: ActorService, public albumService: AlbumService, public genreService: GenreService) { }

  ngOnInit(){
    this.form = new FormGroup({
      'name': new FormControl(null, {validators: [Validators.required]}),
      'language': new FormControl(null,{validators:[Validators.required]}),
      'actor': new FormControl(null,{validators:[Validators.required]}),
      'genre': new FormControl(null,{validators:[Validators.required]}),
      'album': new FormControl(null,{validators:[Validators.required]}),
      'image': new FormControl(null,{validators: [Validators.required], asyncValidators: [mimeType]}),
      'lowSong': new FormControl(null,{validators:[Validators.required]}),
      'highSong': new FormControl(null,{validators:[Validators.required]})
    });

    this.languageService.getLanguages();
    this.languagesSub = this.languageService.getLanguagesUpdateListener().subscribe((languages: Language[])=>{
      this.languages = languages;
    });

    this.actorService.getActors();
    this.actorSub = this.actorService.getActorsUpdateListener().subscribe((actor:Actor[])=>{
      this.actors = actor;
    });

    this.albumService.getAlbums();
    this.albumsSub = this.albumService.getAlbumsUpdateListener().subscribe((album:Album[])=>{
      this.albums = album;
    });

    this.genreService.getGenre();
    this.genresSub = this.genreService.getGenresUpdateListener().subscribe((genre:Genre[])=>{
      this.genres = genre;
    });

    this.route.paramMap.subscribe((paramMap)=>{
      if(paramMap.has('songId')){
        this.mode="Edit";
        this.songId = paramMap.get('songId');
        this.songService.getEditSong(this.songId).subscribe(songData=>{
          this.song = {id:songData._id, name:songData.name, language: songData.language, actor: songData.actor, genre: songData.genre, album: songData.album, imagePath: songData.imagePath, lowPath: songData.lowPath, highPath: songData.highPath};
          this.form.setValue({
            'name': this.song.name,
            'language': this.song.language,
            'actor': this.song.actor,
            'genre': this.song.genre,
            'album': this.song.album,
            'image': this.song.imagePath,
            'lowSong': this.song.lowPath,
            'highSong': this.song.highPath
          });
        });
      }else{
        this.mode = "Create";
        this.songId = null;
      }
    });
  }

  ngOnDestroy() {
    this.languagesSub.unsubscribe();
    this.actorSub.unsubscribe();
    this.genresSub.unsubscribe();
    this.albumsSub.unsubscribe();
  }

  createSong(){
    if(this.form.invalid){
      return
    }
    if(this.mode==='Create'){
      this.songService.addSong(this.form.value.name, this.form.value.language, this.form.value.actor, this.form.value.genre, this.form.value.album, this.form.value.image, this.form.value.lowSong, this.form.value.highSong);
    }else{
      this.songService.updateSong(this.songId,this.form.value.name, this.form.value.language, this.form.value.actor, this.form.value.genre, this.form.value.album, this.form.value.image, this.form.value.lowSong, this.form.value.highSong )
    }
    this.form.reset();
  }

  onImagePicked(event: Event){
    // @ts-ignore
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = ()=>{
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onLowSongPicked(event: Event){
    // @ts-ignore
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({lowSong: file});
    this.form.get('lowSong')?.updateValueAndValidity();
    // const reader = new FileReader();
    // reader.onload = ()=>{
    //   this.lowSongPreview = reader.result;
    // };
    // reader.readAsDataURL(file);

    this.lowSongPreview = URL.createObjectURL(file);
  }

  onHighSongPicked(event: Event){
    // @ts-ignore
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({highSong: file});
    this.form.get('highSong')?.updateValueAndValidity();
    // const reader = new FileReader();
    // reader.onload = ()=>{
    //   this.highSongPreview = reader.result;
    // };
    // reader.readAsDataURL(file);
    this.highSongPreview = URL.createObjectURL(file);
  }

}
