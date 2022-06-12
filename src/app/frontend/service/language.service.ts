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
  private languagesUpdated = new Subject< { languages: Language [], languageCount: number }>();

  private quickLanguages: Language[] = [];
  private quickLanguagesUpdated = new Subject< { languages: Language [], languageCount: number }>();

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
        this.router.navigate(['/view-language']);
      });
  }

  getLanguages(languagesPerPage: number, currentPage: number){
    const queryParams = `?pageSize=${languagesPerPage}&page=${currentPage}`;
    this.http.get<{message:string, languages: any, count: number }>(
      "http://localhost:3000/api/languages" + queryParams
    ).pipe(map((languageData)=>{
      // @ts-ignore
      return {languages: languageData.languages.map(language=>{
        return{
          name: language.name,
          id: language._id,
        };
      }), languageCount: languageData.count};
    }))
      .subscribe(languageData=>{
        this.languages = languageData.languages;
        this.languagesUpdated.next({languages: [...this.languages], languageCount: languageData.languageCount});
      });
  }

  getLanguagesUpdateListener(){
    return this.languagesUpdated.asObservable();
  }

  getQuickLanguages(languagesPerPage: number, currentPage: number){
    const queryParams = `?pageSize=${languagesPerPage}&page=${currentPage}`;
    this.http.get<{message:string, languages: any, count: number }>(
      "http://localhost:3000/api/languages" + queryParams
    ).pipe(map((languageData)=>{
      // @ts-ignore
      return {languages: languageData.languages.map(language=>{
          return{
            name: language.name,
            id: language._id,
          };
        }), languageCount: languageData.count};
    }))
      .subscribe(languageData=>{
        this.quickLanguages = languageData.languages;
        this.quickLanguagesUpdated.next({languages: [...this.quickLanguages], languageCount: languageData.languageCount});
      });
  }

  getQuickLanguagesUpdateListener(){
    return this.quickLanguagesUpdated.asObservable();
  }

  deleteLanguage(languageId:string){
     return this.http.delete("http://localhost:3000/api/languages/" +languageId);
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
