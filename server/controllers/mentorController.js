import mentorModel from '../models/mentors';

const mentorController = {

  // Getting All data
  getMentors: (req, res) => {
    const mentors = mentorModel.findMentors();
    return res.status(200).json({
      status: 200,
      data: {
        mentors,
      },
    });
  },

  // Getting one mentor
  getMentor: (req, res) => {
    const mentor = mentorModel.findMentor(req.params.mentorId);
    if (!mentor) {
      return res.status(404).json({
        message: 'Mentor not found',
      });
    }
    return res.status(200).json({
      status: 200,
      data: {
        id: mentor.mentorId,
        firstName: mentor.firstName,
        lastName: mentor.lastName,
        email: mentor.email,
        password: mentor.password,
        address: mentor.address,
        bio: mentor.bio,
        occupation: mentor.occupation,
        expertise: mentor.expertise,
      },
    });
  },

};

export default mentorController;
