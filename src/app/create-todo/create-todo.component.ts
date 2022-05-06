import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TodoItemInterface } from '../home-page/interfaces/todoItem.interface';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TodoItemInterface, 
    public dialogRef: MatDialogRef<CreateTodoComponent>
  ) { }

  ngOnInit(): void {
  }
}
