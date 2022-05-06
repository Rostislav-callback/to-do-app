import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input('id') idProps!: number;
  @Input('title') titleProps!: string;
  @Input('isCompleted') isCompletedProps!: boolean;

  color: string = 'black'

  constructor() { }

  ngOnInit(): void { }

  onChangeCheck(event: any) { }
}
