
import Backbone from 'backbone';
import bbTodoItemView from '../views/bb_todoItemView';

var TodoView = Backbone.View.extend({
  el: '.todo-container',
  events: {
    'click .btn-add': 'addTodo' //,
    //'keypress .add-input': 'addKeypress'
  },
  initialize: function(todos, contoller){
    this.contoller = contoller;
    this.render(todos);
  },
  render: function(todos){
    //redner each todo item
    var contoller = this.contoller;
    var renderedTodos = todos.map(function(item, index){
      item.id = index + 1;
      var view = new bbTodoItemView(item, contoller);
      return view.$el;
    });
    // map always returns same amount of items it is mapping
    // map is a great way of translating one object to another
    //put all the todo items in the DOM
    this.$el.find('.todo-list').html(renderedTodos);
  },
  removeHandlers: function(){
    this.$el.find('.btn-add').off();
    this.$el.find('.add-input').off();
  },
  addTodo: function(){
    var newTitle = this.$el.find('.add-input').val();
    this.$el.find('.add-input').val('');
    this.contoller.addTodo(newTitle);
  },
  addKeypress: function(event){
    var newTitle = this.$el.find('.add-input').val();
   this.contoller.addKeypress(event, newTitle);
  },
  removeTodo: function(id){
    this.contoller.removeTodo(id);
  },
  editTodo: function(id, newTitle){
    this.contoller.editTodo(id, newTitle); 
  },
  changeComplete: function(id){
    this.contoller.changeComplete(id);
  }
});

module.exports = TodoView;
