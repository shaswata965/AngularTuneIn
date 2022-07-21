import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {map} from "rxjs/operators";
import {Artist} from "../models/artist.model";

@Injectable({
  providedIn: 'root'
})
export class ArtistService{

  public artists: Artist[] = [];
  public artistsUpdated = new Subject<{artists : Artist [], artistCount: number}>();
  public featuredArtists: any[] = [];
  public featuredArtistsUpdated = new Subject<{artists : any [], artistCount: number}>();
  public modalArtist: any | null ;

  constructor(private http: HttpClient, private router: Router) { }

  addArtist(name:string, image: File){
    const artistData = new FormData();
    artistData.append('name', name);
    artistData.append('image', image, name);
    this.http.post<{message: string}>('http://localhost:3000/api/artists', artistData)
      .subscribe((Data)=>{
        this.router.navigate(['/view-artist']);
      });
  }

  getArtist(artistPerPage: number, currentPage: number){
    const queryParams = `?pageSize=${artistPerPage}&page=${currentPage}`;
    this.http.get<{message:string, artists: any, count:number}>(
      "http://localhost:3000/api/artists" + queryParams
    ).pipe(map((artistData)=>{
      // @ts-ignore
      return {artists: artistData.artists.map(artist=>{
        return{
          name: artist.name,
          id: artist._id,
          imagePath: artist.imagePath
        };
      }), artistCount: artistData.count};
    }))
      .subscribe(artistData=>{
        this.artists = artistData.artists;
        this.artistsUpdated.next({artists : [...this.artists], artistCount: artistData.artistCount});
      });
  }

  getArtistsUpdateListener(){
    return this.artistsUpdated.asObservable();
  }

  getFeaturedArtist(artistPerPage: number, currentPage: number){
    const queryParams = `?pageSize=${artistPerPage}&page=${currentPage}`;
    this.http.get<{message:string, artists: any, count:number}>(
      "http://localhost:3000/api/artists/featured-artists" + queryParams
    ).pipe(map((artistData)=>{
      // @ts-ignore
      return {artists: artistData.artists.map(artist=>{
          return{
            name: artist.name,
            id: artist._id,
            imagePath: artist.imagePath,
            songs: artist.songs
          };
        }), artistCount: artistData.count};
    }))
      .subscribe(artistData=>{
        this.featuredArtists = artistData.artists;
        this.featuredArtistsUpdated.next({artists : [...this.featuredArtists], artistCount: artistData.artistCount});
      });
  }

  getFeaturedArtistsUpdateListener(){
    return this.featuredArtistsUpdated.asObservable();
  }

  updateArtist(id: string | null, name: string, image: File | string){
    let artistData : Artist | FormData ;
    if(typeof (image) === 'object'){
      artistData = new FormData();
      // @ts-ignore
      artistData.append('id', id);
      artistData.append('name', name);
      artistData.append('image',image,name);
    }else{
      // @ts-ignore
      artistData = {id:id, name:name, imagePath: image};
    }
    this.http.put("http://localhost:3000/api/artists/" +id, artistData)
      .subscribe(response=>{
        this.router.navigate(['/view-artist']);
      });
  }

  getEditArtist(artistId: string | null){
    return this.http.get<{
      _id:string, name:string, imagePath: string}>("http://localhost:3000/api/artists/" +artistId);
  }

  addModalArtist(artist: any){
    this.modalArtist = artist;
  }

  getModalArtist(){
    return this.modalArtist;
  }

  deleteArtist(artistId:string){
    return this.http.delete("http://localhost:3000/api/artists/" +artistId);
  }

  getArtistId(artist:string){
    return this.http.get<{
      _id:string, name:string, imagePath: string}>("http://localhost:3000/api/artists/artistName/" +artist);
  }


}
