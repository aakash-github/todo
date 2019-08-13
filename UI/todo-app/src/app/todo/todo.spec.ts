import {TodoDTO} from './todo';

describe('Todo', () => {
  it('should create an instance', () => {
    expect(new TodoDTO()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    let todo = new TodoDTO({
      title: 'hello',
      complete: true
    });
    expect(todo.Title).toEqual('hello');
    expect(todo.Complete).toEqual(true);
  });
});