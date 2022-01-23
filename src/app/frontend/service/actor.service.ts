import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Actor} from "../models/actor.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ActorService{

  private actors: Actor[]=[];
  private actorsUpdated = new Subject<Actor []>();

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
        this.router.navigate(['/view-album']);
      });
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
        this.router.navigate(['/view-album']);
      });
  }

  getEditActor(actorId: string | null){
    return this.http.get<{
      _id:string, name:string, description:string, awards: string, role:string, birth:string, death:string, imagePath: string}>("http://localhost:3000/api/actors/" +actorId);
  }

}
