import {TestBed, async, inject} from '@angular/core/testing';
import {TodoDTO} from './todo';
import {TodoRepoService} from './todo-repo.service';

xdescribe('TodoDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoRepoService]
    });
  });

  xit('should ...', inject([TodoRepoService], (service: TodoRepoService) => {
    expect(service).toBeTruthy();
  }));

  xdescribe('#getAllTodos()', () => {

    it('should return an empty array by default', inject([TodoRepoService], (service: TodoRepoService) => {
      expect(service.getAllTodos()).toEqual([]);
    }));

    it('should return all todos', inject([TodoRepoService], (service: TodoRepoService) => {
      let todo1 = new TodoDTO({title: 'Hello 1', complete: false});
      let todo2 = new TodoDTO({title: 'Hello 2', complete: true});
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
    }));

  });

  xdescribe('#save(todo)', () => {

    it('should automatically assign an incrementing id', inject([TodoRepoService], (service: TodoRepoService) => {
      let todo1 = new TodoDTO({title: 'Hello 1', complete: false});
      let todo2 = new TodoDTO({title: 'Hello 2', complete: true});
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getTodoById(1)).toEqual(todo1);
      expect(service.getTodoById(2)).toEqual(todo2);
    }));

  });

  describe('#deleteTodoById(id)', () => {

    it('should remove todo with the corresponding id', inject([TodoRepoService], (service: TodoRepoService) => {
      let todo1 = new TodoDTO({title: 'Hello 1', complete: false});
      let todo2 = new TodoDTO({title: 'Hello 2', complete: true});
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
      service.deleteTodoById(1);
      expect(service.getAllTodos()).toEqual([todo2]);
      service.deleteTodoById(2);
      expect(service.getAllTodos()).toEqual([]);
    }));

    it('should not removing anything if todo with corresponding id is not found', inject([TodoRepoService], (service: TodoRepoService) => {
      let todo1 = new TodoDTO({title: 'Hello 1', complete: false});
      let todo2 = new TodoDTO({title: 'Hello 2', complete: true});
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
      service.deleteTodoById(3);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
    }));

  });
});