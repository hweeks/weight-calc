define(['jquery', 'underscore', 'backbone', 'Marionette',
  'stache!../templates/main-view',
  '../views/input-view',
  '../views/output-view'],
  function ($, _, Backbone, Marionette, MainTemplate, InputView, OutputView) {
    return MainView = Marionette.LayoutView.extend({
      el: '#container',
      template: MainTemplate,
      regions: {
        header: '#header',
        body: '#body',
        footer: '#footer'
      },
      initialize: function(){
        this.listenTo(Backbone, 'show:results', this.showResults);
      },
      onRender: function(){
        var inputView = new InputView({
          model: this.model
        });
        this.body.show(inputView);
      },
      showResults: function(modelIn){
        var outputView = new OutputView({
          model: modelIn
        });
        this.body.show(outputView);
      }
    });
  }
);