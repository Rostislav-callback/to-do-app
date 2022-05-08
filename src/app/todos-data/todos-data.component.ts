import { Component, OnInit, Input } from '@angular/core';
import { ToDosDataInterface } from '../home-page/interfaces/todosData.interface';

@Component({
  selector: 'app-todos-data',
  templateUrl: './todos-data.component.html',
  styleUrls: ['./todos-data.component.scss']
})
export class TodosDataComponent implements OnInit {
  @Input('todosData') todosDataProps!: ToDosDataInterface;

  constructor() { }

  ngOnInit(): void { 
    
  }
}
