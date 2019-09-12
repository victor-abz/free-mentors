import dotenv from 'dotenv';
import Db from '../../db/'
dotenv.config();
const data = {
    mentor: {
        firstName: 'mentor',
        lastName: 'the mentor',
        email: 'mentor@freementors.com',
        password: 'mentor123',
        address: 'Kigali',
        bio: 'Never Give up',
        occupation: 'Developer',
        expertise: 'Node Js, Javascript, PostgreSQL',
    },
    mentor2: {
        firstName: 'mentor2',
        lastName: 'the mentor',
        email: 'javamentor@freementors.com',
        password: 'mentor123',
        address: 'Kigali',
        bio: 'Never Give up',
        occupation: 'Developer',
        expertise: 'Node Js, Javascript, PostgreSQL',
    },
    mentor3: {
        firstName: 'mentor3',
        lastName: 'the mentor',
        email: 'nodementor@freementors.com',
        password: 'mentor123',
        address: 'Kigali',
        bio: 'Never Give up',
        occupation: 'Developer',
        expertise: 'Node Js, Javascript, PostgreSQL',
    },
    mentee: {
        firstName: 'mentee',
        lastName: 'the mentor',
        email: 'user@freementors.com',
        password: 'mentor123',
        address: 'Kigali',
        bio: 'Passionate about IT',
        occupation: 'Developer',
        expertise: 'Node Js, Javascript, PostgreSQL',
    },

    mentee2: {
        firstName: 'yussf',
        lastName: 'Ali',
        email: 'greatman@gmail.com',
        password: 'mentor123',
        address: 'Kigali',
        bio: 'Passionate about IT',
        occupation: 'Developer',
        expertise: 'Node Js, Javascript, PostgreSQL',
      },
    makeAdmin: async()=> {
    await new Db().changeToMentor('admin', '1')
    },
    makeMentor: async()=> {
        await new Db().changeToMentor('mentor', '2')
        await new Db().changeToMentor('mentor', '3')
        await new Db().changeToMentor('mentor', '4')
    },

    sessionData: {
        mentorId : 2,
  		questions: 'How to run Node',
    },

    sessionData2: {
        mentorId : 2,
  		questions: 'How to Honor codes',
    },
    sessionData3: {
        mentorId : 4,
  		questions: 'how to install Joi',
    },
    sessionData4: {
        mentorId : 3,
  		questions: 'how to install Joi',
    },

    userData: {
        userId: 5, 
        email:'user@freementors.com',
        fullName: 'mentee the Mentor'
    },
    reviewData: {
        score: 1,
        remark: 'You were late, very late!!'
    },
    userlogin: {
        email: 'greatman@gmail.com',
        password: 'mentor123',
    },
    adminlogin: {
        email: 'admin@freementors.com',
        password: 'mentor123',
    },
    signup: {
        'firstName': 'mentor',
        'lastName': 'mentor',
        'email': 'xyzr@freementors.com',
        'password': 'mentor123',
        'address': 'Kigali',
        'bio': 'Never Giveup',
        'occupation': 'Developer',
        'expertise': 'Node Js, Javascript, PostgreSQL',
    }
  }

  export default data;