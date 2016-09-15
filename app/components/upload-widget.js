import Ember from 'ember';

export default Ember.Component.extend({
    toast : Ember.inject.service(),
    file : null,
    url: null,
    dropzoneOptions : {
        addRemoveLinks : true,
        uploadMultiple : false,
        xhrFields : { withCredentials : true },
        crossDomain : true
    },
    resolve : null,
    dropZone : null,
    fullPreview: null,
    actions : {
        preUpload() {
            var drop = arguments[1];
            var createThumbnailFromUrl = drop.createThumbnailFromUrl;
            var _this = this;
            drop.createThumbnailFromUrl = function(file, imageUrl, callback, crossOrigin){
                var fullPreview = createThumbnailFromUrl.apply(this, arguments);
                _this.set("fullPreview", fullPreview);
                return fullPreview;
            }
            this.set('dropZone', drop);
            this.sendAction('preUpload', drop);
            return new Ember.RSVP.Promise(resolve => {
                this.set('resolve', resolve);
            });
        },
        sending(_this, drop, file, xhr, form) {
            //Localhost expects a body form-data request
            //Waterbutler expects body raw request
            var uploadURL = drop.options.url;
            var _send = xhr.send;
            xhr.send = function() {
                if(uploadURL.indexOf('localhost') < 0) {
                    _send.call(xhr, file);
                } else {
                    form.append("file", file, file.name);
                    _send.call(xhr, form);
                }
            };
        },
        removedfile(_this, dropZone, file){
            this.set('resolve', null);
            this.sendAction('afterRemovedFile');
        },
        success(_this, dropZone, file, successData) {
            this.sendAction('success', dropZone, file, successData);
        },
        error() {
            //do toast here
            console.log('ERROR');
        },
        buildUrl(){
            return this.get('url');
        }
    }
});
