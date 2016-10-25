var $ = window.$;
import Backbone from 'backbone';

var model = Backbone.Model.extend({
  fetch: function(searchQuery, callback){
    $.ajax({
        method: 'GET',
        data: {
          method: 'flickr.photos.search',
          api_key: '731717db25329eb6aa65703cb6b71970',
          text: searchQuery,
          format: 'json'
        },
        url: 'https://api.flickr.com/services/rest',
        complete: function(resp){
          callback(resp);
        }
    });
  }
});

module.exports = new model;