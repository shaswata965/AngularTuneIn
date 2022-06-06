import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {mimeType} from "../../Admin/signup/mime-type.validator";
import {Language} from "../../../frontend/models/language.model";
import {Genre} from "../../../frontend/models/genre.model";
import {LanguageService} from "../../../frontend/service/language.service";
import {ActorService} from "../../../frontend/service/actor.service";
import {AlbumService} from "../../../frontend/service/album.service";
import {GenreService} from "../../../frontend/service/genre.service";
import {Subscription} from "rxjs";
import {Actor} from "../../../frontend/models/actor.model";
import {Album} from "../../../frontend/models/album.model";
import {ActivatedRoute} from "@angular/router";
import {Song} from "../../../frontend/models/song.model";
import {SongService} from "../../../frontend/service/song.service";
import {Artist} from "../../../frontend/models/artist.model";
import {ArtistService} from "../../../frontend/service/artist.service";
import {Industry} from "../../../frontend/models/industry.model";
import {IndustryService} from "../../../frontend/service/industry.service";

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
  artists: Artist[] =[];
  private artistsSub: Subscription;
  industries: Industry[] =[];
  private industriesSub: Subscription;
  public lowFileSize: any;
  public highFileSize: any;
  public lowDuration: any;
  public highDuration: any;

  form: FormGroup;
  imagePreview: string | ArrayBuffer | null;
  lowSongPreview: string | null;
  highSongPreview: string | null;
  isLoading = false;

  constructor(public route: ActivatedRoute,
              public songService: SongService,
              public languageService: LanguageService,
              public actorService: ActorService,
              public albumService: AlbumService,
              public genreService: GenreService,
              public artistService: ArtistService,
              public industryService: IndustryService) { }

  ngOnInit(){
    this.form = new FormGroup({
      'name': new FormControl(null, {validators: [Validators.required]}),
      'language': new FormControl(null,{validators:[Validators.required]}),
      'actor': new FormControl(null,{validators:[Validators.required]}),
      'genre': new FormControl(null,{validators:[Validators.required]}),
      'album': new FormControl(null,{validators:[Validators.required]}),
      'artist': new FormControl(null,{validators:[Validators.required]}),
      'industry': new FormControl(null,{validators:[Validators.required]}),
      'trending':new FormControl(null,{validators:[Validators.required]}),
      'image': new FormControl(null,{validators: [Validators.required], asyncValidators: [mimeType]}),
      'lowSong': new FormControl(null,{validators:[Validators.required]}),
      'highSong': new FormControl(null,{validators:[Validators.required]})
    });

    this.isLoading = true;
    this.languageService.getLanguages(1000,1);
    this.languagesSub = this.languageService.getLanguagesUpdateListener().subscribe((languageData:{languages: Language[], languageCount: number})=>{
      this.languages = languageData.languages;
    });

    this.actorService.getActors();
    this.actorSub = this.actorService.getActorsUpdateListener().subscribe((actor:Actor[])=>{
      this.actors = actor;
    });

    this.albumService.getAlbums(1000,1);
    this.albumsSub = this.albumService.getAlbumsUpdateListener().subscribe((albumData:{albums: Album[], albumCount:number})=>{
      this.albums = albumData.albums;
    });

    this.genreService.getGenre();
    this.genresSub = this.genreService.getGenresUpdateListener().subscribe((genre:Genre[])=>{
      this.genres = genre;
    });

    this.industryService.getIndustries(1000,1);
    this.industriesSub = this.industryService.getIndustriesUpdateListener().subscribe((industryData:{industries: Industry[], industryCount: number})=>{
      this.industries = industryData.industries;
    });

    this.artistService.getArtist(1000,1);
    this.artistsSub = this.artistService.getArtistsUpdateListener().subscribe((artistData:{artists: Artist[], artistCount:number})=>{
      this.artists = artistData.artists;
      this.isLoading = false;
    });

    this.route.paramMap.subscribe((paramMap)=>{
      if(paramMap.has('songId')){
        this.mode="Edit";
        this.songId = paramMap.get('songId');
        this.isLoading = true;
        this.songService.getEditSong(this.songId).subscribe(songData=>{
          this.song = {id:songData._id, name:songData.name, language: songData.language, actor: songData.actor, genre: songData.genre, album: songData.album, artist: songData.artist, trending: songData.trending, duration: songData.duration, industry: songData.industry, imagePath: songData.imagePath, lowPath: songData.lowPath, highPath: songData.highPath};
          this.form.setValue({
            'name': this.song.name,
            'language': this.song.language,
            'actor': this.song.actor,
            'genre': this.song.genre,
            'album': this.song.album,
            'artist': this.song.artist,
            'trending': this.song.trending,
            'industry': this.song.industry,
            'image': this.song.imagePath,
            'lowSong': this.song.lowPath,
            'highSong': this.song.highPath
          });
          this.isLoading = false;
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
    console.log(this.lowDuration);
    this.isLoading = true;
    if(this.mode==='Create'){
      this.songService.addSong(this.form.value.name, this.form.value.language, this.form.value.actor, this.form.value.genre, this.form.value.album, this.form.value.artist, this.form.value.trending, this.lowDuration, this.form.value.industry, this.form.value.image, this.form.value.lowSong, this.form.value.highSong);
    }else{
      this.songService.updateSong(this.songId,this.form.value.name, this.form.value.language, this.form.value.actor, this.form.value.genre, this.form.value.album, this.form.value.artist, this.form.value.trending, this.lowDuration, this.form.value.industry, this.form.value.image, this.form.value.lowSong, this.form.value.highSong )
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

    let finalDuration = '';

    // @ts-ignore
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({lowSong: file});
    this.form.get('lowSong')?.updateValueAndValidity();
    this.lowFileSize = ((file.size)/1024/1024).toFixed(2) + " MB";
    this.lowSongPreview = URL.createObjectURL(file);
    let lowAudio = new Audio(this.lowSongPreview);
    // @ts-ignore
    let array: string[] = [];
      lowAudio.addEventListener('loadedmetadata',function(){
      let duration = lowAudio.duration;
      let m = Math.floor(duration/60);
      let s = (((duration/60) -m).toFixed(2));
      let seconds = '';
      let minute = '';
      if(+s > 0.6){
        seconds = (+s-0.6).toString();
        minute = (m+1).toString();
      }else{
        seconds = s.toString();
        minute = m.toString();
      }
      let secondsArray = [];
      secondsArray = seconds.split('');
      finalDuration = minute+":"+ secondsArray[2] + secondsArray[3];
      array.push( finalDuration);
    }, false);
      this.lowDuration = array;
  }

  onHighSongPicked(event: Event){
    let finalDuration = '';
    // @ts-ignore
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({highSong: file});
    this.form.get('highSong')?.updateValueAndValidity();
    this.highFileSize = ((file.size)/1024/1024).toFixed(2) + " MB";
    this.highSongPreview = URL.createObjectURL(file);
  }

}
