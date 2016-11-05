
import Backbone from 'backbone';
import TodoItemView from '../views/r_todoItemView';
import ReactDOM from 'react-dom';
import React from 'react';

var TodoView = Backbone.View.extend({
  el: '.todo-container',
  events: {
    'click .btn-add': 'addTodo' //,
    //'keypress .add-input': 'addKeypress'
  },
  initialize: function(todos, controller){
    this.controller = controller;
    this.render(todos);
  },
  render: function(todos){
 
    //redner each todo item
    var controller = this.controller;
    var todosHtml = todos.map(function(todo, index){
        todo.id = index + 1;
        return <TodoItemView key={index} item={todo} controller={controller} />;
      });
    ReactDOM.render( 
      <div>{todosHtml} </div>, 
      this.$el.find('.todo-list') [0]
      );

    // var renderedTodos = todos.map(function(item, index){
    //   item.id = index + 1;
    //   //var view = new bbTodoItemView(item, contoller);
    //   return view.$el;
    // });
    // // map always returns same amount of items it is mapping
    // // map is a great way of translating one object to another
    // //put all the todo items in the DOM
    // this.$el.find('.todo-list').html(renderedTodos);
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
  }
});

module.exports = TodoView;
