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
  private albumsUpdated = new Subject<{albums: Album [], albumCount:number}>();

  private modalAlbum: any | null;
  public albumDetails: any | null;
  private albumDetailsUpdated = new Subject<any>();

  public albumInfo: any | null;
  public albumInfoUpdated = new Subject<any>();

  private albumsDataUpdated = new Subject<{ albums: Album [], albumCount: number }>();
  private albumsIndustryUpdated = new Subject<{ albums: Album [], albumCount: number }>();
  private albumsLetterUpdated = new Subject<{ albums: Album [], albumCount: number }>();
  private albumsYearUpdated = new Subject<{ albums: Album [], albumCount: number }>();

  constructor(private http: HttpClient, private router: Router) { }

  addAlbum(name:string, description:string, cast:string, release:string, year: string, language:string, artist:string, genre:string, industry:string, castLink: string, image: File){
    const albumData = new FormData();
    albumData.append('name', name);
    albumData.append('description', description);
    albumData.append('cast', cast);
    albumData.append('release', release);
    albumData.append('year',year);
    albumData.append('language',language);
    albumData.append('artist',artist);
    albumData.append('genre',genre);
    albumData.append('industry',industry);
    albumData.append('castLink',castLink)
    albumData.append('image', image, name);
    this.http.post<{message: string}>('http://localhost:3000/api/albums', albumData)
      .subscribe((Data)=>{
        console.log(Data.message);
        this.router.navigate(['/view-album']);
      });
  }

  updateAlbum(id: string | null, name: string,  description: string, cast: string, release: string, year:string, language:string, artist:string, genre:string, industry:string, castLink:string, image: File | string){
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
      albumData.append('industry',industry);
      albumData.append('castLink',castLink);
      albumData.append('image',image,name);
    }else{
      // @ts-ignore
      albumData = {id:id, name:name, description:description, cast:cast, release:release, year:year, language:language, artist:artist, genre:genre, industry:industry, castLink:castLink, imagePath: image};
    }
    this.http.put("http://localhost:3000/api/albums/" +id, albumData)
      .subscribe(response=>{
        this.router.navigate(['/view-album']);
      });
  }

  getEditAlbum(albumId: string | null){
    return this.http.get<{
      _id:string, name:string, description:string, cast:string, release:string, year:string, language:string, artist:string, genre:string, industry:string, castLink:string, imagePath: string}>("http://localhost:3000/api/albums/" +albumId);
  }

  deleteAlbum(albumId:string){
    return this.http.delete("http://localhost:3000/api/albums/" +albumId)
  }

  addModalAlbum(album: any){
    this.modalAlbum = album;
  }

  getAlbums(albumPerPage: number, currentPage:number){
    const queryParams = `?pageSize=${albumPerPage}&page=${currentPage}`;
    this.http.get<{message:string, albums: any, count: number }>(
      "http://localhost:3000/api/albums" + queryParams
    ).pipe(map((albumData)=>{
      // @ts-ignore
      return {albums: albumData.albums.map(album=>{
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
          industry: album.industry,
          imagePath: album.imagePath
        };
      }), albumCount: albumData.count};
    }))
      .subscribe(albumData=>{
        this.albums = albumData.albums;
        this.albumsUpdated.next({albums:[...this.albums], albumCount: albumData.albumCount});
      });
  }

  getAlbumsUpdateListener(){
    return this.albumsUpdated.asObservable();
  }

  getModalAlbum(){
    this.http.get<{albumDet: any}>('http://localhost:3000/api/albums/modal/'+ this.modalAlbum.language + '/' + this.modalAlbum.genre + '/' + this.modalAlbum.industry)
      .subscribe((Data)=>{
        this.albumDetails = Data;
        this.albumDetailsUpdated.next(this.albumDetails)
      });
      return this.modalAlbum;
  }

  getAlbumDetailsUpdateListener(){
    return this.albumDetailsUpdated.asObservable();
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

  getAlbumLanguage(languageId:string, albumPerPage: number, currentPage:number){
    const queryParams = `?pageSize=${albumPerPage}&page=${currentPage}`;
    this.http.get<{message:string, albums: any, count: number }>(
      "http://localhost:3000/api/albums/find-language/"+ languageId + queryParams
    ).pipe(map((albumData)=>{
      // @ts-ignore
      return {albums: albumData.albums.map(album=>{
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
            industry: album.industry,
            imagePath: album.imagePath
          };
        }), albumCount: albumData.count};
    }))
      .subscribe(albumData=>{
        this.albums = albumData.albums;
        this.albumsDataUpdated.next({albums:[...this.albums], albumCount: albumData.albumCount});
      });
  }

  getDataUpdateListener(){
    return this.albumsDataUpdated.asObservable();
  }

  getIndustryFilterAlbum(industryId:string, albumPerPage: number, currentPage:number){
    const queryParams = `?pageSize=${albumPerPage}&page=${currentPage}`;
    this.http.get<{message:string, albums: any, count: number }>(
      "http://localhost:3000/api/albums/find-industry/"+ industryId + queryParams
    ).pipe(map((albumData)=>{
      // @ts-ignore
      return {albums: albumData.albums.map(album=>{
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
            industry: album.industry,
            imagePath: album.imagePath
          };
        }), albumCount: albumData.count};
    }))
      .subscribe(albumData=>{
        this.albums = albumData.albums;
        this.albumsIndustryUpdated.next({albums:[...this.albums], albumCount: albumData.albumCount});
      });
  }

  getIndustryUpdateListener(){
    return this.albumsIndustryUpdated.asObservable();
  }

  getLetterFiltered(industryId:string, filter: any, albumPerPage:number, currentPage: number){
    const queryParams = `?pageSize=${albumPerPage}&page=${currentPage}`;
    this.http.get<{message:string, albums: any, count: number }>(
      "http://localhost:3000/api/albums/find-letter/"+ filter +'/'+ industryId + queryParams
    ).pipe(map((albumData)=>{
      // @ts-ignore
      return {albums: albumData.albums.map(album=>{
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
            industry: album.industry,
            imagePath: album.imagePath
          };
        }), albumCount: albumData.count};
    }))
      .subscribe(albumData=>{
        this.albums = albumData.albums;
        this.albumsLetterUpdated.next({albums:[...this.albums], albumCount: albumData.albumCount});
      });
  }

  getLetterUpdateListener(){
    return this.albumsLetterUpdated.asObservable();
  }

  getYearFiltered(industryId:string, filter: any, albumPerPage:number, currentPage: number){
    const queryParams = `?pageSize=${albumPerPage}&page=${currentPage}`;
    this.http.get<{message:string, albums: any, count: number }>(
      "http://localhost:3000/api/albums/find-year/"+ filter +'/'+ industryId + queryParams
    ).pipe(map((albumData)=>{
      // @ts-ignore
      return {albums: albumData.albums.map(album=>{
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
            industry: album.industry,
            imagePath: album.imagePath
          };
        }), albumCount: albumData.count};
    }))
      .subscribe(albumData=>{
        this.albums = albumData.albums;
        this.albumsYearUpdated.next({albums:[...this.albums], albumCount: albumData.albumCount});
      });
  }

  getYearUpdateListener(){
    return this.albumsYearUpdated.asObservable();
  }

}
