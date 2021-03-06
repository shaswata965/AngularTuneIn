import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {mimeType} from "../../Admin/signup/mime-type.validator";
import {ActivatedRoute} from "@angular/router";
import {AlbumService} from "../../../frontend/service/album.service";
import {Album} from "../../../frontend/models/album.model";
import {Language} from "../../../frontend/models/language.model";
import {LanguageService} from "../../../frontend/service/language.service";
import {Subscription} from "rxjs";
import {ArtistService} from "../../../frontend/service/artist.service";
import {Artist} from "../../../frontend/models/artist.model";
import {GenreService} from "../../../frontend/service/genre.service";
import {Genre} from "../../../frontend/models/genre.model";
import {Industry} from "../../../frontend/models/industry.model";
import {IndustryService} from "../../../frontend/service/industry.service";

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
  industries: Industry[] = [];
  public industriesSub: Subscription;

  imdb: string ='';
  idString: string= '';

  form: FormGroup;
  imagePreview: string | ArrayBuffer | null;
  isLoading = false;

  constructor(public route: ActivatedRoute,
              public albumService:AlbumService,
              public languageService: LanguageService,
              public artistService: ArtistService,
              public genreService: GenreService,
              public industryService: IndustryService) { }

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
      'industry':new FormControl(null,{validators:[Validators.required]}),
      'image': new FormControl(null,{validators: [Validators.required], asyncValidators: [mimeType]})
    });

    this.isLoading = true;

    this.languageService.getLanguages(1000,1);
    this.languagesSub = this.languageService.getLanguagesUpdateListener().subscribe((languageData:{languages: Language[], languageCount: number})=>{
      this.languages = languageData.languages;
    });

    this.artistService.getArtist(1000,1);
    this.artistSub = this.artistService.getArtistsUpdateListener().subscribe((artistData:{artists: Artist[], artistCount: number})=>{
      this.artists = artistData.artists;
    });

    this.genreService.getGenre();
    this.genresSub = this.genreService.getGenresUpdateListener().subscribe((genre:Genre[])=>{
      this.genres = genre;
      this.isLoading = false;
    });

    this.industryService.getIndustries(1000,1);
    this.industriesSub = this.industryService.getIndustriesUpdateListener().subscribe((industryData:{industries: Industry[], industryCount: number})=>{
      this.industries = industryData.industries;
    });

    this.route.paramMap.subscribe((paramMap)=>{
      if(paramMap.has('albumId')){
        this.mode="Edit";
        this.isLoading = true;
        this.albumId = paramMap.get('albumId');
        this.albumService.getEditAlbum(this.albumId).subscribe(albumData=>{
          this.album = {id:albumData._id, name:albumData.name,  description:albumData.description, cast:albumData.cast, release:albumData.release, year: albumData.year, language: albumData.language, artist: albumData.artist, genre: albumData.genre, industry: albumData.industry, castLink:albumData.castLink, imagePath: albumData.imagePath};
          this.form.setValue({
            'name': this.album.name,
            'description': this.album.description,
            'cast': this.album.cast,
            'release': this.album.release,
            'year': this.album.year,
            'language': this.album.language,
            'artist': this.album.artist,
            'genre':this.album.genre,
            'industry':this.album.industry,
            'image': this.album.imagePath
          });
          this.isLoading = false;
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
    if(!this.idString){
      this.idString = 'N/A';
    }
    this.isLoading = true;
    if(this.mode==='Create'){
      this.albumService.addAlbum(this.form.value.name, this.form.value.description, this.form.value.cast, this.form.value.release, this.form.value.year, this.form.value.language, this.form.value.artist, this.form.value.genre, this.form.value.industry, this.idString, this.form.value.image);
    }else{
      this.albumService.updateAlbum(this.albumId,this.form.value.name, this.form.value.description, this.form.value.cast, this.form.value.release, this.form.value.year, this.form.value.language, this.form.value.artist, this.form.value.genre, this.form.value.industry, this.album.castLink, this.form.value.image )
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
    if(val){
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
        'industry': null,
        'image': null
      });
    });
    }else{
      this.idString = "N/A";
    }
  }

  resetForm(){
    this.infosSub.unsubscribe();
    this.form.reset();
    window.location.reload();
  }
}
