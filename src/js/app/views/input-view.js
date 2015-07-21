define(['jquery', 'underscore', 'backbone', 'Marionette', 'stache!../templates/input', '../models/main-model'],
  function ($, _, Backbone, Marionette, InputTemplate, Model) {
    return MainView = Marionette.LayoutView.extend({
      template: InputTemplate,
      events: {
        'click .get-results': 'buildInput'
      },
      buildInput: function(){
        var data = {};
        var inputs = this.$el.find('input[type="text"]');
        this.model = new Model();
        for (var i = inputs.length - 1; i >= 0; i--) {
          var el = $(inputs[i]);
          var key = el.prop('class');
          var val = el.val();
          if (val !== undefined) {
            data[key] = val;
          }
        }
        var inputsCheck = this.$el.find('input:checked');
        var genderEl = $(inputsCheck);
        data['gender'] = genderEl.val();
        return this.validateInput(data);
      },
      calculateBMR: function(data){
        var BMR, desiredBMR, baseBMR, desiredBaseBMR, inches;
        inches = (12 * +data.feet) + +data.inches;
        if (data.gender === 'male') {
          BMR = 66 + (6.23 * +data.currWeight) + (12.7 * inches) - (6.8 * +data.age);
          desiredBMR = 66 + (6.23 * +data.goalWeight) + (12.7 * inches) - (6.8 * +data.age);
        }
        if (data.gender === 'female') {
          BMR = 655 + (4.35 * +data.currWeight) + (4.7 * inches) - (4.7 * +data.age);
          desiredBMR = 655 + (4.35 * +data.goalWeight) + (4.7 * inches) - (4.7 * +data.age);
        }
        baseBMR = BMR * 1.2;
        desiredBaseBMR = desiredBMR * 1.2;
        data.baseBMR = baseBMR;
        data.desiredBaseBMR = desiredBaseBMR;
        return data;
      },
      buildOutput: function(data){
        var newWeight = 0, currentWeight = 0, weeklyBurned, weeklyPounds, currentWeek = 0, output = [], week = [];
        currentWeight = +data.currWeight;
        newWeight = +data.goalWeight;
        while (newWeight < currentWeight){
          weeklyBurned = this.buildWeeklyBurn(data);
          weeklyPounds = weeklyBurned/3500;
          currentWeight = currentWeight - weeklyPounds;
          data.currWeight = currentWeight;
          data = this.calculateBMR(data);
          currentWeek = currentWeek + 1;
          week.push(currentWeek);
          week.push(+data.baseBMR.toFixed(0));
          week.push(weeklyBurned);
          week.push(weeklyPounds.toFixed(2));
          week.push(currentWeight.toFixed(2));
          output.push(week);
          week = [];
        }
        this.model.set('table', output);
      },
      buildWeeklyBurn: function(data){
        var numDays, weeklyTotal = 0;
        numDays = +data.burnDays;
        for (var i = 0; i < numDays; i++) {
          weeklyTotal = weeklyTotal + Math.floor(Math.random() * (+data.maxBurned - +data.minBurned)) + +data.minBurned;
        }
        return weeklyTotal;
      },
      validateInput: function(data){
        this.buildOutput(data);
        Backbone.trigger('show:results', this.model)
      }
    });
  }
);