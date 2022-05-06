import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

import { map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { TodoItemInterface } from '../interfaces/todoItem.interface';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {

  constructor(private http: HttpClient) { }

  getToDos(): Observable<TodoItemInterface[]> {
    const url = environment.apiUrl + '/user/1/todos';

    return this.http.get<TodoItemInterface[]>(url).pipe(
      map(data => {
        return data;
      })
    )
  }
}
