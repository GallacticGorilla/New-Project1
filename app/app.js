

// base framework
import $ from 'jquery';

// legacy loading for bootstrap javascript
window.$ = window.jQuery = $;
require('bootstrap');

// // import our styles
import './stylesheets/base.scss';
import _ from 'underscore';
import todoController from './pages/todo';
import newProjectController from './pages/newProject';
import canvasController from './pages/canvas';


//import multimediaController from './pages/multimedia';

// on document load
$(function(){
  // Kick off the app! 
  console.log('%c App Started', 'color:green');

 
  // set default template settings
  _.templateSettings = {
    evaluate:    /{{([\s\S]+?)}}/g,
    interpolate: /{{-([\s\S]+?)}}/g,
    escape:      /{{=([\s\S]+?)}}/g
  };
    // My first Router: which page are we on?
  switch(window.location.pathname){
  case '/pages/todo.html':
    todoController.init;
    break;
  case '/pages/newProject.html':
    newProjectController.init;
    break;
  case '/pages/canvas.html':
    canvasController.init;
    break;
  }

console.log ('+++======+++');
console.log ('');
  
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

    // todo.init();

