

// base framework
import $ from 'jquery';

// legacy loading for bootstrap javascript
window.$ = window.jQuery = $;
require('bootstrap');

// // import our styles
import './stylesheets/base.scss';
import navbar from './components/navbar';
import todoController from './pages/todo';
import newProjectController from './pages/newProject';
import canvasController from './pages/canvas';
import bbTodoController from './pages/bb_todo';
import homePageController from './pages/homePage';
import photoSearchController from './pages/photoSearch';
import rTodoController from './pages/r_todo';


//import multimediaController from './pages/multimedia';

// on document load
$(function(){
  // Kick off the app! 
  console.log('%c App Started', 'color:green');


  navbar.init();
    // My first Router: which page are we on?
  switch(window.location.pathname){
  case '/pages/todo.html':
    todoController.init();
    break;
  case '/pages/newProject.html':
    newProjectController.init();
    break;
  case '/pages/canvas.html':
    canvasController.init();
    break;
  case '/pages/bb_todo.html':
    new bbTodoController();
    break;
  case '/':
    homePageController.init();
    break;
  case '/pages/dataTest.html':
    new photoSearchController();
    break;
  case '/pages/r_todo.html':
    new rTodoController();
    break;
  }

  console.log ('+++======+++');
  console.log ('Yo, Hire me');
  
});


// console.log ('+++======+++')
// console.log ('')
// };

    // if (window.location.pathname === '/pages/todo.html'){
    //   todoController.init();
    // } else if (window.location.pathname === '/pages/newProject.html'){
    //   newProjectController.init();
    //   console.log('multmedia page has started ');
    // } else if (window.location.pathname === '/pages/canvas.html'){
    //   canvasController.init();
    //   console.log('canvas page has started ');
    // } 
    //todo.init();  this is underscore template
  // // set default template settings
  // _.templateSettings = {
  //   evaluate:    /{{([\s\S]+?)}}/g,
  //   interpolate: /{{-([\s\S]+?)}}/g,
  //   escape:      /{{=([\s\S]+?)}}/g
  // };
  // launch nav bar

