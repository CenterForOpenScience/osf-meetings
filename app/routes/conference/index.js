import Ember from 'ember';

export default Ember.Route.extend({
    model(params) {
        return Ember.RSVP.hash({
            conf : this.store.find('conference', params.conference_id),
            submissions : this.store.query('submission', {conference: params.conference_id})
        });
    },
    actions: {
    	download(uri) {
		  var link = document.createElement("a");
		  link.download = '';
		  link.href = uri;
		  link.click();
		}
    }
});
