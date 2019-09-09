import mentorModel from '../models/mentors';
import Helper from '../helpers/helper';

import Helper from '../helpers/helper';


const mentorController = {

  // Getting All data
  getMentors: (req, res) => {
    const mentors = mentorModel.findMentors();
    const status = 200;
    const message = 'Fetched all mentors';
    return Helper.handleSuccess(res, status, message, mentors);
  },

  // Getting one mentor
  getMentor: (req, res) => {
    mentorModel.findMentor(req.params.mentorId, res);
  },

};

export default mentorController;
