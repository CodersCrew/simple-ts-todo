import { TodosCollection } from "./TodosCollection";
import { Todo } from "./Todo";
import { todoTemplate, headerTemplate, footerTemplate } from './templates';

export class TodosRenderer {
  constructor(private todosCollection: TodosCollection) {
    this.render(true);
  }

  $todoList = document.querySelector<HTMLUListElement>('.todo-list');

  $main = document.querySelector<HTMLDivElement>('.main');

  $clearCompletedButton = document.querySelector<HTMLUListElement>('.clear-completed');

  elementFromTemplate = <T extends HTMLElement>(template: string): T => {
    const $todoContainer = document.createElement('div');
    $todoContainer.innerHTML = template;

    return $todoContainer.firstChild as T;
  }

  handleTodoInputKeyPress = (e: KeyboardEvent) => {
    const target = e.target as HTMLInputElement;

    if (isEnter(e.keyCode) && target.value) {
      this.createTodo(target.value);
      target.value = '';
    }
  }

  handleClearCompletedButtonClick = () => {
    this.clearCompleted();
  }

  createTodoElement = ({ id, title, isDone }: Todo): HTMLLIElement => {
    const todoString = todoTemplate.replace('{{id}}', id).replace('{{title}}', title);
    const $todo = this.elementFromTemplate<HTMLLIElement>(todoString);
  
    const $editInput = $todo.querySelector<HTMLInputElement>('input.edit');
    const $todoTitle = $todo.querySelector<HTMLInputElement>('.todo-title');
    const $toggleInput = $todo.querySelector<HTMLInputElement>('input.toggle');
    const $destroyButton = $todo.querySelector<HTMLInputElement>('.destroy');
    
    $todoTitle.addEventListener('dblclick', () => this.setTodoEditMode(id));
    $toggleInput.addEventListener('click', () => this.toggleTodoDoneStatus(id));
    $destroyButton.addEventListener('click', () => this.removeTodo(id));

    if (isDone) {
      $todo.classList.add('completed');
      $toggleInput.setAttribute('checked', 'true');
    }

    if (id === this.todosCollection.getCurrentlyEditedTodoId()) {
      $editInput.value = title;
      $todo.classList.add('editing');
      $editInput.addEventListener('keyup', this.handleFinishTodoEdition(id));
    }

    return $todo;
  }

  createHeaderElement = () => {
    const headerString = headerTemplate;
    const $header = this.elementFromTemplate<HTMLDivElement>(headerString);

    const $input = $header.querySelector('input.new-todo');

    $input.addEventListener('keyup', this.handleTodoInputKeyPress);

    return $header;
  };

  createFooterElement = () => {
    const footerString = footerTemplate.replace('{{todosLeft}}', this.todosCollection.length().toString());
    const $footer = this.elementFromTemplate<HTMLDivElement>(footerString);

    const $clearCompletedButton = $footer.querySelector('.clear-completed');

    $clearCompletedButton.addEventListener('click', this.handleClearCompletedButtonClick);

    return $footer;
  };

  handleFinishTodoEdition = (todoId: string) => (e: KeyboardEvent) => {
    if (isEnter(e.keyCode)) {
      const target = e.target as HTMLInputElement;
      this.updateTodo(todoId, target.value);
      this.unsetTodoEditMode();
    }
  }

  createTodo = (title: string): void => {
    this.todosCollection.addWithTitle(title);
    this.render();
  }

  clearCompleted = (): void => {
    this.todosCollection.clearCompleted();
    this.render();
  }

  toggleTodoDoneStatus = (id: string): void => {
    this.todosCollection.toggleTodoIsDone(id);
    this.render();
  }

  setTodoEditMode = (id: string): void => {
    this.todosCollection.setTodoEditMode(id);
    this.render();
  }

  unsetTodoEditMode = (): void => {
    this.todosCollection.unsetTodoEditMode();
    this.render();
  }

  updateTodo = (id: string, title: string): void => {
    this.todosCollection.updateTodoTitle(id, title);
    this.render();
  }

  removeTodo = (id: string): void => {
    this.todosCollection.remove(id);
    this.render();
  }

  render = (initial = false) => {
    this.$todoList.innerHTML = '';

    if (initial) {
      const $header = this.createHeaderElement();
      this.$main.before($header);
    }

    const $footer = this.createFooterElement();    
    this.$main.parentElement.removeChild(this.$main.nextSibling);
    this.$main.after($footer);
  
    const $todos = this.todosCollection.getAll().map(this.createTodoElement);
    for (const $todo of $todos) {
      this.$todoList.appendChild($todo);
    }
  }
}

function isEnter(keycode: number) {
  return keycode === 13;
}