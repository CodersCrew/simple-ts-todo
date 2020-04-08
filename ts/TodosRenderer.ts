import { TodosCollection } from "./TodosCollection";
import { todoTemplate, headerTemplate, footerTemplate } from './templates';

const isEnter = (keycode: number): boolean => {
  return keycode === 13;
}

export class TodosRenderer {
  constructor(private todosCollection: TodosCollection) {
    this.render(true);
  }

  $todoList: any = document.querySelector('.todo-list');

  $main: any = document.querySelector('.main');

  $clearCompletedButton: any = document.querySelector('.clear-completed');

  /**
   * Takes the template string and creates an HTML element from it
   * @param template - string with the HTML template
   * @returns generated HTML element
   */
  elementFromTemplate = (template: any) => {
    const $todoContainer = document.createElement('div');
    $todoContainer.innerHTML = template;

    return $todoContainer.firstChild;
  }

  handleTodoInputKeyPress = (e: KeyboardEvent) => {
    const target = e.target as any;

    if (isEnter(e.keyCode) && target.value) {
      this.createTodo(target.value);
      target.value = '';
    }
  }

  handleClearCompletedButtonClick = () => {
    this.clearCompleted();
  }

  createTodoElement = () => {
    const { id, title, isDone } = { id: '1', title: 'Hardcoded Todo', isDone: false };
  
    const todoString = todoTemplate.replace('{{id}}', id).replace('{{title}}', title);
    const $todo: any = this.elementFromTemplate(todoString);
  
    const $editInput: any = $todo.querySelector('input.edit');
    const $todoTitle: any = $todo.querySelector('.todo-title');
    const $toggleInput: any = $todo.querySelector('input.toggle');
    const $destroyButton: any = $todo.querySelector('.destroy');
    
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
    const $header: any = this.elementFromTemplate(headerString);

    const $input = $header.querySelector('input.new-todo');

    $input.addEventListener('keyup', this.handleTodoInputKeyPress);

    return $header;
  };

  createFooterElement = () => {
    const todosLeft = '0'; // Replace with a dynamic value.

    const footerString = footerTemplate.replace('{{todosLeft}}', todosLeft);
    const $footer: any = this.elementFromTemplate(footerString);

    const $clearCompletedButton = $footer.querySelector('.clear-completed');

    $clearCompletedButton.addEventListener('click', this.handleClearCompletedButtonClick);

    return $footer;
  };

  /**
   * Chacks if enter button has been pressed, triggers the Todo updating proccess and unsets the edit mode.
   */
  handleFinishTodoEdition = (todoId: string) => (e: KeyboardEvent) => {}

  /**
   * Creates new Todo with a provided title
   * @param title - title for the Todo
   */
  createTodo: any = () => {}

  /**
   * Removes all completed Todos from the DOM
   */
  clearCompleted: any = () => {}

  /**
   * Changes the idDone status for the particular Todo
   * @param id - id of the Todo
   */
  toggleTodoDoneStatus: any = () => {}

  /**
   * Enables edit mode for a particular Todo.
   * @param id - id of the Todo
   */
  setTodoEditMode: any = () => {}

  /**
   * Disables edit mode for a particular Todo.
   */
  unsetTodoEditMode: any = () => {}

  /**
   * Updates title of the specified Todo.
   * @param id - id of the Todo
   * @param title - new title for the Todo
   */
  updateTodo: any = () => {}

  /**
   * Removes the particular Todo from the DOM
   * @param id - id of the Todo
   */
  removeTodo: any = () => {}

  render = (initial = false) => {
    this.$todoList.innerHTML = '';

    if (initial) {
      const $header = this.createHeaderElement();
      this.$main.before($header);
    }

    const $footer = this.createFooterElement();    
    this.$main.parentElement.removeChild(this.$main.nextSibling);
    this.$main.after($footer);
  
    const todosArr = []; // Replace with a dynamic value.
    const $todos = todosArr.map(this.createTodoElement);
    for (const $todo of $todos) {
      this.$todoList.appendChild($todo);
    }
  }
}