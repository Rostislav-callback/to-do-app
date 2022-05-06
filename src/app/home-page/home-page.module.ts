import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { HomePageComponent } from './home-page.component';
import { TadosDataModule } from '../todos-data/todos-data.module';
import { CreateTodoModule } from '../create-todo/create-todo.module';



@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    TadosDataModule,
    CreateTodoModule,
    MatButtonModule
  ]
})
export class HomePageModule { }
