import mentorModel from '../models/mentors';
import Helper from '../helpers/helper';
import Db from '../db';

const mentorController = {

  // Getting All data
  getMentors: async (req, res) => {
    const result = await new Db().findByProp('users', 'role', 'mentor');
    return Helper.handleSuccess(res, 200, 'You are viewing all Mentors', result);
  },

  // Getting one mentor
  getMentor: async (req, res) => {
    const result = await new Db().findByMultipleProp('users','userId', req.params.mentorId, 'role', 'mentor');
    return Helper.handleSuccess(res, 200, 'You are viewing all Mentors', result);
  }

};

export default mentorController;
