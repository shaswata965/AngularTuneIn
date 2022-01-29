import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {mimeType} from "../admin-signup/signup/mime-type.validator";
import {ActivatedRoute} from "@angular/router";
import {AlbumService} from "../../frontend/service/album.service";
import {Album} from "../../frontend/models/album.model";
import {Language} from "../../frontend/models/language.model";
import {LanguageService} from "../../frontend/service/language.service";
import {Subscription} from "rxjs";
import {ArtistService} from "../../frontend/service/artist.service";
import {Artist} from "../../frontend/models/artist.model";
import {GenreService} from "../../frontend/service/genre.service";
import {Genre} from "../../frontend/models/genre.model";

@Component({
  selector: 'app-album-create',
  templateUrl: './album-create.component.html',
  styleUrls: ['./album-create.component.css']
})
export class AlbumCreateComponent implements OnInit, OnDestroy {

  public albumId : string | null;
  public mode = "Create";
  public album: Album;
  languages: Language[] =[];
  private languagesSub: Subscription;
  name = '';
  public apiName: string;
  private infosSub: Subscription;
  public info: any | null;
  artists: Artist[] = [];
  public artistSub: Subscription;
  genres: Genre[] = [];
  public genresSub: Subscription;

  imdb: string ='';
  idString: string= '';

  form: FormGroup;
  imagePreview: string | ArrayBuffer | null;

  constructor(public route: ActivatedRoute, public albumService:AlbumService, public languageService: LanguageService, public artistService: ArtistService, public genreService: GenreService) { }

  ngOnInit(){
    this.form = new FormGroup({
      'name': new FormControl(null, {validators: [Validators.required]}),
      'description': new FormControl(null,{validators:[Validators.required]}),
      'cast': new FormControl(null,{validators:[Validators.required]}),
      'release': new FormControl(null,{validators:[Validators.required]}),
      'year': new FormControl(null,{validators:[Validators.required]}),
      'language': new FormControl(null,{validators:[Validators.required]}),
      'artist': new FormControl(null,{validators:[Validators.required]}),
      'genre':new FormControl(null,{validators:[Validators.required]}),
      'image': new FormControl(null,{validators: [Validators.required], asyncValidators: [mimeType]})
    });

    this.languageService.getLanguages();
    this.languagesSub = this.languageService.getLanguagesUpdateListener().subscribe((languages: Language[])=>{
      this.languages = languages;
    });

    this.artistService.getArtist();
    this.artistSub = this.artistService.getArtistsUpdateListener().subscribe((artist:Artist[])=>{
      this.artists = artist;
    });

    this.genreService.getGenre();
    this.genresSub = this.genreService.getGenresUpdateListener().subscribe((genre:Genre[])=>{
      this.genres = genre;
    });

    this.route.paramMap.subscribe((paramMap)=>{
      if(paramMap.has('albumId')){
        this.mode="Edit";
        this.albumId = paramMap.get('albumId');
        this.albumService.getEditAlbum(this.albumId).subscribe(albumData=>{
          this.album = {id:albumData._id, name:albumData.name,  description:albumData.description, cast:albumData.cast, release:albumData.release, year: albumData.year, language: albumData.language, artist: albumData.artist, genre: albumData.genre, castLink:albumData.castLink, imagePath: albumData.imagePath};
          this.form.setValue({
            'name': this.album.name,
            'description': this.album.description,
            'cast': this.album.cast,
            'release': this.album.release,
            'year': this.album.year,
            'language': this.album.language,
            'artist': this.album.artist,
            'genre':this.album.genre,
            'image': this.album.imagePath
          });
        });
      }else{
        this.mode = "Create";
        this.albumId = null;

      }
    });
  }

  ngOnDestroy() {
    this.languagesSub.unsubscribe();
    this.artistSub.unsubscribe();
    this.genresSub.unsubscribe();
  }

  createAlbum(){
    if(this.form.invalid){
      return
    }
    if(this.mode==='Create'){
      this.albumService.addAlbum(this.form.value.name, this.form.value.description, this.form.value.cast, this.form.value.release, this.form.value.year, this.form.value.language, this.form.value.artist, this.form.value.genre, this.idString, this.form.value.image);
    }else{
      this.albumService.updateAlbum(this.albumId,this.form.value.name, this.form.value.description, this.form.value.cast, this.form.value.release, this.form.value.year, this.form.value.language, this.form.value.artist, this.form.value.genre, this.album.castLink, this.form.value.image )
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

  linkDecipher(val:any){
    let firstArray = val.split("/");
    this.albumService.searchForMovie(firstArray[4]);
    this.infosSub = this.albumService.getInfoUpdateListener().subscribe(response=>{
      this.info = {name: response.title, description: response.plot, cast: response.starList, year: response.year, release: response.releaseDate};
      let firstArray = [];
      let nameArray = [];
      let idArray = [];
      for (let p of response.starList){
        firstArray.push(p);
      }

      for(let i = 0; i<firstArray.length; i++){
        let x = " "+firstArray[i].name;
        let y = " https://www.imdb.com/name/"+firstArray[i].id+"/";
        nameArray.push(x);
        idArray.push(y);
      }
      let cast = nameArray.toString();
      this.idString = idArray.toString();
      this.form.setValue({
        'name': this.info.name,
        'description': this.info.description,
        'cast': cast,
        'release': this.info.release,
        'year': this.info.year,
        'language': null,
        'artist': null,
        'genre': null,
        'image': null
      });
    });
  }

  resetForm(){
    this.infosSub.unsubscribe();
    this.form.reset();
    window.location.reload();
  }
}
