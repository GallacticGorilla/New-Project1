import lscache from 'lscache';

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
    lscache.set('todos' , dataToSave);
  },
  get: function(){
    return database;
  }
};

module.exports = model;