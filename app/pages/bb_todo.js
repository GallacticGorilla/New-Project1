

//var $ = window.$;
import Backbone from 'backbone';
import bbTodoModel from '../models/bb_todoModel';
import bbTodoItemView from '../views/bb_todoItemView';

var ControllerView = Backbone.View.extend({
  el: '.todo-container',
  events: {
    'click .btn-add': 'addTodo',
    'keypress .add-input': 'addKeypress'
  },
  model: new bbTodoModel(),
  initialize: function(){
    this.model.fetch();
    this.render();
  },
  render: function(){
    //alert('You have ' + this.model.get('todos').length + ' todos!');
    var todos = this.model.get('todos');
    //redner each todo item
    var me = this;
    var renderedTodos = todos.map(function(item, index){
      item.id = index + 1;
      var view = new bbTodoItemView(item, me);
      return view.$el;
    });
    // map always returns same amount of items it is mapping
    // map is a great way of translating one object to another
    //put all the todo items in the DOM
    this.$el.find('.todo-list').html(renderedTodos);
  },
  addTodo: function(){
    var newTitle = this.$el.find('.add-input').val();
    this.model.addTodo(newTitle);
    this.$el.find('.add-input').val('');
    this.render();
  },
  addKeypress: function(event){
    if (event.which === 13) {
      this.addTodo();
    }
  },
  removeTodo: function(id){
    if (id  >= 0){
      this.model.removeTodo(id);
      this.render();
    }
  },
  editTodo: function(id, newTitle){
    if (id  >= 0){
      this.model.editTodo(id, newTitle);
      this.render();
    }   
  },
  changeComplete: function(id){
    if (id  >= 0){
      this.model.completeTodo(id);
      this.render();
    }  
  }
});

module.exports = ControllerView;
