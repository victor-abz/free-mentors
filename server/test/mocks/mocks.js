// const testLogin = {
//     "email": "admin@freementors.com",
//     "password": "mentor",
// };
// const sessionData = {
//     questions:'sdfs',
//     mentorId:12
// }


// import Helper from '../helpers/helper';
// import checkData from '../middleware/checkData';


const mocks = {
  users: [
    {
      userId: 1,
      firstName: 'admin',
      lastName: 'test',
      email: 'admin@freementors.com',
      password: '$2b$08$GJqUT02XgD.4JEyQzIF2zufHCGRpbJrWwZhXBdSQBVTRYp9L3qb2q',
      address: 'Kigali',
      bio: 'Passionate about IT',
      occupation: 'Developer',
      expertise: 'Node Js, Javascript, PostgreSQL',
      role: 'admin',
    },
    {
      userId: 2,
      firstName: 'mentor',
      lastName: 'testee',
      email: 'mentor@freementors.com',
      password: '$2b$08$GJqUT02XgD.4JEyQzIF2zufHCGRpbJrWwZhXBdSQBVTRYp9L3qb2q',
      address: 'Uganda',
      bio: 'Failed I am not a robot test',
      occupation: 'Software Engineer',
      expertise: 'Php,Node Js, Javascript, SQL',
      role: 'mentor',
    },
    {
      userId: 3,
      firstName: 'mentee',
      lastName: 'tester',
      email: 'mente@freementors.com',
      password: '$2b$08$GJqUT02XgD.4JEyQzIF2zufHCGRpbJrWwZhXBdSQBVTRYp9L3qb2q',
      address: 'Kigali-Rwanda',
      bio: 'EveryThing',
      occupation: 'Developer',
      expertise: 'Googling, Node Js, Javascript, SQL',
      role: 'user',
    },
  ],
  testLogin: {
    email: 'admin@freementors.com',
    password: 'mentor',
  },
  falseTestLogin: {
    email: 'adminfreementors.com',
    password: 'mentor',
  },

  sessionData: {
    questions: 'sdfs',
    mentorId: 12,
  },

  reviewData: {
    score: 1,
    remark: 'Very Good',
  },

  testSignUp: {
    firstName: 'menthee',
    lastName: 'tester',
    email: 'menteh@freementors.com',
    password: 'mentor',
    address: 'Kigali-Rwanda',
    bio: 'EveryThing',
    occupation: 'Developer',
    expertise: 'Googling, Node Js, Javascript, SQL',
  },

  adminToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGZyZWVtZW50b3JzLmNvbSIsInVzZXJJZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTY3NzU2NTc3LCJleHAiOjE1NjgzNjEzNzd9.njnFaSYJx2t3sZQLP6PcSns1lu-491sHNTBMz8qXr9s',
  mentorToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1lbnRvckBmcmVlbWVudG9ycy5jb20iLCJ1c2VySWQiOjIsInJvbGUiOiJtZW50b3IiLCJpYXQiOjE1Njc3NTY2MzMsImV4cCI6MTU2ODM2MTQzM30.vBhJ0Am2eJeaVcpXujjAJyIBqaREChcGsrfdmSd8cXk',
  userToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1lbnRlQGZyZWVtZW50b3JzLmNvbSIsInVzZXJJZCI6Mywicm9sZSI6InVzZXIiLCJpYXQiOjE1Njc3NTY2ODQsImV4cCI6MTU2ODM2MTQ4NH0.yNfir8dPXJn1jMBw7hPlwGkcWXfnfuqcm0qjkLgsKW8',


};

export default mocks;
