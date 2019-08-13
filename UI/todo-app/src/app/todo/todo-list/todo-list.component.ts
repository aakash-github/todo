import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TodoDTO } from '../todo';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  @Input()
  todos: TodoDTO[];

  @Output()
  remove: EventEmitter<TodoDTO> = new EventEmitter();

  @Output()
  toggleComplete: EventEmitter<TodoDTO> = new EventEmitter();

  onToggleTodoComplete(todo: TodoDTO) {
    this.toggleComplete.emit(todo);
  }

  onRemoveTodo(todo: TodoDTO) {
    this.remove.emit(todo);
  }

}
