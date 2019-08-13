import { TodoRepoService } from './todo-repo.service';
import { Component, OnInit } from '@angular/core';
import { TodoDTO } from './todo';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'todo-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  constructor(private todoDataService: TodoRepoService, private snackBar: MatSnackBar) {
  }

  todos: TodoDTO[];

  public ngOnInit() {
    this.todoDataService
      .getAllTodos()
      .subscribe(
        (todos) => {
          this.todos = todos;
        }
      );
  }

  onAddTodo(todo) {
    this.todoDataService
      .addTodo(todo)
      .subscribe(
        (newTodoId) => {
          this.todoDataService.getTodoById(newTodoId).subscribe(
            (todo: TodoDTO) => {
              this.todos.push(todo);
              this.snackBar.open("Todo added");
            });
        }
      );
  }

  onToggleTodoComplete(todo: TodoDTO) {
    this.todoDataService
      .toggleTodoComplete(todo)
      .subscribe(
        () => {
          this.snackBar.open(`Todo ${todo.Complete ? 'marked completed': 'marked active'}`);
          this.todoDataService.getTodoById(todo.Id).subscribe(
            (updatedTodo: TodoDTO) => {
              todo = updatedTodo;
            });
        }
      );
  }


  onRemoveTodo(todo: TodoDTO) {
    this.todoDataService
      .deleteTodoById(todo.Id)
      .subscribe(
        () => {
          this.snackBar.open("Todo removed");
          this.todos = this.todos.filter((t) => t.Id !== todo.Id);
        }
      );
  }

}
