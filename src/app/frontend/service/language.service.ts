import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Language} from "../models/language.model";
import {Subject} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LanguageService{

  private languages: Language[] = [];
  private languagesUpdated = new Subject<Language []>();

  public languageAlbum: any | null;
  public languageAlbumUpdated = new Subject<any>();

  private modalLanguage: any | null;

  constructor(private http: HttpClient, private router: Router) { }

  addLanguage(name:string){
    let languageData : Language | FormData ;
    // @ts-ignore
    languageData = {name:name}
    this.http.post<{message: string}>('http://localhost:3000/api/languages', languageData)
      .subscribe((Data)=>{
        this.router.navigate(['/view-language']);
      });
  }

  updateLanguage(id: string | null, name: string){
    let languageData : Language | FormData ;
      // @ts-ignore
      languageData = {id:id, name:name}
    this.http.put("http://localhost:3000/api/languages/" +id, languageData)
      .subscribe(response=>{
        const updatedLanguage = [...this.languages];
        const oldLanguageIndex = updatedLanguage.findIndex(a => a.id === id);
        // @ts-ignore
        const language: Language = {id:id, name:name}
        updatedLanguage[oldLanguageIndex] = language;
        this.languages = updatedLanguage;
        this.languagesUpdated.next([...this.languages]);
        this.router.navigate(['/view-language']);
      });
  }

  getLanguages(){
    this.http.get<{message:string, albums: any }>(
      "http://localhost:3000/api/languages"
    ).pipe(map((languageData)=>{
      // @ts-ignore
      return languageData.languages.map(language=>{
        return{
          name: language.name,
          id: language._id,
        };
      });
    }))
      .subscribe(languages=>{
        this.languages = languages;
        this.languagesUpdated.next([...this.languages]);
      });
  }

  getLanguagesUpdateListener(){
    return this.languagesUpdated.asObservable();
  }

  deleteLanguage(languageId:string){
    this.http.delete("http://localhost:3000/api/languages/" +languageId)
      .subscribe(()=>{
        const updatedLanguages = this.languages.filter(a=> a.id !=languageId);
        this.languages = updatedLanguages;
        this.languagesUpdated.next([...this.languages]);
      });
  }

  addModalLanguage(language: any){
    this.modalLanguage = language;
  }

  getModalLanguage(){
    this.http.get<{albumNames: any}>('http://localhost:3000/api/languages/modal/' +this.modalLanguage.id)
      .subscribe((Data)=>{
          this.languageAlbum = Data;
          this.languageAlbumUpdated.next(this.languageAlbum);
      });
    return this.modalLanguage;
  }

  getLanguageAlbumUpdateListener(){
    return this.languageAlbumUpdated.asObservable();
  }

  getEditLanguage(languageId: string | null){
    return this.http.get<{_id:string, name:string}>("http://localhost:3000/api/languages/" +languageId);
  }

}
