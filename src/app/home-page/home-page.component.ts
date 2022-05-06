import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CreateTodoComponent } from '../create-todo/create-todo.component';

import { TodoItemInterface } from './interfaces/todoItem.interface';
import { ToDoListService } from './services/to-do-list.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  allTodos$!: Observable<TodoItemInterface[]>;

  constructor(private todoService: ToDoListService, public dialog: MatDialog) { }

  ngOnInit(): void {
    //this.allTodos$ = this.todoService.getToDos();
  }
  
  openDialog(): void {
    this.dialog.open(CreateTodoComponent, {
      width: '500px',
    });
  }

  
}
