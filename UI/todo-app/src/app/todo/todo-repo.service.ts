import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch'
import {TodoDTO} from './todo';
import { environment } from '../../environments/environment';

@Injectable()
export class TodoRepoService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  // Simulate POST /todos
  addTodo(todo: TodoDTO): Observable<any> {
    const resourceUrl  = this.apiUrl + 'add-todo';
    return this.http.post(resourceUrl, todo).catch((err) => {
      return Observable.throw(err);
    });
  }

  deleteTodoById(id: number): Observable<any> {
    const resourceUrl  = this.apiUrl + 'delete-todo?id=' + id;
    return this.http.delete(resourceUrl).catch((err) => {
      return Observable.throw(err);
    });
  }

  updateTodo(todo: TodoDTO): Observable<any> {
    const resourceUrl  = this.apiUrl + 'update-todo';
    return this.http.put(resourceUrl, todo).catch((err) => {
        return Observable.throw(err);
      });
  }

  getAllTodos(): Observable<any> {
    const resourceUrl  = this.apiUrl + 'get-all-todo';
    return this.http.get(resourceUrl)
      .catch((err) => {
        return Observable.throw(err);
      });
  }

  getTodoById(id: number): Observable<any> {
    const resourceUrl  = this.apiUrl + 'get-single-todo?id=' + id;
    return this.http.get(resourceUrl)
      .catch((err) => {
        return Observable.throw(err);
      });
  }

  toggleTodoComplete(todo: TodoDTO){   
    todo.Complete = !todo.Complete;
    let updatedTodo = this.updateTodo(todo);
    return updatedTodo;
  }

}
