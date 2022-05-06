import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { environment } from 'src/environments/environment';
import { CreateTodoComponent } from '../create-todo/create-todo.component';
import { TodoItemInterface } from '../create-todo/interfaces/todoItem.interface';
import { TodoResponseInterface } from './interfaces/todoResponse.interface';
import { ToDosDataInterface } from './interfaces/todosData.interface';
import { ToDoListService } from './services/to-do-list.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  allTodos$!: Observable<TodoResponseInterface[]>;
  todosData$!: Observable<ToDosDataInterface>;
  getQuerryParams$!: Subscription;
  
  limit: number = environment.limit;
  baseUrl!: string;
  currentPage!: number;

  constructor(
    private todoService: ToDoListService, 
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initListeners();
    this.todosData$ = this.todoService.getToDosData();
    this.baseUrl = this.router.url.split('?')[0]; 
  }

  initListeners() {
    this.getQuerryParams$ = this.route.queryParams.subscribe((params: Params) => {
      this.currentPage = Number(params["page"] || '1');
      this.fetchTodos();
    })
  }
  
  openDialog(): void {
    this.dialog.open(CreateTodoComponent, {
      width: '500px',
    });
  }

  fetchTodos(): void {
    const offset = this.currentPage * this.limit - this.limit;
    this.allTodos$ = this.todoService.getToDos(offset, this.limit);
  }

  ngOnDestroy(): void {
    this.getQuerryParams$.unsubscribe();
  }
}
