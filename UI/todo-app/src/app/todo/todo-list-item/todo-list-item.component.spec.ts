import { AppModule } from './../../app.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListItemComponent } from './todo-list-item.component';
import { TodoDTO } from '../todo';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material';

fdescribe('TodoListItemComponent', () => {
  let component: TodoListItemComponent;
  let fixture: ComponentFixture<TodoListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoListItemComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit todo on Toggle Complete', () => {
    const todo=new TodoDTO();
    spyOn(component.toggleComplete, 'emit');
    component.toggleTodoComplete(todo);
    expect(component.toggleComplete.emit).toHaveBeenCalledWith(true);
  });


});
