define(['jquery', 'underscore', 'backbone', 'Marionette'],
  function ($, _, Backbone, Marionette) {
    return AppRouter = Marionette.AppRouter.extend({
      appRoutes: {
        "": "emptyRoute",
        "*input": "goToResults"
      },
      initialize: function(){
        this.listenTo(Backbone, 'navigate', this.navigateTo);
      },
      navigateTo: function(input){
        this.navigate(input, {trigger:false});
      }
    });
  }
);