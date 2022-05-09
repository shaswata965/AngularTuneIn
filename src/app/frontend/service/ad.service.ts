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
  private adsUpdated = new Subject<Ad []>();

  private modalAd: any | null;
  public adDetails: any | null;
  private adDetailsUpdated = new Subject<any>();

  public adInfo: any | null;
  public adInfoUpdated = new Subject<any>();

  constructor(private http: HttpClient, private router: Router) { }

  addAd(name:string, image: File, page:string){
    const adData = new FormData();
    adData.append('name', name);
    adData.append('image', image, name);
    adData.append('page',page);
    this.http.post<{message: string}>('http://localhost:3000/api/ads', adData)
      .subscribe((Data)=>{
        console.log(Data.message);
        this.router.navigate(['/view-ad']);
      });
  }

  updateAd(id: string | null, name: string, image: File | string, page: string){
    let adData : Ad | FormData ;
    if(typeof (image) === 'object'){
      adData = new FormData();
      // @ts-ignore
      adData.append('id', id);
      adData.append('name', name);
      adData.append('image',image,name);
      adData.append('page',page)
    }else{
      // @ts-ignore
      adData = {id:id, name:name, imagePath: image, page:page};
    }
    this.http.put("http://localhost:3000/api/ads/" +id, adData)
      .subscribe(response=>{
        const updatedAd = [...this.ads];
        const oldAdIndex = updatedAd.findIndex(a => a.id === id);
        // @ts-ignore
        const ad: Ad = {id:id, name:name, imagePath: response.imagePath, page:page}
        updatedAd[oldAdIndex] = ad;
        this.ads = updatedAd;
        this.adsUpdated.next([...this.ads]);
        this.router.navigate(['/view-ad']);
      });
  }

  getEditAd(adId: string | null){
    return this.http.get<{
      _id:string, name:string, imagePath: string, page:string}>("http://localhost:3000/api/ads/" +adId);
  }

  deleteAd(adId:string){
    this.http.delete("http://localhost:3000/api/ads/" +adId)
      .subscribe(()=>{
        const updatedAds = this.ads.filter(a=> a.id !=adId);
        this.ads = updatedAds;
        this.adsUpdated.next([...this.ads]);
      });
  }

  addModalAd(ad: any){
    this.modalAd = ad;
  }

  getAd(){
    this.http.get<{message:string, ads: any }>(
      "http://localhost:3000/api/ads"
    ).pipe(map((adData)=>{
      // @ts-ignore
      return adData.ads.map(ad=>{
        return{
          name: ad.name,
          id: ad._id,
          imagePath: ad.imagePath,
          page: ad.page
        };
      });
    }))
      .subscribe(ads=>{
        this.ads = ads;
        this.adsUpdated.next([...this.ads]);
      });
  }

  getAdsUpdateListener(){
    return this.adsUpdated.asObservable();
  }

  getModalAd(){
    return this.modalAd;
  }


}
