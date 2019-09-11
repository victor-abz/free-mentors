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
  async addUser(data) {
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
    const {rows} = newUser
    return rows;
  }

  async loginUser(data) {
    
    const {email, password: inputPassword} = data
    
    const rows = await this.findByProp('users', 'email', email);
    console.log(rows)
    const [{userid: userId, firstname, lastname, password, role }] = rows

    if (!Helper.comparePassword(password, inputPassword)) {
      return ('error');
    } 
    const fullName = `${firstname} ${lastname}`
    const payload = {userId,fullName, email, role };
    const token = Helper.generateToken(payload);
    return token;
  }

  async findAll(table) {
    const {rows: result} = await con.query(`SELECT * FROM ${table}`);
    return result

  }

  async findByProp(table, column, value) {
    const {rows: result} = await con.query(`SELECT * FROM ${table} WHERE ${column}='${value}'`);
    return result;
  }

  async findByMultipleProp(table, column1, value1, column2, value2) {
    const {rows: result} = await con.query(`SELECT * FROM ${table} WHERE ${column1}='${value1}' AND ${column2} = '${value2}'`);
    return result;
  }

  async changeToMentor(userRole, id) {
    
    const alreadyMentor = await this.findByProp('users', 'userId', (parseInt(id)));
    const {0: userFound } = alreadyMentor
    const {userid, role} = userFound
    if (role === 'mentor') {
      return ('mentor');
    }
    const result = await con.query(`UPDATE users SET role = '${userRole}' WHERE userid = ${id};`);
    const {0: rows} = result    
    return  rows;
  }


  async findUsers(table, column, value) {
    const result = await con.query(`SELECT COUNT(1) FROM ${table} WHERE ${column} = '${value}';`);
    return result;
  }

  async createSession(sessionData, userData) {
    const {mentorId, questions} = sessionData
    const {userId: menteeId, email:menteeEmail}  = userData
  	const newSession = await con.query(`Insert into sessions
  		 (mentorId, menteeId, questions, menteeEmail, status) values(
  		'${mentorId}',
  		'${menteeId}',
  		'${questions}',
  		'${menteeEmail}',
  		'pending'
    ) returning *`);
    const {rows: result} = newSession 
    return result;
  }


  async changeStatus(id, changeTo) {
    const result = await con.query(`UPDATE sessions SET status = '${changeTo}' WHERE sessionid = ${id};`);
    const {0: rows} = result    
    return  rows;
  }

  async createReview(reviewData, sessionId, userData) {
    const {score, remark} = reviewData
    const { fullName}  = userData
    const sessionData = await this.findByProp('sessions','sessionId', sessionId)
    const [{sessionid, menteeid, mentorid}] = sessionData
    console.log(sessionid, menteeid, mentorid)
  	const newReview = await con.query(`Insert into reviews
  		 (sessionId, mentorId, menteeId, score, menteeFullName, remark) values(
  		'${sessionid}',
  		'${mentorid}',
  		'${menteeid}',
  		'${score}',
      '${fullName}',
      '${remark}'
    ) returning *`);
    const {rows: result} = newReview 
    return result;
  }

  async deleteReview(id) {
    const result = await con.query(`DELETE FROM reviews where sessionId = ${id}`);
    const {0: rows} = result    
    return  rows;
  }


  async createTables() {
    await con.query(`
            CREATE TABLE IF NOT EXISTS 
            users (
              userId SERIAL PRIMARY KEY,
              firstName VARCHAR(250) NOT NULL,
              lastName VARCHAR(250),
              email VARCHAR(250) NOT NULL UNIQUE, 
              password VARCHAR(250) NOT NULL, 
              address VARCHAR (30) NOT NULL, 
              bio VARCHAR(250) NOT NULL, 
              occupation VARCHAR(250) NOT NULL, 
              expertise VARCHAR(250) NOT NULL, 
              role VARCHAR(250) NOT NULL
            );

            CREATE TABLE IF NOT EXISTS 
            sessions (
              sessionId SERIAL,
              menteeId INTEGER REFERENCES users(userId) ON DELETE CASCADE,
              questions VARCHAR(250) NOT NULL,
              mentorId INTEGER REFERENCES users(userId) ON DELETE CASCADE,
              menteeEmail VARCHAR(60),
              status VARCHAR(20) NOT NULL,
              PRIMARY KEY (sessionId));

            CREATE TABLE IF NOT EXISTS 
            reviews (
              sessionId INTEGER REFERENCES sessions(sessionId) ON DELETE CASCADE,
              mentorId INTEGER REFERENCES users(userId) ON DELETE CASCADE,
              menteeId INTEGER REFERENCES users(userId) ON DELETE CASCADE,
              score INTEGER NOT NULL,
              menteeFullName VARCHAR(200) NOT NULL,
              remark VARCHAR(300));
              
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
