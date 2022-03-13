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
          admin: task.admin,
          completed: task.completed,
          accepted: task.accepted,
          adminImagePath: task.adminImagePath,
          acceptAdmin: task.acceptAdmin,
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

  deleteTask(taskId:string){
    this.http.delete("http://localhost:3000/api/tasks/" +taskId)
      .subscribe(()=>{
        const updatedTasks = this.tasks.filter(a=> a.id !=taskId);
        this.tasks = updatedTasks;
        this.tasksUpdated.next([...this.tasks]);
      });
  }

  getCalendarTask(date: any){
    return this.http.get<{
      _id:string, title:string, name:string, task:string, date:string,admin:string, adminImagePath:string}>("http://localhost:3000/api/tasks/" +date);
  }

  markTask(taskId: any){
    this.http.get<{message: string}>('http://localhost:3000/api/tasks/mark/' + taskId)
      .subscribe((Data)=>{
        this.router.navigate(['/task-history']);
      });
  }

  getCompletedTask() {
    let completed = 'Yes';
    let accepted = 'No';
    return this.http.get<{
      _id:string, title:string, name:string, task:string, date:string,admin:string, adminImagePath:string}>("http://localhost:3000/api/tasks/completed/" +completed +'/'+ accepted);
  }

  acceptTask(taskId: any, currentAdmin: string | null){
    this.http.get<{message: string}>('http://localhost:3000/api/tasks/accept/' + taskId+ '/'+ currentAdmin)
      .subscribe((Data)=>{
        this.router.navigate(['/task-accepted']);
      });
  }

  getAcceptedTask() {
    let completed = 'Yes';
    let accepted = 'Yes';
    return this.http.get<{
      _id:string, title:string, name:string, task:string, date:string,admin:string, adminImagePath:string, acceptAdmin: string}>("http://localhost:3000/api/tasks/accepted/" +completed +'/'+ accepted);
  }

  getReallocationTask(taskId:any) {
    let completed = 'No';
    let accepted = 'No';
    return this.http.get<{
      _id:string, title:string, name:string, task:string, date:string,admin:string, adminImagePath:string, acceptAdmin: string}>("http://localhost:3000/api/tasks/accepted/" +completed +'/'+ accepted);
  }

}
