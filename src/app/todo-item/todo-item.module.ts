import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

import { TodoItemComponent } from './todo-item.component';




@NgModule({
  declarations: [
    TodoItemComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  exports: [
    TodoItemComponent
  ]
})
export class TodoItemModule { }
