import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {Industry} from "../models/industry.model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class IndustryService{
  private industries: Industry[] = [];
  private industriesUpdated = new Subject< { industries: Industry [], industryCount: number }>();

  private modalIndustry: any | null;

  public industryAlbum: any | null;
  public industryAlbumUpdated = new Subject<any>();

  constructor(private http: HttpClient, private router: Router) { }

  addIndustry(name:string){
    let industryData : Industry | FormData ;
    // @ts-ignore
    industryData = {name:name}
    this.http.post<{message: string}>('http://localhost:3000/api/industries', industryData)
      .subscribe((Data)=>{
        this.router.navigate(['/view-industry']);
      });
  }

  updateIndustry(id: string | null, name: string){
    let industryData : Industry | FormData ;
    // @ts-ignore
    industryData = {id:id, name:name}
    this.http.put("http://localhost:3000/api/industries/" +id, industryData)
      .subscribe(response=>{
        this.router.navigate(['/view-industry']);
      });
  }

  getIndustries(industriesPerPage: number, currentPage: number){
    const queryParams = `?pageSize=${industriesPerPage}&page=${currentPage}`;
    this.http.get<{message:string, industries: any, count: number }>(
      "http://localhost:3000/api/industries" + queryParams
    ).pipe(map((industryData)=>{
      // @ts-ignore
      return {industries: industryData.industries.map(industry=>{
          return{
            name: industry.name,
            id: industry._id,
          };
        }), industryCount: industryData.count};
    }))
      .subscribe(industryData=>{
        this.industries = industryData.industries;
        this.industriesUpdated.next({industries: [...this.industries], industryCount: industryData.industryCount});
      });
  }

  getIndustriesUpdateListener(){
    return this.industriesUpdated.asObservable();
  }

  deleteIndustry(industryId:string){
    return this.http.delete("http://localhost:3000/api/industries/" +industryId);
  }

  addModalIndustry(industry: any){
    this.modalIndustry = industry;
  }

  getModalIndustry(){
    this.http.get<{albumNames: any}>('http://localhost:3000/api/industries/modal/' +this.modalIndustry.id)
      .subscribe((Data)=>{
        this.industryAlbum = Data;
        this.industryAlbumUpdated.next(this.industryAlbum);
      });
    return this.modalIndustry;
  }

  getIndustryAlbumUpdateListener(){
    return this.industryAlbumUpdated.asObservable();
  }

  getEditIndustry(industryId: string | null){
    return this.http.get<{_id:string, name:string}>("http://localhost:3000/api/industries/" +industryId);
  }

}
