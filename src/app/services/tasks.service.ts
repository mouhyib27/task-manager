import {Injectable} from '@angular/core';
import {Task} from "../models/task";
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class TasksService {

  private apiurl = 'http://localhost:5000/tasks';
  private tasks: Task[] = [];
  private subject = new Subject();

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]>{
    let sub = this.http.get<Task[]>(this.apiurl);
    sub.subscribe(resp => {
      this.tasks = resp;
      this.subject.next(this.tasks)
    })
    return sub;
  }

  deleteTask(task: Task): void {
    const url = `${this.apiurl}/${task.id}`
    let ts = this.http.delete<Task>(url);
    ts.subscribe(tsk => this.tasks = this.tasks.filter(t=> t.id != tsk.id));
    this.subject.next(this.tasks);
  }

  addTask(task:Task): void {
    let ts = this.http.post<Task>(this.apiurl, task, httpOptions);
    ts.subscribe(tsk=> this.tasks.push(tsk))
    this.subject.next(this.tasks);
  }

  onTaskAdd():Observable<any> {
    return this.subject.asObservable()
  }
}
