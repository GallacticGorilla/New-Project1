
var $ = window.$;
import _ from 'underscore';
import model from '../models/todoModel';
import view from 'text!../views/toDoItem.tpl';

var controller = {
  init:  function(){
    model.init();
    // cache some selectors
    controller.addButton = $('.btn-add');
    //compile template
    controller.compiledTemplate = _.template(view);
    controller.renderTemplates();
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
    // get the database (which is an array)
    // loop over each item in the database
    var compiledTodos = model.get().map(function(item, index){
      // creates an ID that is equal to its current index +1
      //+1 is to make it more human readable
      // id is required by our view
      item.id = index + 1;
      // Handlebars the second step
      // this is the step that we replace {{}} w/ actal value 
      return controller.compiledTemplate(item);
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
    $('.edit').off('click');
  },
  // add event handlers
  createEventHandlers: function(){
    controller.addButton.on('click', controller.addTodoHandler);
    $('input[type="checkbox"]').on('change', controller.checkedHandler);
    $('.close').on('click', controller.removeHandler);
    $('.edit').on('click', controller.editHandler);
    $('.add-input').on('keypress', controller.returnHandler);
  },// this is the event handler for the close x button
  // deletes the todo
  // Event Handler For the Edit button
  editHandler: function(event){
    // WHich item to edit
    var index = $(event.currentTarget).parent().parent().index();
    var $item = $('.todo').eq(index);
    // title text disapears
    $item.find('.todo-title').addClass('hidden');
    // text input appears
    $item.find('.todo-title-edit').removeClass('hidden');
    // edit button replaced by save button
    $item.find('.edit').addClass('hidden');
    $item.find('.save').removeClass('hidden');
    // make change when user clicks on "save" button
    $item.find('.save').on('click', controller.updateTitle);
    $item.find('.todo-title-edit input').on('keypress', controller.updateTitleKeyPress);
  },
  returnHandler: function(event){
    if (event.which === 13){
      controller.addTodoHandler(event);
    }
  },
      // handler to update title on Enter\
  updateTitleKeyPress: function(event){
    if (event.which === 13){
      controller.updateTitle(event);
    }
  },
  // save edit button handler
  updateTitle: function(event){
    var index = $(event.currentTarget).parent().parent().index();
    var $item = $('.todo').eq(index);
    $item.find('.save').off();
    $item.find('.todo-title-edit input').off();
    var newTodoTitle = $item.find('.todo-title-edit input').val();
    // update the database
    model.get()[index].title = newTodoTitle;
    model.save();
    controller.renderTemplates();
  },
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
    model.get()[index].completed = !model.get()[index].completed ; 
   // view updates aautomatically, Yay HTML! 
   // console.log(model[index]);
    model.save();
    controller.renderTemplates();

    //console.log (index);
    
    //console.log(event.target, event.curentTarget);  
  },
    // event handler for the "add" button
    // creates a new todo
  addTodoHandler: function(){
  // Create Var "newTitle" attribute to all "add-imput" cladd from DOM
  //.val querys the user input that has been typed in
  //if said value is blank '' then return then exit
    var newTitle = $('.add-input').val();
    if (newTitle === '') return;
    // model retrieves .get and .push returns the array to the title
    // model.git() returns the database [] 
    model.get().push({  
      title: newTitle,
      completed: false
    });
    //jquery access .add-input class from dom and retrieves user input 
    // clears text from the box
    $('.add-input').val('');
    // controler renders said input
    // updates the display
    controller.renderTemplates();
  }
};
//specifies what will be returned when this file is imported

module.exports = controller; 




