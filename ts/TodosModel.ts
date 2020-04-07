import { Todo } from "./Todo";
import { Collection } from "./Collection";

export class TodosCollection extends Collection<Todo> {
  private currentlyEdited: string | null = null;

  getCurrentlyEditedTodoId = () => {
    return this.currentlyEdited;
  }

  getTodoById = (id: string) => {
    return this.find(todo => todo.id === id);
  }

  addWithTitle = (title: string) => {
    const todo = new Todo(title);

    this.add(todo);
  }

  updateTodoTitle = (id: string, title: string): void => {
    this.update(id, { title });
  }

  clearCompleted = () => {
    this.removeBy(todo => !todo.isDone);
  }

  toggleTodoIsDone = (id: string) => {
    const { isDone } = this.getTodoById(id);

    this.update(id, { isDone })
  }

  setTodoEditMode = (id: string) => {
    this.currentlyEdited = id;
  }

  unsetTodoEditMode = () => {
    this.currentlyEdited = null;
  }
}