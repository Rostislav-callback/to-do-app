import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

import { map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { TodoResponseInterface } from '../interfaces/todoResponse.interface';
import { ToDosDataInterface } from '../interfaces/todosData.interface';


@Injectable({
  providedIn: 'root'
})
export class ToDoListService {

  constructor(private http: HttpClient) { }

  getToDos(offset: number, limit: number): Observable<TodoResponseInterface[]> {
    const url = environment.apiUrl + `/user/1/todos?&_start=${offset}&_limit=${limit}`;

    return this.http.get<TodoResponseInterface[]>(url).pipe(
      map(data => {
        return data;
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

        return responseData;
      })
    )
  }
}
