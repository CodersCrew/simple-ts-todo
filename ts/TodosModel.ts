import { Todo } from "./Todo";

export class TodosModel {
  private todos: Todo[] = [];
  private currentlyEdited: string | null = null;

  getAllTodos = () => {
    return this.todos;
  }

  getTodosCount = () => {
    return this.todos.length;
  }

  getCurrentlyEditedTodoId = () => {
    return this.currentlyEdited;
  }

  getTodoById = (id: string) => {
    return this.todos.find(todo => todo.id === id);
  }

  createTodo = (title: string) => {
    const todo = new Todo(title);
    this.todos.push(todo);
  }

  updateTodoTitle = (id: string, title: string): void => {
    this.todos = this.todos.map(todo => todo.id === id ? { ...todo, title } : todo);
  }

  clearCompleted = () => {
    this.todos = this.todos.filter(todo => !todo.isDone);
  }

  toggleTodoIsDone = (id: string) => {
    const { isDone } = this.getTodoById(id);
    this.todos = this.todos.map(todo => todo.id === id ? { ...todo, isDone: !isDone } : todo);
  }

  removeTodo = (id: string) => {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  setTodoEditMode = (id: string) => {
    this.currentlyEdited = id;
  }

  unsetTodoEditMode = () => {
    this.currentlyEdited = null;
  }
}