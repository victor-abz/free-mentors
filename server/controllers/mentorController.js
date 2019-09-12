import mentorModel from '../models/mentors';
import Helper from '../helpers/helper';
import Db from '../db';

const mentorController = {

  getMentors: async (req, res) => {
    const result = await new Db().findByProp('users', 'role', 'mentor');  
    result.forEach(mentor => {
      delete mentor.password
    });
    return Helper.handleSuccess(res, 200, 'You are viewing all Mentors', result);
  },
  getMentor: async (req, res) => {
    const result = await new Db().findByMultipleProp('users','userId', req.params.mentorId, 'role', 'mentor');
    const {0: ment} = result
    var copied = Object.assign({}, ment);
    delete copied.password;
    return Helper.handleSuccess(res, 200, 'Success', copied);
  }

};

export default mentorController;
