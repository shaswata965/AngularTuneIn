import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Task} from "../models/task.model";
import {map} from "rxjs/operators";
import {Subject} from "rxjs";
import {Language} from "../models/language.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService{

  private tasks: Task[] = [];
  private tasksUpdated = new Subject<Task []>();

  private reallocates: Task[] = [];
  private reallocatesUpdated = new Subject<Task []>();

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
          update: task.update,
          reallocate: task.reallocate,
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

  getReallocatedCompletedTask(){
    let completed = 'Yes';
    let accepted = 'No';
    return this.http.get<{
      _id:string, title:string, name:string, task:string, date:string,admin:string, adminImagePath:string, update:string, reallocate:string}>("http://localhost:3000/api/tasks/completed/reallocated/" +completed +'/'+ accepted);
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

  getReallocatedAcceptedTask(){
    let completed = 'Yes';
    let accepted = 'Yes';
    return this.http.get<{
      _id:string, title:string, name:string, task:string, date:string,admin:string, adminImagePath:string, acceptAdmin: string, update:string, reallocate:string}>("http://localhost:3000/api/tasks/accepted/reallocated/" +completed +'/'+ accepted);
  }

  reallocateTask( reallocate: string | null, update: string | null, id: string | null, acceptAdmin: string | null, accepted: string | null, admin: string | null, adminImagePath: string | null, completed: string | null, date: string | null, name: string | null, task: string | null, title: string | null  ){
    console.log('I am Here');
    let reallocateData : Task | FormData ;
    // @ts-ignore
    reallocateData = {id:id, acceptAdmin: acceptAdmin, accepted: accepted, admin: admin, adminImagePath: adminImagePath, completed: completed, date: date, name: name, task: task, title: title, reallocate:reallocate, update:update}
    this.http.put("http://localhost:3000/api/tasks/reallocateTask/" +id, reallocateData)
      .subscribe(response=>{
        this.router.navigate(['/view-task']);
      });
  }

  getReallocationTask(taskId:any) {
    return this.http.get<{
      _id:string, title:string, name:string, task:string, date:string,admin:string, adminImagePath:string, acceptAdmin: string}>("http://localhost:3000/api/tasks/reallocate/" + taskId);
  }

  getReallocatedTasks(){
    this.http.get<{message:string, tasks: any }>(
      "http://localhost:3000/api/tasks/reallocated"
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
          update: task.update,
          reallocate: task.reallocate,
        };
      });
    }))
      .subscribe(tasks=>{
        this.reallocates = tasks;
        this.reallocatesUpdated.next([...this.reallocates]);
      });
  }

  getReallocatedTasksUpdateListener(){
    return this.reallocatesUpdated.asObservable();
  }

}
