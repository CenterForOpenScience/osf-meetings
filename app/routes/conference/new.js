import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Route.extend({
    model() {
        return Ember.RSVP.hash({
            meta : Ember.$.ajax({
                url : config.meetingsUrl + "/conferences/",
                type : "OPTIONS",
                xhrFields : {
                    withCredentials : true
                },
                crossDomain : true
            }),
            newConf : this.store.createRecord('conference'),
            user : this.store.findRecord('user', 'me')
        });
    },

    actions: {
        back() {
            this.transitionTo('index').then(function(newRoute) {
                newRoute.controller.set('visited', true);
            });
        },
        saveConference(newConf) {
            var router = this;
            newConf.save().then(function(params) {
                router.transitionTo('conference.index', params.id);
            });
            var dz = router.controller.get('dropzone');
            dz.processQueue();
        }
    }
});
