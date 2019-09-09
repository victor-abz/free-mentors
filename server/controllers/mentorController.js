import Helper from '../helpers/helper';
import Db from '../db';

const mentorController = {

  getMentors: async (req, res) => {
    const result = await new Db().findByProp('users', 'role', 'mentor');
    return Helper.handleSuccess(res, 200, 'You are viewing all Mentors', result);
  },
  // Getting one mentor
  getMentor: (req, res) => {
    mentorModel.findMentor(req.params.mentorId, res);
  },

};

export default mentorController;
