import Ember from 'ember';

export default Ember.Controller.extend({
  meetingTitle: 'Meeting Title',
  isRenaming: false,

  isValidTitle: Ember.computed.match('model.title', /.+/),
  isValidCity: Ember.computed.match('model.city', /.+/),
  isValidState: Ember.computed.match('model.state', /.+/),
  isValidCountry: Ember.computed.match('model.country', /.+/),
  isValid: Ember.computed.and('isValidCity', 'isValidState', 'isValidCountry', 'isValidTitle'),
  isDisabled: Ember.computed.not('isValid'),

  actions: {
    rename() {
      this.set('isRenaming', true);
    },
    saveName() {
      this.set('name',Ember.get(this,'meetingTitle'));
      this.set('isRenaming',false);
    }
  }
});


