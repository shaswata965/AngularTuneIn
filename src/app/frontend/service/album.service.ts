import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Album} from "../models/album.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlbumService{

  private albums: Album[] = [];
  private albumsUpdated = new Subject<Album []>();

  constructor(private http: HttpClient, private router: Router) { }

  addAlbum(name:string, description:string, composer:string, lyricist:string, release:string, image: File){
    const albumData = new FormData();
    albumData.append('name', name);
    albumData.append('description', description);
    albumData.append('composer', composer);
    albumData.append('lyricist', lyricist);
    albumData.append('release', release);
    albumData.append('image', image, name);
    this.http.post<{message: string}>('http://localhost:3000/api/albums', albumData)
      .subscribe((Data)=>{
        console.log(Data.message);
        this.router.navigate(['/view-album']);
      });
  }

  updateAlbum(id: string | null, name: string,  description: string, composer: string, lyricist: string, release: string, image: File | string){
    let albumData : Album | FormData ;
    if(typeof (image) === 'object'){
      albumData = new FormData();
      // @ts-ignore
      albumData.append('id', id);
      albumData.append('name', name);
      albumData.append('description', description);
      albumData.append('composer', composer);
      albumData.append('lyricist', lyricist);
      albumData.append('release', release);
      albumData.append('image',image,name);
    }else{
      // @ts-ignore
      albumData = {id:id, name:name, description:description, composer:composer, lyricist:lyricist, release:release, imagePath: image};
    }
    this.http.put("http://localhost:3000/api/albums/" +id, albumData)
      .subscribe(response=>{
        const updatedAlbum = [...this.albums];
        const oldAdminIndex = updatedAlbum.findIndex(a => a.id === id);
        // @ts-ignore
        const album: Album = {id:id, name:name, description:description, composer:composer, lyricist:lyricist, release:release, imagePath: response.imagePath}
        updatedAlbum[oldAdminIndex] = album;
        this.albums = updatedAlbum;
        this.albumsUpdated.next([...this.albums]);
        this.router.navigate(['/view-album']);
      });
  }

}
