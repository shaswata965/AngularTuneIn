import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Task} from "../models/task.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService{

  constructor(private http: HttpClient, private router: Router) {}

  addTask(title:string,name:string,task:string,date:string){
    let taskData : Task | FormData ;
    // @ts-ignore
    taskData = {title:title, name:name, task:task, date:date}
    this.http.post<{message: string}>('http://localhost:3000/api/tasks', taskData)
      .subscribe((Data)=>{
        // this.router.navigate(['/view-task']);
      });
  }

}
