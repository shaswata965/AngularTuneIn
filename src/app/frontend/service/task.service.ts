import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Task} from "../models/task.model";
import {map} from "rxjs/operators";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService{

  private tasks: Task[] = [];
  private tasksUpdated = new Subject<Task []>();

  constructor(private http: HttpClient, private router: Router) {}

  addTask(title:string,name:string,task:string,date:string){
    let taskData : Task | FormData ;
    // @ts-ignore
    taskData = {title:title, name:name, task:task, date:date}
    this.http.post<{message: string}>('http://localhost:3000/api/tasks', taskData)
      .subscribe((Data)=>{
        this.router.navigate(['/view-task']);
      });
  }

  getTasks(){
    this.http.get<{message:string, tasks: any }>(
      "http://localhost:3000/api/tasks"
    ).pipe(map((taskData)=>{
      // @ts-ignore
      return taskData.tasks.map(task=>{
        return{
          title: task.title,
          name: task.name,
          task: task.task,
          date: task.date,
          id: task._id,
        };
      });
    }))
      .subscribe(tasks=>{
        this.tasks = tasks;
        this.tasksUpdated.next([...this.tasks]);
      });
  }

  getTasksUpdateListener(){
    return this.tasksUpdated.asObservable();
  }
}
