import Helper from '../helpers/helper';

class Mentor {
  //
  constructor() {
    this.mentors = [
      {
        mentorId: 1,
        firstName: 'admin',
        lastName: 'test',
        email: 'admin@freementors.com',
        password: '$2b$10$C4V2ztmFdUA/SyFE2Z5YM.M4Twm2RBs26GClEbg75bxLoqY35reA2',
        address: 'Kigali',
        bio: 'Passionate about IT',
        occupation: 'Developer',
        expertise: 'Node Js, Javascript, PostgreSQL',
        role: 'mentor',
      },
      {
        mentorId: 2,
        firstName: 'mentor',
        lastName: 'testee',
        email: 'mentor@freementors.com',
        password: '$2b$10$702cBEuNoM2wGi8FO3nQJuskoSpexmgAi5Crdjn8SrGDzoWy7zkgm',
        address: 'Uganda',
        bio: 'Failed I am not a robot test',
        occupation: 'Software Engineer',
        expertise: 'Php,Node Js, Javascript, SQL',
        role: 'mentor',
      },
      {
        mentorId: 3,
        firstName: 'mentee',
        lastName: 'tester',
        email: 'mente@freementors.com',
        password: '$2b$10$oDAMuUdmqQFN2lVVroSqAOWZEXjsVGQtEwJy/Q4mu9shhryRdrCLO',
        address: 'Kigali-Rwanda',
        bio: 'EveryThing',
        occupation: 'Developer',
        expertise: 'Googling, Node Js, Javascript, SQL',
        role: 'mentor',
      },
    ];
  }

  // Function to find one mentor
  findMentor(data, res) {
    // return this.mentors.find((oneMentor) => oneMentor.mentorId === parseInt(mentorId, 10));
    const allUsers = this.findMentors();

    const userExist = Helper.findObjectByProp(allUsers, 'mentorId', parseInt(data, 10));


    if (userExist === undefined) {
      const status = 404;
      const error = 'Mentor Not Found';
      return Helper.handleError(res, status, error);
    }
    const status = 200;

    const message = `You are viewing Mentor with ID ${data}`;
    const result = userExist;
    return Helper.handleSuccess(res, status, message, result);
    // }

  }

  // Function to find all mentors
  findMentors() {
    return this.mentors;
  }
}
export default new Mentor();
