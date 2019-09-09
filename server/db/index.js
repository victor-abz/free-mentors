import { Pool } from 'pg';
import dotenv from 'dotenv';
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
    const {firstName, lastName, email, password, address, bio, occupation, expertise} = data
    const hashPassword = Helper.hashPassword(password);
    const newUser = await con.query(`INSERT INTO
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
    VALUES(
      '${firstName}',
      '${lastName}',
      '${email}',
      '${hashPassword}',
      '${address}',
      '${bio}',
      '${occupation}',
      '${expertise}',
      'user'
        ) RETURNING firstName, lastName,email,  address, bio, occupation, expertise`);
    
    const {rows: result} = newUser;

    return Helper.handleSuccess(res, 201, 'User created successfully', result);
  }

  async loginUser(data, res) {
    const {email, password: inputPassword} = data
    const {rows} = await this.findByProp('users', 'email', email);
    const [{userid: userId, password, role}] = rows

    if (!Helper.comparePassword(password, inputPassword)) {
      return Helper.handleError(res, 400, 'The credentials you provided is incorrect');
    } 
    const payload = {userId, email, role };

    const token = Helper.generateToken(payload);
    return Helper.handleSuccess(res, 200, 'User is successfully logged in', token);
  }

  async findAll(table, res) {
    const {rows: result} = await con.query(`SELECT * FROM ${table}`);
    return Helper.handleSuccess(res, 200, `All ${table} Fetched`, result);
  }

  async findByProp(table, column, value) {
    const {rows: result} = await con.query(`SELECT * FROM ${table} WHERE ${column}='${value}'`);
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

  async createTables() {
    await con.query(`
            CREATE TABLE IF NOT EXISTS USERS (userId SERIAL,firstName VARCHAR(250),lastName VARCHAR(250),email VARCHAR(250), password VARCHAR(250), address VARCHAR (30), bio VARCHAR(250), occupation VARCHAR(250), expertise VARCHAR(250), role VARCHAR(250),PRIMARY KEY(userId));

            CREATE TABLE IF NOT EXISTS SESSIONS (sessionId SERIAL,menteeId INTEGER REFERENCES users(userId) ON DELETE CASCADE,mentorId INTEGER REFERENCES users(userId) ON DELETE CASCADE,menteeEmail VARCHAR(300),status VARCHAR(250),PRIMARY KEY (sessionId));

            CREATE TABLE IF NOT EXISTS REVIEWS (sessionId INTEGER REFERENCES sessions(sessionId) ON DELETE CASCADE,menteeId INTEGER REFERENCES users(userId) ON DELETE CASCADE,mentorId INTEGER REFERENCES users(userId) ON DELETE CASCADE,menteefirstName VARCHAR(300),menteelastName VARCHAR(300),remark VARCHAR(300));
        `);

    const result = await this.findUsers('users', 'email', process.env.ADMIN_MAIL);
    if (result.rows[0].count === '0') {
      const payload = {
        firstName: 'admin',
        lastName: 'test',
        email: process.env.ADMIN_MAIL,
        password: process.env.ADMIN_PW,
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
