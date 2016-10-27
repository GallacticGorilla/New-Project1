

//var $ = window.$;
import Backbone from 'backbone';
import bbTodoModel from '../models/bb_todoModel';
import bbtodoView from '../views/bb_todoView';

var Controller = Backbone.View.extend({
  model: new bbTodoModel(),
  initialize: function(){
    // fetch will call render when done
    var that = this;
    this.model.fetch(function(){
      that.render();
    });
  },
  render: function(){
    var todos = this.model.get('todos');
    if (this.view !== undefined) {
      this.view.removeHandlers();
    }
    this.view = new bbtodoView(todos, this);
  },
  addTodo: function(newTitle){
    this.model.addTodo(newTitle);
    this.render();
  },
  addKeypress: function(event, newTitle){
    if (event.which === 13) {
      this.addTodo(newTitle);
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

module.exports = Controller;
