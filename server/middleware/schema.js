import Joi from '@hapi/joi'

const schema ={
    signUp : Joi.object().keys({
        firstName: Joi.string().regex(/^[a-zA-Z]+$/).min(3).max(30).required(),
        lastName: Joi.string().regex(/^[a-zA-Z]+$/).min(3).max(30).required(),
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required(),
        address: Joi.string().min(3).max(144).required(),
        bio: Joi.string().min(3).max(144).required(),
        occupation: Joi.string().min(3).max(30).required(),
        expertise: Joi.string().min(3).max(50).required()
    }),

    login : Joi.object().keys({
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required()
    }),
    postSession: Joi.object().keys({
        mentorId: Joi.number().min(1).required(), 
        questions: Joi.string().min(3).max(30).required()
    }),

    userParams: Joi.object().keys({
        userId: Joi.number().min(1).required()
    }),
    sessParams: Joi.object().keys({
        sessionId: Joi.number().min(1).required()
    }),
    mentorParams: Joi.object().keys({
        mentorId: Joi.number().min(1).required()
    })

}

export default schema;