import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';

import { Observable } from 'rxjs';

import { TodoItemInterface } from './interfaces/todoItem.interface';
import { ToDoListService } from '../home-page/services/to-do-list.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent implements OnInit {
  addTaskForm!: FormGroup;
  validators = [Validators.required];
  createTodo$!: Observable<any>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TodoItemInterface, 
    public dialogRef: MatDialogRef<CreateTodoComponent>,
    private fb: FormBuilder,
    private todoListService: ToDoListService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  setNewTodo(): void {
    const todoObject: TodoItemInterface = {
      userId: 1,
      title: this.addTaskForm.get('title')!.value,
      completed: false 
    };

    this.createTodo$ = this.todoListService.createTodo(todoObject, this.dialogRef);
  }

  onCloseModal(): void {
    this.dialogRef.close();
  }

  private initForm(): void {
    this.addTaskForm = this.fb.group({
      title: ['', ...this.validators],
    })
  }
}
