import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing'
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
    return Observable.of(1);
  }

  deleteTodoById(id: number): Observable<any> {
    return Observable.of();
  }

  updateTodo(todo: TodoDTO): Observable<any> {
    return Observable.of();
  }

  getAllTodos(): Observable<any> {
    return Observable.of([new TodoDTO(), new TodoDTO()]);
  }

  getTodoById(id: number): Observable<any> {
    return Observable.of(new TodoDTO());
  }

  toggleTodoComplete(todo: TodoDTO) {
    return Observable.of();
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
        RouterTestingModule
      ],
      providers: [{ provide: TodoRepoService, useClass: MockTodoRepoService },
      { provide: MatSnackBar, useClass: MockMatSnackBar },
        AuthenticationService,
      { provide: HttpClient, deps: [MockBackend] },
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
