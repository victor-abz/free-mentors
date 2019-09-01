// import Helper from '../helpers/helper';


// class User {
//   //
//   constructor() {
//     this.users = [
//       {
//         userId: 1,
//         firstName: 'admin',
//         lastName: 'test',
//         email: 'admin@freementors.com',
//         password: '$2b$08$GJqUT02XgD.4JEyQzIF2zufHCGRpbJrWwZhXBdSQBVTRYp9L3qb2q',
//         address: 'Kigali',
//         bio: 'Passionate about IT',
//         occupation: 'Developer',
//         expertise: 'Node Js, Javascript, PostgreSQL',
//         role: 'admin',
//       },
//       {
//         userId: 2,
//         firstName: 'mentor',
//         lastName: 'testee',
//         email: 'mentor@freementors.com',
//         password: '$2b$08$GJqUT02XgD.4JEyQzIF2zufHCGRpbJrWwZhXBdSQBVTRYp9L3qb2q',
//         address: 'Uganda',
//         bio: 'Failed I am not a robot test',
//         occupation: 'Software Engineer',
//         expertise: 'Php,Node Js, Javascript, SQL',
//         role: 'mentor',
//       },
//       {
//         userId: 3,
//         firstName: 'mentee',
//         lastName: 'tester',
//         email: 'mente@freementors.com',
//         password: '$2b$08$GJqUT02XgD.4JEyQzIF2zufHCGRpbJrWwZhXBdSQBVTRYp9L3qb2q',
//         address: 'Kigali-Rwanda',
//         bio: 'EveryThing',
//         occupation: 'Developer',
//         expertise: 'Googling, Node Js, Javascript, SQL',
//         role: 'user',
//       },
//     ];
//   }

//   //
//   createUser(data) {
//     const userExist = this.users.find((oneUser) => oneUser.email === data.email);
//     if (userExist !== undefined) {
//       return 'Email exists';
//     } if (!data.email || !data.password) {
//       return 'Some values are missing';
//     }
//     if (!Helper.isValidEmail(data.email)) {
//       return 'Please enter a valid email address';
//     }
//     const hashPassword = Helper.hashPassword(data.password);
//     // Create a new User
//     const newUser = {
//       userId: this.users.length + 1,
//       firstName: data.firstName,
//       lastName: data.lastName,
//       email: data.email,
//       password: hashPassword,
//       address: data.address,
//       bio: data.bio,
//       occupation: data.occupation,
//       expertise: data.expertise,
//       role: 'user',
//     };
//     this.users.push(newUser);
//     return newUser;
//   }
//   // Login user

//   loginUser(data) {
//     if (!data.email || !data.password) {
//       return 'Some values are missing';
//     } if (!Helper.isValidEmail(data.email)) {
//       return 'Please enter a valid email address';
//     }
//     const userExist = this.users.find((oneUser) => oneUser.email === data.email);

//     if (userExist === undefined) {
//       return 'The Email you provided is incorrect';
//     }
//     if (!Helper.comparePassword(userExist.password, data.password)) {
//       return 'The credentials you provided is incorrect';
//     }
//     return userExist;
//   }

//   //
//   findUser(userId) {
//     return this.users.find((oneUser) => oneUser.userId === parseInt(userId, 10));
//   }

//   //
//   findUsers() {
//     return this.users;
//   }

//   // Change user to mentor
//   updateUser(userId, data) {
//     const user = this.findUser(userId);
//     const index = this.users.indexOf(user);
//     this.users[index].firstName = data.firstName || user.firstName;
//     this.users[index].lastName = data.lastName || user.lastName;
//     this.users[index].password = data.password || user.password;
//     this.users[index].address = data.address || user.address;
//     this.users[index].bio = data.bio || user.bio;
//     this.users[index].occupation = data.occupation || user.occupation;
//     this.users[index].expertise = data.expertise || user.expertise;
//     this.users[index].role = data.role || user.role;
//     return this.users[index];
//   }
//   // Update user all details

//   // Change user to mentor
//   updateUserDetails(userId, data) {
//     const user = this.findUser(userId);
//     const index = this.users.indexOf(user);
//     this.users[index].firstName = data.firstName || user.firstName;
//     this.users[index].lastName = data.lastName || user.lastName;
//     this.users[index].password = data.password || user.password;
//     this.users[index].address = data.address || user.address;
//     this.users[index].bio = data.bio || user.bio;
//     this.users[index].occupation = data.occupation || user.occupation;
//     this.users[index].expertise = data.expertise || user.expertise;
//     return this.users[index];
//   }

//   //
//   deleteUser(userId) {
//     const user = this.findUser(userId);
//     const index = this.users.indexOf(user);
//     this.users.splice(index, 1);
//   }
// }
// export default new User();
