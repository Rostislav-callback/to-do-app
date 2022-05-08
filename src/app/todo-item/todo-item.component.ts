import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { ToDoListService } from '../home-page/services/to-do-list.service';
import { TodoResponseInterface } from '../home-page/interfaces/todoResponse.interface';
import { ToDosDataInterface } from '../home-page/interfaces/todosData.interface';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input('todo') todoProps!: TodoResponseInterface;
  @Input('todosData') todosDataProps!: ToDosDataInterface;

  checkedTask$!: Observable<any>;
  deleteTask$!: Observable<any>;

  color: string = 'black'

  constructor(private todoListService: ToDoListService) { }

  ngOnInit(): void { 
    
  }

  onChangeCheck(event: any) { 
    const isCompletedData = {
      completed: event.checked
    }

    this.checkedTask$ = this.todoListService.updateTodo(isCompletedData, this.todoProps.id);
  }

  deleteTodo(): void {
    this.deleteTask$ = this.todoListService.deleteTodo(this.todoProps.id);
  }
}
