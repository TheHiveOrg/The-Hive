
var knex = require('./knex');
module.exports = {
    findUserById: function(profileId) {
        return knex('users').select().where("google_id", profileId).first().then(function(data) {
            if (data) {
                return data.google_id;
            }
        });
    },
    createUser: function(profileId) {
        return knex('users').insert({
            first_name: profileId.name.givenName,
            last_name: profileId.name.familyName,
            username: profileId.emails[0].value,
            avatar: profileId.photos[0].value,
            google_id: profileId.id
        });

    }
};
