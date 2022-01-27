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
  public artistsUpdated = new Subject<Artist []>();
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

  getArtist(){
    this.http.get<{message:string, artists: any }>(
      "http://localhost:3000/api/artists"
    ).pipe(map((artistData)=>{
      // @ts-ignore
      return artistData.artists.map(artist=>{
        return{
          name: artist.name,
          id: artist._id,
          imagePath: artist.imagePath
        };
      });
    }))
      .subscribe(artist=>{
        this.artists = artist;
        this.artistsUpdated.next([...this.artists]);
      });
  }

  getArtistsUpdateListener(){
    return this.artistsUpdated.asObservable();
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
        const updatedArtist = [...this.artists];
        const oldArtistIndex = updatedArtist.findIndex(a => a.id === id);
        // @ts-ignore
        const artist: Artist = {id:id, name:name, imagePath: response.imagePath}
        updatedArtist[oldArtistIndex] = artist;
        this.artists = updatedArtist;
        this.artistsUpdated.next([...this.artists]);
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
    this.http.delete("http://localhost:3000/api/artists/" +artistId)
      .subscribe(()=>{
        const updatedArtists = this.artists.filter(a=> a.id !=artistId);
        this.artists = updatedArtists;
        this.artistsUpdated.next([...this.artists]);
      });
  }


}
