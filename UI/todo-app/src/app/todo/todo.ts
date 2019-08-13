export class TodoDTO {
    Id: number;
    Title: string = '';
    Complete: boolean = false;
  
    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
  }