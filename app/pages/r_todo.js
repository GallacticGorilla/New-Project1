

//var $ = window.$;
import Backbone from 'backbone';
import rTodoModel from '../models/r_todoModel';
import TodoView from '../views/r_todoView';
import ReactDOM from 'react-dom';
import React from 'react';

var Controller = Backbone.View.extend({
  model: new rTodoModel(),
  initialize: function(){
    // fetch will call render when done
    var that = this;
    this.model.fetch(function(){
      that.render();
    });
  },
  render: function(){
    var todos = this.model.get('todos');
 
    ReactDOM.render(
      <TodoView todos={todos} controller={this} />, 
      document.querySelector('.todo-container')  
     );
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
