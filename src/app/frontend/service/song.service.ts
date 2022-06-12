import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Song} from "../models/song.model";
import {Subject} from "rxjs";
import {count, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SongService{

  private songs: Song[] = [];
  private songsUpdated = new Subject<{ songs: Song [], songCount: number }>();
  private quickSongs: Song[] = [];
  private quickSongsUpdated = new Subject<{ songs: Song [], songCount: number }>();
  private bollywoodSongs: Song[] = [];
  private bollywoodSongsUpdated = new Subject<{ songs: Song [], songCount: number }>();

  private modalSong: any | null;
  public songDetails: any | null;
  private songDetailsUpdated = new Subject<any>();
  public songData: any | null;
  private songsDataUpdated = new Subject<{ songs: Song [], songCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  addSong(name:string, language:string, actor:string, genre:string, album: string, artist: string, trending: string, duration: string, industry: string, image:File, lowSong:File, highSong:File){
    const songData = new FormData();
    songData.append('name', name);
    songData.append('language', language);
    songData.append('actor', actor);
    songData.append('genre', genre);
    songData.append('album',album);
    songData.append('artist',artist);
    songData.append('trending',trending);
    songData.append('duration',duration);
    songData.append('industry',industry);
    songData.append('image',image,name);
    songData.append('lowSong',lowSong,name);
    songData.append('highSong',highSong,name);
    this.http.post<{message: string}>('http://localhost:3000/api/songs', songData)
      .subscribe((Data)=>{
        console.log(Data.message);
        this.router.navigate(['/view-song']);
      });
  }

  updateSong(id: string | null, name: string,  language: string, actor: string, genre: string, album:string, artist:string, trending:string,  duration: string, industry: string, image:File | string, lowSong: File | string, highSong:File | string){
    let songData : Song | FormData ;
    if(typeof (image) === 'object' && typeof (lowSong) === 'object' && typeof (highSong) === 'object'){
      songData = new FormData();
      // @ts-ignore
      songData.append('id', id);
      songData.append('name', name);
      songData.append('language', language);
      songData.append('actor', actor);
      songData.append('genre', genre);
      songData.append('album',album);
      songData.append('artist',artist);
      songData.append('trending',trending);
      songData.append('duration',duration);
      songData.append('industry',industry);
      songData.append('image',image,name);
      songData.append('lowSong',lowSong,name);
      songData.append('highSong',highSong,name);
    }else if(typeof (image) === 'string' && typeof (lowSong) === 'object' && typeof (highSong) === 'object'){
      songData = new FormData();
      // @ts-ignore
      songData.append('id', id);
      songData.append('name', name);
      songData.append('language', language);
      songData.append('actor', actor);
      songData.append('genre', genre);
      songData.append('album',album);
      songData.append('artist',artist);
      songData.append('trending',trending);
      songData.append('duration',duration);
      songData.append('industry',industry);
      songData.append('image',image);
      songData.append('lowSong',lowSong,name);
      songData.append('highSong',highSong,name);
    }else if(typeof (image) === 'string' && typeof (lowSong) === 'string' && typeof (highSong) === 'object'){
      songData = new FormData();
      // @ts-ignore
      songData.append('id', id);
      songData.append('name', name);
      songData.append('language', language);
      songData.append('actor', actor);
      songData.append('genre', genre);
      songData.append('album',album);
      songData.append('artist',artist);
      songData.append('trending',trending);
      songData.append('duration',duration);
      songData.append('industry',industry);
      songData.append('image',image);
      songData.append('lowSong',lowSong);
      songData.append('highSong',highSong,name);
    }else if(typeof (image) === 'object' && typeof (lowSong) === 'string' && typeof (highSong) === 'object'){
      songData = new FormData();
      // @ts-ignore
      songData.append('id', id);
      songData.append('name', name);
      songData.append('language', language);
      songData.append('actor', actor);
      songData.append('genre', genre);
      songData.append('album',album);
      songData.append('artist',artist);
      songData.append('trending',trending);
      songData.append('duration',duration);
      songData.append('industry',industry);
      songData.append('image',image,name);
      songData.append('lowSong',lowSong);
      songData.append('highSong',highSong,name);
    }else if(typeof (image) === 'object' && typeof (lowSong) === 'string' && typeof (highSong) === 'string'){
      songData = new FormData();
      // @ts-ignore
      songData.append('id', id);
      songData.append('name', name);
      songData.append('language', language);
      songData.append('actor', actor);
      songData.append('genre', genre);
      songData.append('album',album);
      songData.append('artist',artist);
      songData.append('trending',trending);
      songData.append('duration',duration);
      songData.append('industry',industry);
      songData.append('image',image,name);
      songData.append('lowSong',lowSong);
      songData.append('highSong',highSong);
    }else if(typeof (image) === 'object' && typeof (lowSong) === 'object' && typeof (highSong) === 'string'){
      songData = new FormData();
      // @ts-ignore
      songData.append('id', id);
      songData.append('name', name);
      songData.append('language', language);
      songData.append('actor', actor);
      songData.append('genre', genre);
      songData.append('album',album);
      songData.append('artist',artist);
      songData.append('trending',trending);
      songData.append('duration',duration);
      songData.append('industry',industry);
      songData.append('image',image,name);
      songData.append('lowSong',lowSong,name);
      songData.append('highSong',highSong);
    }
    else if(typeof (image) === 'string' && typeof (lowSong) === 'object' && typeof (highSong) === 'string'){
      songData = new FormData();
      // @ts-ignore
      songData.append('id', id);
      songData.append('name', name);
      songData.append('language', language);
      songData.append('actor', actor);
      songData.append('genre', genre);
      songData.append('album',album);
      songData.append('artist',artist);
      songData.append('trending',trending);
      songData.append('duration',duration);
      songData.append('industry',industry);
      songData.append('image',image);
      songData.append('lowSong',lowSong,name);
      songData.append('highSong',highSong);
    }
    else{
      // @ts-ignore
      songData = {id:id, name:name, language:language, actor:actor, genre:genre, album:album, artist:artist, trending:trending,  duration: duration, industry: industry, imagePath:image, lowPath:lowSong, highPath:highSong};
    }
    this.http.put("http://localhost:3000/api/songs/" +id, songData)
      .subscribe(response=>{
        this.router.navigate(['/view-song']);
      });
  }

  getEditSong(songId: string | null){
    return this.http.get<{
      _id:string, name:string, language:string, actor:string, genre:string, album:string, artist:string, trending:string, duration:string, industry: string, imagePath:string, lowPath:string, highPath:string}>("http://localhost:3000/api/songs/" +songId);
  }

  deleteSong(songId:string){
    return this.http.delete("http://localhost:3000/api/songs/" +songId);
  }

  addModalSong(song: any){
    this.modalSong = song;
  }

  getModalSong(){
    this.http.get<{songDet: any}>('http://localhost:3000/api/songs/modal/'+ this.modalSong.language + '/'+ this.modalSong.actor + '/' + this.modalSong.genre + '/' + this.modalSong.album)
      .subscribe((Data)=>{
        this.songDetails = Data;
        this.songDetailsUpdated.next(this.songDetails)
      });
    return this.modalSong;
  }

  getSongInfoUpdateListener(){
    return this.songDetailsUpdated.asObservable();
  }

  getSongs(songsPerPage: number, currentPage: number){
    const queryParams = `?pageSize=${songsPerPage}&page=${currentPage}`;
    this.http.get<{message:string, songs: any, count: number}>(
      "http://localhost:3000/api/songs"+ queryParams
    ).pipe(map((songData)=>{
      // @ts-ignore
      return { songs: songData.songs.map(song=>{
        return{
          name: song.name,
          language: song.language,
          actor: song.actor,
          genre: song.genre,
          album: song.album,
          artist: song.artist,
          trending: song.trending,
          duration: song.duration,
          industry: song.industry,
          id: song._id,
          imagePath: song.imagePath,
          lowPath:song.lowPath,
          highPath: song.highPath
        };
      }), songCount: songData.count};
    }))
      .subscribe(songData=>{
        this.songs = songData.songs;
        this.songsUpdated.next({songs:[...this.songs], songCount: songData.songCount});
      });
  }

  getSongsUpdateListener(){
    return this.songsUpdated.asObservable();
  }

  getQuickSongs(songsPerPage: number, currentPage: number){
    const queryParams = `?pageSize=${songsPerPage}&page=${currentPage}`;
    this.http.get<{message:string, songs: any, count: number}>(
      "http://localhost:3000/api/songs"+ queryParams
    ).pipe(map((songData)=>{
      // @ts-ignore
      return { songs: songData.songs.map(song=>{
          return{
            name: song.name,
            language: song.language,
            actor: song.actor,
            genre: song.genre,
            album: song.album,
            artist: song.artist,
            trending: song.trending,
            duration: song.duration,
            industry: song.industry,
            id: song._id,
            imagePath: song.imagePath,
            lowPath:song.lowPath,
            highPath: song.highPath
          };
        }), songCount: songData.count};
    }))
      .subscribe(songData=>{
        this.quickSongs = songData.songs;
        this.quickSongsUpdated.next({songs:[...this.quickSongs], songCount: songData.songCount});
      });
  }

  getQuickSongsUpdateListener(){
    return this.quickSongsUpdated.asObservable();
  }

  getBollywoodSongs(songsPerPage: number, currentPage: number){
    const queryParams = `?pageSize=${songsPerPage}&page=${currentPage}`;
    this.http.get<{message:string, songs: any, count: number}>(
      "http://localhost:3000/api/songs/bollywood"+ queryParams
    ).pipe(map((songData)=>{
      // @ts-ignore
      return { songs: songData.songs.map(song=>{
          return{
            name: song.name,
            language: song.language,
            actor: song.actor,
            genre: song.genre,
            album: song.album,
            artist: song.artist,
            trending: song.trending,
            duration: song.duration,
            industry: song.industry,
            id: song._id,
            imagePath: song.imagePath,
            lowPath:song.lowPath,
            highPath: song.highPath
          };
        }), songCount: songData.count};
    }))
      .subscribe(songData=>{
        this.bollywoodSongs = songData.songs;
        this.bollywoodSongsUpdated.next({songs:[...this.bollywoodSongs], songCount: songData.songCount});
      });
  }

  getBollywoodSongsUpdateListener(){
    return this.bollywoodSongsUpdated.asObservable();
  }

  getSongLanguage(languageId: string | null, songsPerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${songsPerPage}&page=${currentPage}`;
    this.http.get<{message:string, songs: any, count: number}>(
      "http://localhost:3000/api/songs/find-language/"+languageId + queryParams
    ).pipe(map((songData)=>{
      // @ts-ignore
      return { songs: songData.songs.map(song=>{
          return{
            name: song.name,
            language: song.language,
            actor: song.actor,
            genre: song.genre,
            album: song.album,
            artist: song.artist,
            trending: song.trending,
            duration: song.duration,
            industry: song.industry,
            id: song._id,
            imagePath: song.imagePath,
            lowPath:song.lowPath,
            highPath: song.highPath
          };
        }), songCount: songData.count};
    }))
      .subscribe(songData=>{
        console.log(songData.songCount);
        this.songs = songData.songs;
        this.songsDataUpdated.next({songs:[...this.songs], songCount: songData.songCount});
      });
  }

  getDataUpdateListener(){
    return this.songsDataUpdated.asObservable();
  }

}
