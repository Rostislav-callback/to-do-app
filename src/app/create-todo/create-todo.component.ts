import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';

import { TodoItemInterface } from './interfaces/todoItem.interface';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent implements OnInit {
  addTaskForm!: FormGroup;
  validators = [Validators.required];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TodoItemInterface, 
    public dialogRef: MatDialogRef<CreateTodoComponent>,
    private fb: FormBuilder,
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

    this.dialogRef.close();
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
