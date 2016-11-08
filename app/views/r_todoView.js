import React from 'react';
import TodoItemView from './r_todoItemView';

var todoView = React.createClass({
  getInitialState: function(){
    return {
      newTitle: ''
    };
  },
  propTypes: {
    todos: React.PropTypes.array.isRequired,
    controller: React.PropTypes.object.isRequired
  },
  render: function(){
     var controller = this.props.controller;
     var todosHtml = this.props.todos.map(function(todo, index){
      todo.id = index + 1;
      return <TodoItemView key={index} item={todo} controller={controller} />;
    });
    return (
      <div>
        <div className="row">
          <div className="col-sm-12 title-row">
            <h1>To Do App</h1>
          </div>
        </div> 
        <div className="row add-todo-row">
          <div className="col-sm-1"></div>
          <div className="col-sm-9">
            <input type="text" className="form-control add-input"  value={this.state.newTitle} onChange={this.titleChange}  onKeyPress={this.hitEnter} />
            </div>
           <div className="col-sm-2">
             <button className="btn btn-primary btn-add" onClick={this.createTodo}>Add</button>
          </div>
          </div>
          <div className="row todo-list">{todosHtml}</div> 
      </div>
      ); 
  },
  createTodo: function(){
    // get new title 
    var title = this.state.newTitle;
    // clear the text box
    this.setState({ newTitle: ''});
    // tell controller to add todo
    this.props.controller.addTodo(title);
  }, 
  titleChange: function (event){
    this.setState({
      newTitle: event.target.value
    });
  },
  hitEnter: function(event){
    if (event.which === 13) {
      this.createTodo();
    }
  }
});

module.exports = todoView;




// step 1 get initial state  creates starting point 
// step 2 get display it as the value of the text box
// when the value of the texbox changes 
// the input new value gets passed in to the function
// then the view is re-rendered, thus input box gets new value

// import Backbone from 'backbone';
// import TodoItemView from '../views/r_todoItemView';
// import ReactDOM from 'react-dom';
// import React from 'react';

// var TodoView = Backbone.View.extend({
//   el: '.todo-container',
//   events: {
//     'click .btn-add': 'addTodo' //,
//     //'keypress .add-input': 'addKeypress'
//   },
//   initialize: function(todos, controller){
//     this.controller = controller;
//     this.render(todos);
//   },
//   render: function(todos){
      
//     //redner each todo item
//     var controller = this.controller;
//     var todosHtml = todos.map(function(todo, index){
//       todo.id = index + 1;
//       return <TodoItemView key={index} item={todo} controller={controller} />;
//     });
//     ReactDOM.render(
//       <div>{todosHtml} </div>, 
//       this.$el.find('.todo-list') [0]
//       );
  
//     // var renderedTodos = todos.map(function(item, index){
//     //   item.id = index + 1;
//     //   //var view = new bbTodoItemView(item, contoller);
//     //   return view.$el;
//     // });
//     // // map always returns same amount of items it is mapping
//     // // map is a great way of translating one object to another
//     // //put all the todo items in the DOM
//     // this.$el.find('.todo-list').html(renderedTodos);
//   },
//   removeHandlers: function(){
//     this.$el.find('.btn-add').off();
//     this.$el.find('.add-input').off();
//   },
//   addTodo: function(){
//     var newTitle = this.$el.find('.add-input').val();
//     this.$el.find('.add-input').val('');
//     this.contoller.addTodo(newTitle);
//   },
//   addKeypress: function(event){
//     var newTitle = this.$el.find('.add-input').val();
//     this.contoller.addKeypress(event, newTitle);
//   }
// });

// module.exports = TodoView;
