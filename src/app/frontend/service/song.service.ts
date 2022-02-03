import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Song} from "../models/song.model";
import {Subject} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SongService{

  private songs: Song[] = [];
  private songsUpdated = new Subject<Song []>();

  private modalSong: any | null;
  public songDetails: any | null;
  private songDetailsUpdated = new Subject<any>();

  constructor(private http: HttpClient, private router: Router) {}

  addSong(name:string, language:string, actor:string, genre:string, album: string, image:File, lowSong:File, highSong:File){
    const songData = new FormData();
    songData.append('name', name);
    songData.append('language', language);
    songData.append('actor', actor);
    songData.append('genre', genre);
    songData.append('album',album);
    songData.append('image',image,name);
    songData.append('lowSong',lowSong,name);
    songData.append('highSong',highSong,name);
    this.http.post<{message: string}>('http://localhost:3000/api/songs', songData)
      .subscribe((Data)=>{
        console.log(Data.message);
        this.router.navigate(['/view-song']);
      });
  }

  updateSong(id: string | null, name: string,  language: string, actor: string, genre: string, album:string, image:File | string, lowSong: File | string, highSong:File | string){
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
      songData.append('image',image,name);
      songData.append('lowSong',lowSong,name);
      songData.append('highSong',highSong);
    }
    else{
      // @ts-ignore
      songData = {id:id, name:name, language:language, actor:actor, genre:genre, album:album, imagePath:image, lowPath:lowSong, highPath:highSong};
    }
    this.http.put("http://localhost:3000/api/songs/" +id, songData)
      .subscribe(response=>{
        const updatedSong = [...this.songs];
        const oldSongIndex = updatedSong.findIndex(a => a.id === id);
        // @ts-ignore
        const song: Song = {id:id, name:name, language:language, actor:actor, genre:genre, album:album, imagePath:response.imagePath, lowPath:response.lowPath, highPath:response.highPath}
        updatedSong[oldSongIndex] = song;
        this.songs = updatedSong;
        this.songsUpdated.next([...this.songs]);
        this.router.navigate(['/view-song']);
      });
  }

  getEditSong(songId: string | null){
    return this.http.get<{
      _id:string, name:string, language:string, actor:string, genre:string, album:string, imagePath:string, lowPath:string, highPath:string}>("http://localhost:3000/api/songs/" +songId);
  }

  deleteSong(songId:string){
    this.http.delete("http://localhost:3000/api/songs/" +songId)
      .subscribe(()=>{
        const updatedSongs = this.songs.filter(a=> a.id !=songId);
        this.songs = updatedSongs;
        this.songsUpdated.next([...this.songs]);
      });
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

  getAlbumLanguageUpdateListener(){
    return this.songDetailsUpdated.asObservable();
  }

  getSongs(){
    this.http.get<{message:string, songs: any }>(
      "http://localhost:3000/api/songs"
    ).pipe(map((songData)=>{
      // @ts-ignore
      return songData.songs.map(song=>{
        return{
          name: song.name,
          language: song.language,
          actor: song.actor,
          genre: song.genre,
          album: song.album,
          id: song._id,
          imagePath: song.imagePath,
          lowPath:song.lowPath,
          highPath: song.highPath
        };
      });
    }))
      .subscribe(songs=>{
        this.songs = songs;
        this.songsUpdated.next([...this.songs]);
      });
  }

}
