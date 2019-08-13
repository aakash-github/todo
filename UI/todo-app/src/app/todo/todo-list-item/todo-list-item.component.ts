import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { TodoDTO } from '../todo';

@Component({
  selector: 'todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss']
})
export class TodoListItemComponent implements OnInit {

  ngOnInit() {
  }

  @Input() todo: TodoDTO;

  @Output()
  remove: EventEmitter<TodoDTO> = new EventEmitter();

  @Output()
  toggleComplete: EventEmitter<TodoDTO> = new EventEmitter();

  constructor() {
  }

  toggleTodoComplete(todo: TodoDTO) {
    this.toggleComplete.emit(todo);
  }

  removeTodo(todo: TodoDTO) {
    this.remove.emit(todo);
  }
}
