define(['jquery', 'underscore', 'backbone', 'Marionette', 'stache!../templates/output'],
  function ($, _, Backbone, Marionette, OutputTemplate) {
    return MainView = Marionette.LayoutView.extend({
      template: OutputTemplate
    });
  }
);