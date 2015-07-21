define(['jquery', 'underscore', 'backbone', 'Marionette'],
  function ($, _, Backbone, Marionette, Router) {
    return AppController = {
      emptyRoute: function(){
        console.log("No route");
      },
      goToResults: function(input){
        var decoded = decodeURIComponent(input);
        var parsed = JSON.parse(input);
        Backbone.trigger('trigger:results', parsed);
      }
    };
  }
);