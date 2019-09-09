import Helper from '../helpers/helper';
import Db from '../db';

const mentorController = {

  getMentors: async (req, res) => {
    const result = await new Db().findByProp('users', 'role', 'mentor');
    return Helper.handleSuccess(res, 200, 'You are viewing all Mentors', result);
  },
  getMentor: async (req, res) => {
    const { mentorId } = req.params;
    const rows = await new Db().findByMultipleProp('users', 'userId', mentorId, 'role', 'mentor');
    if (!rows) {
      return Helper.handleError(res, 404, 'Mentor Not Found');
    }
    return Helper.handleSuccess(res, 200, `You are viewing Mentor with ID ${mentorId}`, rows);
  },

};

export default mentorController;
