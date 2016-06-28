var knex = require('./knex');
module.exports = {
  findUserById: function(profileId){
    return knex('user').select().where({google_id: profileId.id}).first().then(function(data) {
      console.log(data);
    });

  },
  createUser: function(profileId){
    return knex('user').insert({first_name: profileId.name.givenName,
                                last_name: profileId.name.familyName,
                                username: profileId.emails[0].value,
                                avatar: profileId.photos[0].value,
                                google_id: profileId.id})

    }
};
