import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Actor} from "../models/actor.model";
import {Subject} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ActorService{

  private actors: Actor[]=[];
  private actorsUpdated = new Subject<Actor []>();

  public actorInfo: any | null;
  public actorInfoUpdated = new Subject<any>();

  public modalActor: any | null;

  constructor(private http: HttpClient, private router: Router) { }

  addActor(name:string, description:string, awards:string, role:string, birth:string, death: string, image: File){
    const actorData = new FormData();
    actorData.append('name', name);
    actorData.append('description', description);
    actorData.append('awards', awards);
    actorData.append('role', role);
    actorData.append('birth', birth);
    actorData.append('death',death);
    actorData.append('image', image, name);
    this.http.post<{message: string}>('http://localhost:3000/api/actors', actorData)
      .subscribe((Data)=>{
        console.log(Data.message);
        this.router.navigate(['/view-actor']);
      });
  }

  getActors(){
    this.http.get<{message:string, actors: any }>(
      "http://localhost:3000/api/actors"
    ).pipe(map((actorData)=>{
      // @ts-ignore
      return actorData.actors.map(actor=>{
        return{
          name: actor.name,
          description: actor.description,
          awards: actor.awards,
          role: actor.role,
          birth: actor.birth,
          death: actor.death,
          id: actor._id,
          imagePath: actor.imagePath
        };
      });
    }))
      .subscribe(actors=>{
        this.actors = actors;
        this.actorsUpdated.next([...this.actors]);
      });
  }

  getActorsUpdateListener(){
    return this.actorsUpdated.asObservable();
  }

  updateActor(id: string | null, name: string,  description: string, awards: string, role: string, birth: string, death:string, image: File | string){
    let actorData : Actor | FormData ;
    if(typeof (image) === 'object'){
      actorData = new FormData();
      // @ts-ignore
      actorData.append('id', id);
      actorData.append('name', name);
      actorData.append('description', description);
      actorData.append('awards', awards);
      actorData.append('role', role);
      actorData.append('birth', birth);
      actorData.append('death',death);
      actorData.append('image',image,name);
    }else{
      // @ts-ignore
      actorData = {id:id, name:name, description:description, awards:awards, role:role, birth:birth, death:death, imagePath: image};
    }
    this.http.put("http://localhost:3000/api/actors/" +id, actorData)
      .subscribe(response=>{
        const updatedActor = [...this.actors];
        const oldActorIndex = updatedActor.findIndex(a => a.id === id);
        // @ts-ignore
        const actor: Actor = {id:id, name:name, description:description, awards:awards, role:role, birth:birth, death:death, imagePath: response.imagePath}
        updatedActor[oldActorIndex] = actor;
        this.actors = updatedActor;
        this.actorsUpdated.next([...this.actors]);
        this.router.navigate(['/view-actor']);
      });
  }

  getEditActor(actorId: string | null){
    return this.http.get<{
      _id:string, name:string, description:string, awards: string, role:string, birth:string, death:string, imagePath: string}>("http://localhost:3000/api/actors/" +actorId);
  }

  addModalActor(actor: any){
    this.modalActor = actor;
  }

  getModalActor(){
    return this.modalActor;
  }

  searchForActor(name: string){
    this.http.get<{actorData: any, message: string}>('http://localhost:3000/api/actors/imdb/' + name)
      .subscribe((Data) => {
        this.actorInfo = Data.actorData;
        this.actorInfoUpdated.next(this.actorInfo);
      });
  }

  getActorsInfoUpdateListener(){
    return this.actorInfoUpdated.asObservable();
  }

  deleteActor(actorId:string){
    this.http.delete("http://localhost:3000/api/actors/" +actorId)
      .subscribe(()=>{
        const updatedActors = this.actors.filter(a=> a.id !=actorId);
        this.actors = updatedActors;
        this.actorsUpdated.next([...this.actors]);
      });
  }

}
