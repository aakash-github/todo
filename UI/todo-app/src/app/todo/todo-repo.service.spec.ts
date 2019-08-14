import {TestBed, async, inject} from '@angular/core/testing';
import {TodoRepoService} from './todo-repo.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TodoDTO } from './todo';
import { environment } from '../../environments/environment.prod';

describe('TodoDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoRepoService]
    });
  });

  let service: TodoRepoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoRepoService]
    });
    service = TestBed.get(TodoRepoService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    //Make sure no request pending
    httpMock.verify();
  });

  it('addTodo should return new todo id', () => {
    const returnedTodoId = 1;

    let newTodo = new TodoDTO();
    service.addTodo(newTodo).subscribe(returnedTodoId => {
      expect(returnedTodoId).toBe(1);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}add-todo`);
    expect(req.request.method).toBe("POST");
    req.flush(1);
  });

  it('getAllTodos return list of todo object', () => {
;
    let todoList = [
      new TodoDTO({Id: 1, Title: "First todo"}),
      new TodoDTO({Id: 2, Title: "Second todo"})
    ]

    service.getAllTodos().subscribe(todoList => {
      expect(todoList).toBe(todoList);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}get-all-todo`);
    expect(req.request.method).toBe("GET");
    req.flush(todoList);
  });

  it('getTodoById should return single todo for id', () => {

    let newTodo = new TodoDTO({ Id : 1, Title : "First todo"});
    service.getTodoById(newTodo.Id).subscribe(newTodo => {
      expect(newTodo).toBe(newTodo);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}get-single-todo?id=${newTodo.Id}`);
    expect(req.request.method).toBe("GET");
    req.flush(newTodo);
  });

  it('deleteTodoById should delete the todo for givin id', () => {

    let id = 1
    service.deleteTodoById(id).subscribe(returnedTodoId => {
      expect(returnedTodoId).toBe(null);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}delete-todo?id=${id}`);
    expect(req.request.method).toBe("DELETE");
    req.flush(null);
  });

  it('updateTodo should update the todo', () => {

    let newTodo = new TodoDTO();
    service.updateTodo(newTodo).subscribe(returnedTodoId => {
      expect(returnedTodoId).toBe(null);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}update-todo`);
    expect(req.request.method).toBe("PUT");
    req.flush(null);
  });


  it('toggleTodoComplete should update todo status', () => {

    let newTodo = new TodoDTO();
    service.toggleTodoComplete(newTodo).subscribe(returnedTodoId => {
      expect(returnedTodoId).toBe(null);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}update-todo`);
    expect(req.request.method).toBe("PUT");
    req.flush(null);
  });

});