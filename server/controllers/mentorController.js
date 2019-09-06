import mentorModel from '../models/mentors';
import Helper from '../helpers/helper'

const mentorController = {

  // Getting All data
  getMentors: (req, res) => {
    const mentors = mentorModel.findMentors();
    const status = 200;
    return Helper.handleSuccess(res, status,'undefined', mentors);
  },

  // Getting one mentor
  getMentor: (req, res) => {
    mentorModel.findMentor(req.params.mentorId, res);
  },

};

export default mentorController;
