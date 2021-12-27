import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormControl} from "@angular/forms";
import {Task} from "../../models/task";
import {TasksService} from "../../services/tasks.service";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  form?: FormGroup;
  @Output() onTaskAdd = new EventEmitter<Task>()

  categories =
    [
    {value: 'Business', name: 'Business'},
    {value: 'UX', name: 'UX'},
    {value: 'Development', name: 'Development'}
  ];

  selectedCategory = this.categories[0].value;

  constructor(private builder:FormBuilder, private tasksService: TasksService) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      title: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl('', [Validators.required, Validators.minLength(5)]),
      category: new FormControl(this.selectedCategory, [Validators.required]),
    });
  }

  onChange(value: string){
    this.selectedCategory = value;
    console.log(this.selectedCategory);
  }

  handleSubmit() {
    if(this.form?.valid){
      // let formData = new FormData();
      let date = new Date();
      let additional = {'status': 'ongoing', 'date': date.toDateString()};
      let data = {...this.form.value, status: additional.status, date: additional.date};

      let task: Task = {
        title: data.title,
        description: data.description,
        category: data.category,
        status: data.status,
        date: data.date
      }

      this.tasksService.addTask(task);
    }
  }

}
