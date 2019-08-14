import {TodoDTO} from './todo';

describe('Todo DTO', () => {
  it('should create an instance', () => {
    expect(new TodoDTO()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    let todo = new TodoDTO({
      Title: 'First todo',
      Complete: true
    });
    expect(todo.Title).toEqual('First todo');
    expect(todo.Complete).toEqual(true);
  });
});