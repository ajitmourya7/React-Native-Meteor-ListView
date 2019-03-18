import { Meteor } from 'meteor/meteor';
import {Accountsdata} from './collections';
Meteor.startup(() => {
  // code to run on server at startup
  //   console.log(Accountsdata.find({}).fetch())
});
Meteor.publish('Accounts', function () {
    return Accountsdata.find({})
});

Meteor.methods({
    'update': function (value) {
        if (value.status === 'premium'){
            return Accountsdata.update({_id: value._id}, {$set: {status:"normal"}})
        }else{
            return Accountsdata.update({_id: value._id}, {$set: {status:"premium"}})
        }
    }
});