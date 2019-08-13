import { Component, OnInit, Input } from '@angular/core';
import { TodoDTO } from '../todo';

@Component({
  selector: 'todo-list-footer',
  templateUrl: './todo-list-footer.component.html',
  styleUrls: ['./todo-list-footer.component.scss']
})
export class TodoListFooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() todos: TodoDTO[];

}
