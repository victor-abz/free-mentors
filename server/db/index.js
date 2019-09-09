import { Pool } from 'pg';
import dotenv from 'dotenv';
// import { User } from '../models/userAuth';
import Helper from '../helpers/helper';

dotenv.config();

const con = new Pool({
  connectionString: process.env.DATABASE_URL,
});

con.on('connect', () => {
  console.log('connected to the db');
});


class Database {
  async addUser(data, res) {
    const hashPassword = Helper.hashPassword(data.password);
    const newUser = await con.query(`Insert into 
    users(
      firstName, 
      lastName, 
      email, 
      password, 
      address, 
      bio, 
      occupation, 
      expertise, 
      role) 
    values(
      '${data.firstName}',
      '${data.lastName}',
      '${data.email}',
      '${hashPassword}',
      '${data.address}',
      '${data.bio}',
      '${data.occupation}',
      '${data.expertise}',
      'user'
        ) returning firstName, 
        lastName, 
        email,  
        address, 
        bio, 
        occupation, 
		expertise`);

    return Helper.handleSuccess(res, 201, 'User created successfully', newUser.rows[0]);
  }

  async loginUser(data, res) {
    const userFound = await this.findByProp('users', 'email', data.email);
    const userExist = userFound.rows[0];

    if (!Helper.comparePassword(userExist.password, data.password)) {
      return Helper.handleError(res, 400, 'The credentials you provided is incorrect');
    }

    const payload = {
      email: userExist.email,
      userId: userExist.userId,
      role: userExist.role,
    };

    const token = Helper.generateToken(payload);
    return Helper.handleSuccess(res, 200, 'User is successfully logged in', token);
  }

  async findAll(table, res) {
    const result = await con.query(`SELECT * FROM ${table}`);
    return Helper.handleSuccess(res, 200, `All ${table} Fetched`, result.rows);
  }

  async findByProp(table, column, value) {
    const result = await con.query(`SELECT * FROM ${table} WHERE ${column}='${value}'`);
    return result;
  }

  async changeToMentor(role, id, res) {
    const alreadyMentor = await this.findByProp('users', 'userId', (parseInt(id)));
    const index = alreadyMentor.rows[0];
    if (index.role === 'mentor') {
      return Helper.handleError(res, 400, 'Already a Mentor');
    }
    const result = await con.query(`UPDATE users SET role = '${role}' WHERE userid = ${id};`);
    return Helper.handleSuccess(res, 200, 'User account changed to mentor', result.rows[0]);
  }


  async findUsers(table, column, value) {
    const result = await con.query(`SELECT COUNT(1) FROM ${table} WHERE ${column} = '${value}';`);
    return result;
  }
  // async addSession(data) {
  // 	const newSession = await con.query(`Insert into sessions
  //		 (mentorId, menteeId, questions, menteeEmail, status) values(
  // 		'${data.mentorId}',
  // 		'${data.menteeId}',
  // 		'${data.questions}',
  // 		'${data.menteeeEmail}',
  // 		'${data.status}'
  // 	) returning *`);
  // 	return newSession;
  // }
  // async updateSession(status, id) {
  // 	const result = await con.query(`UPDATE sessions SET status = '${status}' WHERE sessionId = ${id};`);
  // 	return result;
  // }

  async createTables() {
    await con.query(`
            CREATE TABLE IF NOT EXISTS USERS (userId SERIAL,firstName VARCHAR(250),lastName VARCHAR(250),email VARCHAR(250), password VARCHAR(250), address VARCHAR (30), bio VARCHAR(250), occupation VARCHAR(250), expertise VARCHAR(250), role VARCHAR(250),PRIMARY KEY(userId));

            CREATE TABLE IF NOT EXISTS SESSIONS (sessionId SERIAL,menteeId INTEGER REFERENCES users(userId) ON DELETE CASCADE,mentorId INTEGER REFERENCES users(userId) ON DELETE CASCADE,menteeEmail VARCHAR(300),status VARCHAR(250),PRIMARY KEY (sessionId));

            CREATE TABLE IF NOT EXISTS REVIEWS (sessionId INTEGER REFERENCES sessions(sessionId) ON DELETE CASCADE,menteeId INTEGER REFERENCES users(userId) ON DELETE CASCADE,mentorId INTEGER REFERENCES users(userId) ON DELETE CASCADE,menteefirstName VARCHAR(300),menteelastName VARCHAR(300),remark VARCHAR(300));
        `);

    const result = await this.findUsers('users', 'email', 'admin@freementors.com');
    if (result.rows[0].count === '0') {
      const payload = {
        firstName: 'admin',
        lastName: 'test',
        email: 'admin@freementors.com',
        password: 'mentor',
        address: 'Kigali',
        bio: 'Passionate about IT',
        occupation: 'Developer',
        expertise: 'Node Js, Javascript, PostgreSQL',
      };
      await this.addUser(payload);
    }
  }
}


export default Database;
