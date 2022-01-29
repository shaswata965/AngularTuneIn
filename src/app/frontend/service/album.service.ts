import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Album} from "../models/album.model";
import {Subject} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AlbumService{

  private albums: Album[] = [];
  private albumsUpdated = new Subject<Album []>();

  private modalAlbum: any | null;
  public albumLanguage: any | null;
  private albumLanguageUpdated = new Subject<any>();

  public albumInfo: any | null;
  public albumInfoUpdated = new Subject<any>();

  constructor(private http: HttpClient, private router: Router) { }

  addAlbum(name:string, description:string, cast:string, release:string, year: string, language:string, artist:string, genre:string, castLink: string, image: File){
    const albumData = new FormData();
    albumData.append('name', name);
    albumData.append('description', description);
    albumData.append('cast', cast);
    albumData.append('release', release);
    albumData.append('year',year);
    albumData.append('language',language);
    albumData.append('artist',artist);
    albumData.append('genre',genre);
    albumData.append('castLink',castLink)
    albumData.append('image', image, name);
    this.http.post<{message: string}>('http://localhost:3000/api/albums', albumData)
      .subscribe((Data)=>{
        console.log(Data.message);
        this.router.navigate(['/view-album']);
      });
  }

  updateAlbum(id: string | null, name: string,  description: string, cast: string, release: string, year:string, language:string, artist:string, genre:string, castLink:string, image: File | string){
    let albumData : Album | FormData ;
    if(typeof (image) === 'object'){
      albumData = new FormData();
      // @ts-ignore
      albumData.append('id', id);
      albumData.append('name', name);
      albumData.append('description', description);
      albumData.append('cast', cast);
      albumData.append('release', release);
      albumData.append('year',year);
      albumData.append('language',language);
      albumData.append('artist',artist);
      albumData.append('genre',genre);
      albumData.append('castLink',castLink);
      albumData.append('image',image,name);
    }else{
      // @ts-ignore
      albumData = {id:id, name:name, description:description, cast:cast, release:release, year:year, language:language, artist:artist, genre:genre, castLink:castLink, imagePath: image};
    }
    this.http.put("http://localhost:3000/api/albums/" +id, albumData)
      .subscribe(response=>{
        const updatedAlbum = [...this.albums];
        const oldAlbumIndex = updatedAlbum.findIndex(a => a.id === id);
        // @ts-ignore
        const album: Album = {id:id, name:name, description:description, cast:cast, release:release, year:year, language:language, artist:artist, genre:genre, castLink:castLink, imagePath: response.imagePath}
        updatedAlbum[oldAlbumIndex] = album;
        this.albums = updatedAlbum;
        this.albumsUpdated.next([...this.albums]);
        this.router.navigate(['/view-album']);
      });
  }

  getEditAlbum(albumId: string | null){
    return this.http.get<{
      _id:string, name:string, description:string, cast:string, release:string, year:string, language:string, artist:string, genre:string, castLink:string, imagePath: string}>("http://localhost:3000/api/albums/" +albumId);
  }

  deleteAlbum(albumId:string){
    this.http.delete("http://localhost:3000/api/albums/" +albumId)
      .subscribe(()=>{
        const updatedAlbums = this.albums.filter(a=> a.id !=albumId);
        this.albums = updatedAlbums;
        this.albumsUpdated.next([...this.albums]);
      });
  }

  addModalAlbum(album: any){
    this.modalAlbum = album;
  }

  getAlbums(){
    this.http.get<{message:string, albums: any }>(
      "http://localhost:3000/api/albums"
    ).pipe(map((albumData)=>{
      // @ts-ignore
      return albumData.albums.map(album=>{
        return{
          name: album.name,
          description: album.description,
          cast: album.cast,
          release: album.release,
          year: album.year,
          id: album._id,
          castLink: album.castLink,
          language:album.language,
          artist: album.artist,
          genre: album.genre,
          imagePath: album.imagePath
        };
      });
    }))
      .subscribe(albums=>{
        this.albums = albums;
        this.albumsUpdated.next([...this.albums]);
      });
  }

  getAlbumsUpdateListener(){
    return this.albumsUpdated.asObservable();
  }

  getModalAlbum(){
    this.http.get<{albumDet: any}>('http://localhost:3000/api/albums/modal/'+ this.modalAlbum.language + '/'+ this.modalAlbum.artist + '/' + this.modalAlbum.genre)
      .subscribe((Data)=>{
        this.albumLanguage = Data;
        this.albumLanguageUpdated.next(this.albumLanguage)
      });
      return this.modalAlbum;
  }

  getAlbumLanguageUpdateListener(){
    return this.albumLanguageUpdated.asObservable();
  }

  searchForMovie(name: string){
      this.http.get<{movieData: any, message: string}>('http://localhost:3000/api/albums/imdb/' + name)
        .subscribe((Data) => {
          this.albumInfo = Data.movieData;
          this.albumInfoUpdated.next(this.albumInfo);
        });
  }

  getInfoUpdateListener(){
    return this.albumInfoUpdated.asObservable();
  }

}
