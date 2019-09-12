import db from '../../db';
import mocks from './db.mocks';

const createAll = {
    databaseData : async () => {
        await new db().createTables();
        await new db().addUser(mocks.mentor)
        await new db().addUser(mocks.mentor2)
        await new db().addUser(mocks.mentor3)
        await new db().addUser(mocks.mentee)
        await new db().addUser(mocks.mentee2)
        await mocks.makeAdmin()
        await mocks.makeMentor()
        await new db().createSession(mocks.sessionData,mocks.userData)
        await new db().createSession(mocks.sessionData2,mocks.userData)
        await new db().createSession(mocks.sessionData3,mocks.userData)
        await new db().createReview(mocks.reviewData,2, mocks.userData)
        
    },
    dropAll : async() => await new db().dropTables(),
    acceptOne : async(sessionId) => await new db().changeStatus(sessionId, 'accepted'),
}
export default createAll;