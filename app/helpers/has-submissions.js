import Ember from 'ember';

export function hasSubmissions(params) {
    var submissions = params[0];
    var length = submissions.get('length');
    console.log(length);
    return length;
}

export default Ember.Helper.helper(hasSubmissions);
