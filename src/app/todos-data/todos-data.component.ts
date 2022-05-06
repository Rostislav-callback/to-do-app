import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-todos-data',
  templateUrl: './todos-data.component.html',
  styleUrls: ['./todos-data.component.scss']
})
export class TodosDataComponent implements OnInit {
  @Input('total') totalProps!: number;
  @Input('completed') completeProps!: number;
  @Input('unfulfilled') unfulfilledProps!: number;

  constructor() { }

  ngOnInit(): void { }
}
