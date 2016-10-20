
import _ from 'underscore';
import Backbone from 'backbone';
import itemTemplate from 'text!./toDoItem.tpl';

var todoItemView = Backbone.View.extend({
  tagname: 'div', 
  events: {
    'click .close':'removeHandler',
    'click .edit':  'editHandler',
    'click .save':  'saveHandler',
    'change input[type="checkbox"]': 'checkboxHandler',
    'keypress input[type="text"]':  'returnHandler'
  },
  initialize: function(item, controller){
    // compile the template
    this.id = item.id;
    this.controller = controller;
    this.template = _.template(itemTemplate);
    this.render(item);
  },
  render:function(item){
    this.$el.html(this.template(item));
  },
  removeHandler: function(){
    this.controller.removeTodo(this.id);
  },
  editHandler: function(){
    // go into edit mode
    this.$el.find('.edit').addClass('hidden');
    this.$el.find('.save').removeClass('hidden');
    this.$el.find('.todo-title').addClass('hidden');
    this.$el.find('.todo-title-edit').removeClass('hidden');
    // event handlers

  },
  saveHandler: function(){
    var newTitle = this.$el.find('.todo-title-edit input').val();
    this.controller.editTodo(this.id, newTitle);
  }, 
  checkboxHandler: function(){
    this.controller.changeComplete(this.id);
  },
  returnHandler: function(event){
    if (event.which === 13){
      this.saveHandler();
    }
  }
});

module.exports = todoItemView;

// editTodo: function(id, newTitle){
//     var todos = this.get('todos');
     
//    }
