import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

import { TodosDataComponent } from './todos-data.component';



@NgModule({
  declarations: [
    TodosDataComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatDividerModule
  ],
  exports: [
    TodosDataComponent
  ]
})
export class TadosDataModule { }
