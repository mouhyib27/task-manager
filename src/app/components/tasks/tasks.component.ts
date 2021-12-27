import { Component, OnInit } from '@angular/core';
import {Task} from "../../models/task";
import {TasksService} from "../../services/tasks.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {

  tasks: Task[] | undefined;
  subscription!: Subscription;

  constructor(private tasksService: TasksService) {

  }

  ngOnInit(): void {
    this.tasksService.getTasks().subscribe(rsp => this.tasks = rsp);
    this.subscription = this.tasksService.onTaskAdd().subscribe(rsp=> this.tasks = rsp);
  }

  handleComplete(task: Task){
    this.tasksService.deleteTask(task);
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

}
