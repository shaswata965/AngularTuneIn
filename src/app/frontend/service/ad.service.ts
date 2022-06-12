import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {map} from "rxjs/operators";
import {Ad} from "../models/ad.model";

@Injectable({
  providedIn: 'root'
})
export class AdService{

  private ads: Ad[] = [];
  private adsUpdated = new Subject<{ads: Ad [], adCount: number }>();

  private modalAd: any | null;
  public adDetails: any | null;
  private adDetailsUpdated = new Subject<any>();

  public adInfo: any | null;
  public adInfoUpdated = new Subject<any>();

  constructor(private http: HttpClient, private router: Router) { }

  addAd(name:string, image: File, page:string, position:string, link:string){
    const adData = new FormData();
    adData.append('name', name);
    adData.append('image', image, name);
    adData.append('page',page);
    adData.append('position',position);
    adData.append('link',link);
    this.http.post<{message: string}>('http://localhost:3000/api/ads', adData)
      .subscribe((Data)=>{
        console.log(Data.message);
        this.router.navigate(['/view-ad']);
      });
  }

  updateAd(id: string | null, name: string, image: File | string, page: string, position: string, link:string){
    let adData : Ad | FormData ;
    if(typeof (image) === 'object'){
      adData = new FormData();
      // @ts-ignore
      adData.append('id', id);
      adData.append('name', name);
      adData.append('image',image,name);
      adData.append('page',page);
      adData.append('position',position);
      adData.append('position',link);
    }else{
      // @ts-ignore
      adData = {id:id, name:name, imagePath: image, page:page, link: link};
    }
    this.http.put("http://localhost:3000/api/ads/" +id, adData)
      .subscribe(response=>{
        this.router.navigate(['/view-ad']);
      });
  }

  getEditAd(adId: string | null){
    return this.http.get<{
      _id:string, name:string, imagePath: string, page:string, position:string, link:string}>("http://localhost:3000/api/ads/" +adId);
  }

  deleteAd(adId:string){
    return this.http.delete("http://localhost:3000/api/ads/" +adId);
  }

  addModalAd(ad: any){
    this.modalAd = ad;
  }

  getAd(adPerPage: number, currentPage:number){
    const queryParams = `?pageSize=${adPerPage}&page=${currentPage}`;
    this.http.get<{message:string, ads: any, count: number }>(
      "http://localhost:3000/api/ads" + queryParams
    ).pipe(map((adData)=>{
      // @ts-ignore
      return {ads: adData.ads.map(ad=>{
        return{
          name: ad.name,
          id: ad._id,
          imagePath: ad.imagePath,
          page: ad.page,
          position: ad.position,
          link: ad.link
        };
      }), adCount: adData.count};
    }))
      .subscribe(adData=>{
        this.ads = adData.ads;
        this.adsUpdated.next({ads: [...this.ads], adCount: adData.adCount});
      });
  }

  getAdsUpdateListener(){
    return this.adsUpdated.asObservable();
  }

  getModalAd(){
    return this.modalAd;
  }


}
