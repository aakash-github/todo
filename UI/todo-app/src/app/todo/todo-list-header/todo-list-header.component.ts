import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TodoDTO } from '../todo';
import { AuthenticationService } from '../../core/authentication.service';

@Component({
  selector: 'todo-list-header',
  templateUrl: './todo-list-header.component.html',
  styleUrls: ['./todo-list-header.component.scss']
})
export class TodoListHeaderComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }
  
  newTodo: TodoDTO = new TodoDTO();

  @Output()
  add: EventEmitter<TodoDTO> = new EventEmitter();

  addTodo() {
    this.add.emit(this.newTodo);
    this.newTodo = new TodoDTO();
  }

  logout(){
    this.authService.logout();
  }
}
