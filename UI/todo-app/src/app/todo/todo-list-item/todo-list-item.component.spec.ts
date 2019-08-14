import { AppModule } from './../../app.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListItemComponent } from './todo-list-item.component';
import { TodoDTO } from '../todo';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material';
import { MaterialUiModule } from '../../core/material-ui.module';
import { RouterModule } from '@angular/router';

describe('TodoListItemComponent', () => {
  let component: TodoListItemComponent;
  let fixture: ComponentFixture<TodoListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoListItemComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MaterialUiModule, 
        RouterModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListItemComponent);
    component = fixture.componentInstance;
    component.todo =  new TodoDTO();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit todo on Toggle Complete', () => {
    const todo= new TodoDTO();
    spyOn(component.toggleComplete, 'emit');
    component.toggleTodoComplete(todo);
    expect(component.toggleComplete.emit).toHaveBeenCalledWith(todo);
  });

  it('should remove todo on Toggle Complete', () => {
    const todo= new TodoDTO();
    spyOn(component.remove, 'emit');
    component.removeTodo(todo);
    expect(component.remove.emit).toHaveBeenCalledWith(todo);
  });

});
