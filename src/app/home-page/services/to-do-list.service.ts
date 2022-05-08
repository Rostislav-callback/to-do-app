import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

import { BehaviorSubject, map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { TodoResponseInterface } from '../interfaces/todoResponse.interface';
import { ToDosDataInterface } from '../interfaces/todosData.interface';
import { TodoItemInterface } from 'src/app/create-todo/interfaces/todoItem.interface';



@Injectable({
  providedIn: 'root'
})
export class ToDoListService {
  allTodos$: BehaviorSubject<any> = new BehaviorSubject([]);
  todosData$: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(private http: HttpClient) { }

  getToDos(): Observable<void> {
    const url = environment.apiUrl + `/user/1/todos`;

    return this.http.get<TodoResponseInterface[]>(url).pipe(
      map(data => {
        this.allTodos$.next(Object.values(data));
      })
    )
  }

  getToDosData(): Observable<ToDosDataInterface> {
    const url = environment.apiUrl + '/user/1/todos';

    return this.http.get<TodoResponseInterface[]>(url).pipe(
      map(data => {
        const todos = Object.values(data);
        const doneTodos = todos.filter(el => el.completed === true).length;
        const notDoneTodos = todos.filter(el => el.completed === false).length;

        const responseData: ToDosDataInterface = {
          total: todos.length,
          completed: doneTodos,
          unfulfilled: notDoneTodos
        };

        this.todosData$.next(responseData);

        return responseData;
      })
    )
  }

  createTodo(todo: TodoItemInterface, modalRef: any) :Observable<any> {
    const url = environment.apiUrl + '/todos';
    const oldAllTodoList = this.allTodos$.getValue();
    const oldTodosData = this.todosData$.getValue();

    return this.http.post(url, todo).pipe(
      map((res) => {
        const newObj = {
          total: ++oldTodosData.total, 
          completed: oldTodosData.completed, 
          unfulfilled: ++oldTodosData.unfulfilled
        }

        Object(res).id = oldTodosData.total;
        oldAllTodoList.unshift(res);

        this.allTodos$.next(oldAllTodoList);
        this.todosData$.next(newObj);

        modalRef.close();
      })
    )
  }

  updateTodo(data: any, id: number) :Observable<any> {
    const url = environment.apiUrl + `/todos/${id}`;
    const oldTodosData = this.todosData$.getValue();
    const oldAllTodoList = this.allTodos$.getValue();

    const newObj = {
      total: oldTodosData.total, 
      completed: oldTodosData.completed, 
      unfulfilled: oldTodosData.unfulfilled
    }
    
    return this.http.patch(url, data).pipe(
      map(() => {
        oldAllTodoList.map((item: any) => {
          item.id === id? item.completed = data.completed: item
        })

        this.allTodos$.next(oldAllTodoList);

        if (data.completed === true) {
          ++newObj.completed;
          --newObj.unfulfilled;
          this.todosData$.next(newObj);
        } else {
          --newObj.completed;
          ++newObj.unfulfilled;
          this.todosData$.next(newObj);
        }
      })
    )
  }

  deleteTodo(id: number):Observable<any> {
    const url = environment.apiUrl + `/todos/${id}`;
    const oldAllTodoList = this.allTodos$.getValue();
    const oldTodosData = this.todosData$.getValue();

    const newObj = {
      total: oldTodosData.total, 
      completed: oldTodosData.completed, 
      unfulfilled: oldTodosData.unfulfilled
    }

    return this.http.delete(url).pipe(
      map(() => {
        const currentItem = oldAllTodoList.find((el: any) => el.id == id);
        const newData = oldAllTodoList.filter((el: any) => el.id !== id);

        --newObj.total;

        if (currentItem.completed == true) {
          --newObj.completed;
          this.todosData$.next(newObj);
        } 
        if (currentItem.completed == false) {
          --newObj.unfulfilled;
          this.todosData$.next(newObj);
        }
        
        this.allTodos$.next(newData);
      })
    )
  }
}
