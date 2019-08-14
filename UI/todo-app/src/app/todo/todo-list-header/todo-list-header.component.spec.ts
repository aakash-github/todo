import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListHeaderComponent } from './todo-list-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialUiModule } from '../../core/material-ui.module';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../core/authentication.service';
import { TodoDTO } from '../todo';
import { Observable } from 'rxjs';


class MockAuthenticationService{
  logout(){
    return true;
  }

  login(){
    return Observable.of(true);
  }

  register(){
    return Observable.of(true);
  }
}

describe('TodoListHeaderComponent', () => {
  let component: TodoListHeaderComponent;
  let fixture: ComponentFixture<TodoListHeaderComponent>;
  let mockAuthenticationService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoListHeaderComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MaterialUiModule, 
        RouterModule
      ],
      providers: [{ provide: AuthenticationService, useClass: MockAuthenticationService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // mockAuthenticationService = TestBed.get(AuthenticationService);
    mockAuthenticationService = fixture.debugElement.injector.get(AuthenticationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit new todo', () => {
    const todo = new TodoDTO();
    spyOn(component.add, 'emit');
    component.addTodo();
    expect(component.add.emit).toHaveBeenCalledWith(todo);
  });

  it('should call logout on auth service', () => {
    const spy = spyOn(mockAuthenticationService, 'logout');
    component.logout();
    expect(spy).toHaveBeenCalled();
  });


});
