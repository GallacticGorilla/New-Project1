
var $ = window.$;
var Handlebars = window.Handlebars;
import model from '../models/todoModel';
import view from 'text!../views/toDoItem.tpl';

var controller = {
  init:  function(){
    model.init();
    // cache some selectors
    controller.addButton = $('.btn-add');
    // compile todo  item template
    controller.compiledTemplate = Handlebars.compile(view);
    controller.renderTemplates();
    controller.addEventHandler();
  },
  // do visual stuff
  render: function(compiledTodos){
    // Remove Event Handlers
    controller.destroyEventHandlers();
    // CompiledToDos is an array
    // joining elements to string
    //putting the long string into the html element
    $('.todo-list').html(compiledTodos.join(''));
    // Adds event handlers
    // now that todos have been added to DOM
    controller.createEventHandlers();  
  },
  renderTemplates: function(){
    var compiledTodos = [];
    // get the database (which is an array)
    // loop over each item in the database
    model.get().forEach(function(item, index){
      // creates an ID that is equal to its current index +1
      //+1 is to make it more human readable
      // id is required by our view
      item.id = index + 1;
      // Handlebars the second step
      // this is the step that we replace {{}} w/ actal value 
      var renderedTodo = controller.compiledTemplate(item);
      // adds rendered todo to the list of todos 
      compiledTodos.push(renderedTodo);
      //console.log(renderedTodo);
    }); // end of for each
    // past list of todos to the rendered function
    controller.render(compiledTodos);
    // tell the model to save the data
   model.save();
  },
  //remove event handlers from app
  // In order to rerender
  destroyEventHandlers: function(){
    //console.log(1);
   controller.addButton.off();
    $('input[type="checkbox"]').off();
    $('.close').off();
  },
  // add event handlers
  createEventHandlers: function(){
    controller.addButton.on('click', controller.addTodoHandler);
    $('input[type="checkbox"]').on('change', controller.checkedHandler);
    $('.close').on('click', controller.removeHandler);  
  },// this is the event handler for the close x button
  // deletes the todo
  removeHandler: function(event){
    // which one was clicked
   var index = $(event.currentTarget).parent().parent().index();
    // update the data base 
    model.get().splice(index, 1);
    // update the view
    controller.renderTemplates();   
  },// event handler for the checkbox
  checkedHandler: function(event){
          // which checkbox?!?!
    var index = $(event.currentTarget).parent().parent().index();
          // update the database
    model.get()[index].completed = !model.get[index].completed ; 
     // view updates automatically, Yay HTML! 
     // console.log(model[index]);
      model.save();
    //console.log (index);
    
    //console.log(event.target, event.curentTarget);  
  },
  // event handler for the "add" button
  // creates a new todo
  addTodoHandler: function(){
    var newTitle = $('.add-input').val();
    if (newTitle === '') return;
    
     model.get().push({
      title: newTitle,
      completed: false
    });
    $('.add-input').val('');
    controller.renderTemplates();
  }
};

module.exports = controller; 



