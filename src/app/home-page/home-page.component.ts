import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { environment } from 'src/environments/environment';
import { CreateTodoComponent } from '../create-todo/create-todo.component';
import { ToDoListService } from './services/to-do-list.service';
import { ToDosDataInterface } from './interfaces/todosData.interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  allTodos$!: BehaviorSubject<any>;
  todosData$!: BehaviorSubject<any>;

  loadAllTodos$!: Observable<void>;
  loadTodosData$!: Observable<ToDosDataInterface>;
  getQuerryParams$!: Subscription;
  
  limit: number = environment.limit;
  baseUrl!: string;
  currentPage!: number;
  total!: number;

  constructor( 
    public dialog: MatDialog,
    private todoListService: ToDoListService
  ) {
    this.allTodos$ = this.todoListService.allTodos$;
    this.todosData$ = this.todoListService.todosData$;
  }

  ngOnInit(): void {
    this.fetchTodos();
  }
  
  openDialog(): void {
    this.dialog.open(CreateTodoComponent, {
      width: '500px',
    });
  }

  fetchTodos(): void {
    this.loadAllTodos$ = this.todoListService.getToDos();
    this.loadTodosData$ = this.todoListService.getToDosData();
  }
}
