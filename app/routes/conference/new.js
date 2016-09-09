import Ember from 'ember';
import config from 'ember-get-config';


export default Ember.Route.extend({

    model() {
        return Ember.RSVP.hash({
                meta : Ember.$.ajax({
                url : config.providers.osfMeetings.apiUrl + "conferences/",
                type : "OPTIONS",
                xhrFields : {
                    withCredentials : true
                },
                crossDomain : true
            }),
            newConf : this.store.createRecord('conference'),
            previewUpload : this.store.createRecord('upload')
        });
    },

    actions: {
        preview(conference, fullPreview, previewUpload){
            previewUpload.set('file', fullPreview);
            conference.set('logo', previewUpload);
            conference.set('preview', true);
            this.transitionTo('conference.new.preview', conference);
        },
        back() {
            this.transitionTo('index').then(function(newRoute) {
                newRoute.controller.set('visited', true);
            });
        },
        saveConference(newConference, drop, resolve) {
            var router = this;
            newConference.set('logo', null);
            newConference.save().then((conf) => {
                if(resolve){
                    this.toast.info('Uploading file...', '', {
                        progressBar: false,
                        timeOut: 0,  // doesn't timeout
                    });
                    resolve();
                } else{
                    router.transitionTo('conference.index', conf.get('id'));
                }
            });
        },
        success(dropZone, file, successData) {
            var conf = this.currentModel.newConf;
            var router = this;
            this.store.findRecord('upload', successData.id).then((newUpload) => {
                conf.set('logo', newUpload);
                conf.save().then( ()=>{
                    this.toast.clear();
                    router.transitionTo('conference.index', conf.get('id'));
                });
            });
        },
        count(){
            //console.log('Got one');
            let maxLength = 500;
            let remainder = maxLength -Ember.$('#description').val().length;
            if ((remainder < 0) || (remainder > 470)){
                Ember.$('#remaining').css({"color" : "red"});
            }
            else {
                Ember.$('#remaining').css({'color' : 'green'});
            }
            Ember.$('#remaining').text(remainder);
        },
        preUpload(drop){
            drop.on('processing', function() {
                this.options.url = config.providers.osfMeetings.uploadsUrl;
                var csrftoken = Ember.get(document.cookie.match(/csrftoken\=([^;]*)/), "1");
                this.options.headers = {
                    'X-CSRFToken': csrftoken,
                };
                this.options.withCredentials = true;
            });
        }
    } 
});
