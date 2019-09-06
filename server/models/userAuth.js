import Helper from '../helpers/helper';

class User {
  //
  constructor() {
    this.users = [
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
    ];
  }

  // Sign Up a new User
  createUser(data, res) {
    const hashPassword = Helper.hashPassword(data.password);
    // Create a new User
    const newUser = {
      userId: this.users.length + 1,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashPassword,
      address: data.address,
      bio: data.bio,
      occupation: data.occupation,
      expertise: data.expertise,
      role: 'user',
    };
    this.users.push(newUser);
    const payload = {

      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      address: newUser.address,
      bio: newUser.bio,
      occupation: newUser.occupation,
      expertise: newUser.expertise,
    };

    const token = Helper.generateToken(payload);

    const status = 201;
    const message = 'User created successfully';

    const result = { token, message: 'User created successfully' };

    return Helper.handleSuccess(res, status, message, result);

    // return token;
  }

  // Login user
  loginUser(data, res) {

    const allUsers = this.findUsers();
    const userExist = Helper.findObjectByProp(allUsers, 'email', data.email);

    if (!Helper.comparePassword(userExist.password, data.password)) {
      const status = 400;
      const error = 'The credentials you provided is incorrect';
      return Helper.handleError(res, status, error);
    }
    // return userExist;
    const payload = {
      email: userExist.email,
      userId: userExist.userId,
      role: userExist.role,
    };
    const token = Helper.generateToken(payload);
    const status = 200;
    const message = 'User is successfully logged in';
    const result = { token };

    return Helper.handleSuccess(res, status, message, result);
  }

  //

  findUser(checkAgainst, toFind) {
    const userList = this.findUsers();
    return Helper.findObjectByProp(userList, checkAgainst, toFind);

  }

  //
  findUsers() {
    return this.users;
  }

  // Change to mentor

  changeToMentor(role, user, res) {
    if (role === 'admin') {
      const allUsers = this.findUsers();
      const userExist = Helper.findObjectByProp(allUsers, 'userId', parseInt(user, 10));
      const index = this.users.indexOf(userExist);
      if (this.users[index].role === 'Mentor') {
        const status = 400;
        const error = 'The User is already a Mentor';
        return Helper.handleError(res, status, error);
      }
      this.users[index].role = 'Mentor';
      const status = 200;
      const message = 'User account changed to mentor';
      const result = { message: 'User account changed to mentor' };
      return Helper.handleSuccess(res, status, message, result);
    }
    const status = 401;
    const error = 'Insufficient provilege. Please sign in';
    return Helper.handleError(res, status, error);

  }
}
export default new User();
