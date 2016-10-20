
var $ = window.$;

import navbarTpl from 'text!../views/navbar.tpl';

var app = {
  init: function(){
    app.render();
  },
  render: function(){
    $('nav').html(navbarTpl);
  }
};

module.exports = app;