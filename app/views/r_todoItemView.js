import React from 'react';

var ItemView = React.createClass({
  getInitialState: function(){
    return{ editing: false };
  },
  // describes the data types of properties 
  propTypes: {
    item: React.PropTypes.object.isRequired,
    controller: React.PropTypes.object.isRequired
  },
  // Everything calls render to start
  render: function(){
    var baseClasses = 'todo';
    if (this.props.item.completed){
      baseClasses += ' completed';
    }
      //class need to be "className"
    return (
      <div className={baseClasses}>
        <div className="col-sm-1">{this.props.item.id}</div>
        { this.state.editing !== true &&
        <div className="col-sm-7 todo-title">{this.props.item.title}</div>
        }
        { this.state.editing == true &&
        <div className="col-sm-7 todo-title-edit ">
          <input className="title-edit-input" type="text" defaultValue={this.props.item.title}/>
        </div>
        }
        <div className="col-sm-1">
          { this.props.item.completed === 1 &&
            // on change is an old HTML handler method
          <input type="checkbox" checked onChange={this.toggleCheckbox} />
          }
          { this.props.item.completed === 0 &&
          <input type="checkbox" checked onChange={this.toggleCheckbox} /> 
          }
        </div>
        <div className="col-sm-2">
        { this.state.editing !== true &&
          <button className="btn btn-default edit" onClick={this.editTodo}>EDIT</button>
        }
        { this.state.editing == true &&
        <button className="btn btn-primary save " onClick={this.saveTodo}>SAVE</button>
        }

        </div>
        <div className="col-sm-1"> 
        <button type="button" className="close" aria-label="Close" onClick={this.removeTodo}>
          <span aria-hidden="true">&times;</span>
        </button>    
       </div> 
      </div>  

    );
  },
  toggleCheckbox: function(){
    this.props.controller.changeComplete(this.props.item.id);
  },
  removeTodo: function(){
    this.props.controller.removeTodo(this.props.item.id);
  },
  editTodo: function(){
    this.setState({ editing: true });
  },
  saveTodo: function(){
    var newTitle = document.querySelector('.title-edit-input').value;
    this.setState({ editing: false });
    this.props.controller.editTodo(this.props.item.id, newTitle);
  }
});
 

module.exports = ItemView;










// import _ from 'underscore';
// import Backbone from 'backbone';
// import itemTemplate from 'text!./toDoItem.tpl';

// var todoItemView = Backbone.View.extend({
//   tagname: 'div', 
//   events: {
//     'click .close':'removeHandler',
//     'click .edit':  'editHandler',
//     'click .save':  'saveHandler',
//     'change input[type="checkbox"]': 'checkboxHandler',
//     'keypress input[type="text"]':  'returnHandler'
//   },
//   initialize: function(item, controller){
//     // compile the template
//     this.id = item.id;
//     this.controller = controller;
//     this.template = _.template(itemTemplate);
//     this.render(item);
//   },
//   render:function(item){
//     this.$el.html(this.template(item));
//   },
//   removeHandler: function(){
//     this.controller.removeTodo(this.id);
//   },
//   editHandler: function(){
//     // go into edit mode
//     this.$el.find('.edit').addClass('hidden');
//     this.$el.find('.save').removeClass('hidden');
//     this.$el.find('.todo-title').addClass('hidden');
//     this.$el.find('.todo-title-edit').removeClass('hidden');
//     // event handlers

//   },
//   saveHandler: function(){
//     var newTitle = this.$el.find('.todo-title-edit input').val();
//     this.controller.editTodo(this.id, newTitle);
//   }, 
//   checkboxHandler: function(){
//     this.controller.changeComplete(this.id);
//   },
//   returnHandler: function(event){
//     if (event.which === 13){
//       this.saveHandler();
//     }
//   }
// });

// module.exports = todoItemView;

// // editTodo: function(id, newTitle){
// //     var todos = this.get('todos');
     
// //    }
