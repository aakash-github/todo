import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TodoComponent } from './todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoListFooterComponent } from './todo-list-footer/todo-list-footer.component';
import { TodoListHeaderComponent } from './todo-list-header/todo-list-header.component';
import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialUiModule } from '../core/material-ui.module';
import { Router } from '@angular/router';
import { TodoRepoService } from './todo-repo.service';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from '../core/authentication.service';
import { Observable } from 'rxjs';
import { TodoDTO } from './todo';


class MockTodoRepoService {
  addTodo(todo: TodoDTO): Observable<any> {
    return Observable.of(todo.Id);
  }

  deleteTodoById(id: number): Observable<any> {
    return Observable.of(true);
  }

  updateTodo(todo: TodoDTO): Observable<any> {
    return Observable.of(todo);
  }

  getAllTodos(): Observable<any> {
    return Observable.of([new TodoDTO(), new TodoDTO()]);
  }

  getTodoById(id: number): Observable<any> {
    var newTodo = new TodoDTO();
    newTodo.Id = id;
    return Observable.of(newTodo);
  }

  toggleTodoComplete(todo: TodoDTO) {
    todo.Complete = !todo.Complete;
    return Observable.of(todo);
  }
}

class MockMatSnackBar {
  open(message) {

  }
}

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let mocktodoRepoService: TodoRepoService;
  let mockMatSnackBar: MatSnackBar;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoComponent, TodoListComponent, TodoListFooterComponent, TodoListHeaderComponent, TodoListItemComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MaterialUiModule,
        RouterTestingModule, 
        HttpClientTestingModule
      ],
      providers: [{ provide: TodoRepoService, useClass: MockTodoRepoService },
      { provide: MatSnackBar, useClass: MockMatSnackBar },
        AuthenticationService,
      {
        provide: Router,
        useClass: class { navigate = jasmine.createSpy("navigate"); }
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    mocktodoRepoService = TestBed.get(TodoRepoService);
    mockMatSnackBar = TestBed.get(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllTodos on ngOnInit and set todos', () => {
    spyOn(mocktodoRepoService, 'getAllTodos').and.callThrough();
    component.ngOnInit();
    expect(mocktodoRepoService.getAllTodos).toHaveBeenCalled();
    expect(component.todos.length).toEqual(2);
  });

  it('should addTodo, fetch todo back and show snackBar on onAddTodo()', () => {
    spyOn(mocktodoRepoService, 'addTodo').and.callThrough();
    spyOn(mockMatSnackBar, 'open').and.callThrough();
    spyOn(mocktodoRepoService, 'getTodoById').and.callThrough();
    component.todos = [];
    component.onAddTodo(new TodoDTO({Id : 1}));

    expect(mocktodoRepoService.addTodo).toHaveBeenCalled();
    expect(mocktodoRepoService.getTodoById).toHaveBeenCalled();
    expect(mockMatSnackBar.open).toHaveBeenCalledWith("Todo added");
    expect(component.todos.length).toEqual(1);
    expect(component.todos[0].Id).toEqual(1);
  });

  it('should change complete status on onToggleTodoComplete() call', () => {
    spyOn(mocktodoRepoService, 'toggleTodoComplete').and.callThrough();
    spyOn(mockMatSnackBar, 'open').and.callThrough();
    spyOn(mocktodoRepoService, 'getTodoById').and.callThrough();
    component.onToggleTodoComplete(new TodoDTO({Id : 1, Complete: true}));

    expect(mocktodoRepoService.toggleTodoComplete).toHaveBeenCalled();
    expect(mocktodoRepoService.getTodoById).toHaveBeenCalled();
    expect(mockMatSnackBar.open).toHaveBeenCalled();
  });

  it('Should delete the passed todo on calling deleteTodoById', () => {
    spyOn(mocktodoRepoService, 'deleteTodoById').and.callThrough();
    spyOn(mockMatSnackBar, 'open').and.callThrough();

    component.todos = [new TodoDTO({Id : 1}), new TodoDTO({Id : 2})];
    component.onRemoveTodo(component.todos[0]);

    expect(mocktodoRepoService.deleteTodoById).toHaveBeenCalled();
    expect(mockMatSnackBar.open).toHaveBeenCalledWith("Todo removed");
    expect(component.todos.length).toEqual(1);
  });
});
