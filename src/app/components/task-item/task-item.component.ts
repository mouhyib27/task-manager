import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Task} from "../../models/task";

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {

  @Input() task?: Task;
  @Output() onComplete = new EventEmitter<Task>();

  constructor() { }

  ngOnInit(): void {
  }

  completeTask(task: Task){
    // this.onComplete.emit(task);
  }

  setColor():string {
    let color = '';
    switch (this.task?.category) {
      case 'UX':
        color = '#F900D8'
        break
      case 'Business':
        color = '#0D8C4A'
        break
      case 'Development':
        color = '#FF0000'
        break
      default:
        color = '#FFF'
    }
    return color;
  }

  setBackgroundColor(): string {
    let color = '';
    switch (this.task?.category) {
      case 'UX':
        color = '#FBE2F8'
        break
      case 'Business':
        color = '#E3F0EA'
        break
      case 'Development':
        color = '#FCE2E2'
        break
      default:
        color = '#FFF'
    }
    return color;
  }

}
