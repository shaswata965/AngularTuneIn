import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";
import {Genre} from "../models/genre.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GenreService{

  public genres: Genre[] = [];
  public genresUpdated = new Subject<Genre []>();
  public modalGenre: any | null ;

  constructor(private http: HttpClient, private router: Router) { }

  addGenre(name:string, image: File){
    const genreData = new FormData();
    genreData.append('name', name);
    genreData.append('image', image, name);
    this.http.post<{message: string}>('http://localhost:3000/api/genres', genreData)
      .subscribe((Data)=>{
        this.router.navigate(['/view-genre']);
      });
  }

  getGenre(){
    this.http.get<{message:string, genres: any }>(
      "http://localhost:3000/api/genres"
    ).pipe(map((genreData)=>{
      // @ts-ignore
      return genreData.genres.map(genre=>{
        return{
          name: genre.name,
          id: genre._id,
          imagePath: genre.imagePath
        };
      });
    }))
      .subscribe(genre=>{
        this.genres = genre;
        this.genresUpdated.next([...this.genres]);
      });
  }

  getGenresUpdateListener(){
    return this.genresUpdated.asObservable();
  }

  updateGenre(id: string | null, name: string, image: File | string){
    let genreData : Genre | FormData ;
    if(typeof (image) === 'object'){
      genreData = new FormData();
      // @ts-ignore
      genreData.append('id', id);
      genreData.append('name', name);
      genreData.append('image',image,name);
    }else{
      // @ts-ignore
      genreData = {id:id, name:name, imagePath: image};
    }
    this.http.put("http://localhost:3000/api/genres/" +id, genreData)
      .subscribe(response=>{
        const updatedGenre = [...this.genres];
        const oldGenreIndex = updatedGenre.findIndex(a => a.id === id);
        // @ts-ignore
        const genre: Genre = {id:id, name:name, imagePath: response.imagePath}
        updatedGenre[oldGenreIndex] = genre;
        this.genres = updatedGenre;
        this.genresUpdated.next([...this.genres]);
        this.router.navigate(['/view-genre']);
      });
  }

  getEditGenre(genreId: string | null){
    return this.http.get<{
      _id:string, name:string, imagePath: string}>("http://localhost:3000/api/genres/" +genreId);
  }

  addModalGenre(genre: any){
    this.modalGenre = genre;
  }

  getModalGenre(){
    return this.modalGenre;
  }

  deleteGenre(genreId:string){
    this.http.delete("http://localhost:3000/api/genres/" +genreId)
      .subscribe(()=>{
        const updatedGenres = this.genres.filter(a=> a.id !=genreId);
        this.genres = updatedGenres;
        this.genresUpdated.next([...this.genres]);
      });
  }

}
