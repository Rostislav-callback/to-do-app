import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { TodoItemComponent } from './todo-item.component';



@NgModule({
  declarations: [
    TodoItemComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatCheckboxModule
  ],
  exports: [
    TodoItemComponent
  ]
})
export class TodoItemModule { }
