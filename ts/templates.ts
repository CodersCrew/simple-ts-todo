export const todoTemplate = `
<li class="todo-item" data-id="{{id}}">
  <div class="view">
    <input class="toggle" type="checkbox" />
    <label class="todo-title">{{title}}</label>
    <button class="destroy" />
  </div>
  <input class="edit" />
</li>
`.trim();

export const headerTemplate = `
<header class="header">
  <h1>My Todo App</h1>
  <input class="new-todo" placeholder="What needs to be done?" autofocus />
</header>
`.trim();

export const footerTemplate = `
<footer class="footer">
  <span class="todo-count">
    <strong>{{todosLeft}}</strong> todos left
  </span>
  <button class="clear-completed">
    Clear completed
  </button>
</footer>
`.trim();