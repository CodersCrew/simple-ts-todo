import * as uuid from 'uuid';

export class Todo {
  constructor(title: string) {
    this.id = uuid.v4();
    this.title = title;
    this.isDone = false;
  }

  id: string;
  title: string;
  isDone: boolean;
}
