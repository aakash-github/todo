import { Component } from '@angular/core';
import { TodoDTO } from './todo/todo';
import { TodoRepoService } from './todo/todo-repo.service';

@Component({
  selector: 'todo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {

  }
}
