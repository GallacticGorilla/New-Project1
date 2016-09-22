
import lscache from 'lscache';
var $ = window.$;
var Handlebars = window.Handlebars;

var database =  [];
var model = {
  init: function(){
  var savedData = lscache.get('todos');
    if (savedData) {
  database = savedData;
    } else {
      database = [];
    }
  },
  save: function(){
   var dataToSave = JSON.stringify(database);
    lscache.ser('todos' , dataToSave);
  },
  get: function(){
  return database;
  }
};
var view = $('script[type="text/x-template"]').html();    
var controller = {
  init:  function(){
    
    model.init();
    // cache some selectors
    controller.addButton = $('.btn-add');
    // Alsways has start everything up
    controller.compiledTemplate = Handlebars.compile(view);
    controller.renderTemplates();
    controller.addEventHandler();
  },
  render: function(compiledTodos){
      //  always  render and initdo visual stuff
    controller.destroyEventHandlers();
    $('.todo-list').html(compiledTodos.join(''));
          controller.createEventHandlers();  
  },
  renderTemplates: function(){
    var compiledTodos = [];
    model.get().forEach(function(item, index){
      item.id = index + 1;
      var renderedTodo = controller.compiledTemplate(item);
      compiledTodos.push(renderedTodo);
      //console.log(renderedTodo);
    });
    controller.render(compiledTodos);
   model.save();
  },
  destroyEventHandlers: function(){
    //console.log(1);
   controller.addButton.off();
    $('input[type="checkbox"]').off();
    $('.close').off();
  },
  createEventHandlers: function(){
    controller.addButton.on('click', controller.addTodoHandler);
    $('input[type="checkbox"]').on('change', controller.checkedHandler);
    $('.close').on('click', controller.removeHandler);  
  },
  removeHandler: function(event){
    // which one was clicked
   var index = $(event.currentTarget).parent().parent().index();
    // update the data base 
    model.get().splice(index, 1);
    // update the view
    controller.renderTemplates();   
  },
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



