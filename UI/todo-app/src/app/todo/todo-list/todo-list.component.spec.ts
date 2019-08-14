import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialUiModule } from '../../core/material-ui.module';
import { RouterModule } from '@angular/router';
import { TodoListFooterComponent } from '../todo-list-footer/todo-list-footer.component';
import { TodoListHeaderComponent } from '../todo-list-header/todo-list-header.component';
import { TodoListItemComponent } from '../todo-list-item/todo-list-item.component';
import { TodoDTO } from '../todo';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoListComponent, TodoListFooterComponent, TodoListHeaderComponent, TodoListItemComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MaterialUiModule, 
        RouterModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    component.todos =  [new TodoDTO(), new TodoDTO()];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event on toggle complete', () => {
    const todo= new TodoDTO();
    spyOn(component.toggleComplete, 'emit');
    component.onToggleTodoComplete(todo);
    expect(component.toggleComplete.emit).toHaveBeenCalledWith(todo);
  });


  it('should emit event on remove', () => {
    const todo= new TodoDTO();
    spyOn(component.remove, 'emit');
    component.onRemoveTodo(todo);
    expect(component.remove.emit).toHaveBeenCalledWith(todo);
  });
});
