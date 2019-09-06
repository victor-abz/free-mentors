# free-mentors

[![Build Status](https://travis-ci.org/victor-abz/free-mentors.svg?branch=develop)](https://travis-ci.org/victor-abz/free-mentors) [![Coverage Status](https://coveralls.io/repos/github/victor-abz/free-mentors/badge.svg)](https://coveralls.io/github/victor-abz/free-mentors) [![Maintainability](https://api.codeclimate.com/v1/badges/9880aa631e8cfe5c094d/maintainability)](https://codeclimate.com/github/victor-abz/free-mentors/maintainability)

![](ui/images/logo-freementors.png)
 
 > Free Mentors is a social initiative app Which run in the cloud
  with which accomplished professionals become role models to young people to 
  provide free mentorship sessions.

## User Interface
The Free mentors Project is made with HTML and Pure Css. 

[Click here to view the UI](https://victor-abz.github.io/free-mentors/ui/)

![](ui/images/screenshots/1.png) ![](ui/images/screenshots/2.png) ![](ui/images/screenshots/3.png)



## Installation
The Project is based on NodeJs. After you clone this repor to your machine please run the following command which will install all the required dependencies.

```sh
npm install
```



## Usage example

>This App will be the center piece for mentoring. 
The mentors will be listed with their expertise and the mentees will be required to signup in order to request sessions with mentors. and then mentors will be accepting or rejecting session.
After Session, Users will be reviewing the session and the Admin will have to take right measures depending on the situation

## Features
* UserCan sign up
* User can log in
* User can request Mentoring session
* admin can change a user to mentor
* Mentor Can accept or Reject Session
* user can review session
* Admin can  delete reviews deemed inappropriat
* User can request mentoring session

## API USage for this project
### **api/v1/auth/signup**
Able to post a request for sign up

Request body should be
```
{
   “firstName”:​ ​String,​ 
   “​lastName”​: ​String,​ 
   “email”​:​​String,​ 
   “password”:​​​String,​ 
   “​address”​: S​tring​, 
   “​bio”​: ​String,​ 
   “​occupation”​: ​String,​ 
​   “expertise”:​ ​String​,
}
```
The Response payload will have the following shape

RESPONSE 201 
```
{
“status” ​:​Integer: 201​,
“message”​:​S​tring: “User created successfully” 
“​data” ​:​​{
​   “token” ​:​​​String,​
​   “message”:​​“User created successfully”​,
}
```
### **API/v1/auth/signin**
Post a request for sign in

Request body should be
```
{
   “email”​:​​String,​ 
   “password”:​​​String,​ 
}
```
The Response payload will have the following shape

Response:
200 OK
```
{
“status” ​:​ 200​,
“message”​:​ “User is successfully logged in”​, 
“​data” ​:​​{
   ​“token” ​:​​​String,​
  }
}
```
### **API/v1/user/:userId** 
Admin can change a user to mentor

Request should be Header with
```
{
   “token”​:​​String,​
}
```
The Response payload should have the following shape

Response with status code: 200 OK
```
{
   “status” ​:​Integer: 200​, “​data” ​:​​{
   ​“message”:​​​​“User account changed to mentor”,​
  }
}
```
### **API/v1/mentors**
User is able to get all mentors 

Request should be Header with
```
{
   “token”​:​​String,​
}
```
The Response payload should have the following shape
```
{
   “status” ​:​integer: 200​, 
    “​data” ​:​[
    {
​     “mentorId”​: I​nteger​, 
     “firstName”​: S​tring,​ ​
​     “lastName”​: S​tring​, 
​     “email”:​​S​tring,​ 
​     “password”​:​S​tring​,
​     ​“address”:​ ​String​, 
​     “bio”:​ ​String​, ​
​     “occupation”:​ ​String​, ​​     ​     ​     
 ​     “expertise”:​ S​tring​,
​      ​} , 
{
​     “mentorId”​: I​nteger​, 
     “firstName”​: S​tring,​ ​
​     “lastName”​: S​tring​, 
​     “email”:​​S​tring,​ 
​     “password”​:​S​tring​,
​     ​“address”:​ ​String​, 
​     “bio”:​ ​String​, ​
​     “occupation”:​ ​String​, ​​     ​     ​     
 ​     “expertise”:​ S​tring​,
​      ​} ,]
}
```
### **API/v1/mentors/:mentorId**
User will be able to GET specific mentor

Request should be Header with
```
{
   “token”​:​​String,​
}
```
The Response payload should have the following shape
```
{
   “status” ​:​integer: 200​, 
    “​data” ​:​
    {
​     “mentorId”​: I​nteger​, 
     “firstName”​: S​tring,​ ​
​     “lastName”​: S​tring​, 
​     “email”:​​S​tring,​ 
​     “password”​:​S​tring​,
​     ​“address”:​ ​String​, 
​     “bio”:​ ​String​, ​
​     “occupation”:​ ​String​, ​​     ​     ​     
 ​     “expertise”:​ S​tring​,
​      ​} , 
}
```

### **POST API/v1/sessions**
A user is able to Create Session Request

Request should have Header with
```
{
   “token”​:​​String,​
}
```
Request body should be
```
{
   "mentorId": Integer;
   "questions": string​
}
```
The Response payload should have the following shape
RESPONSE
200 OK
```
{
   “status” ​:​integer: 200​, 
“​data” ​:​
     {
​     “mentorId”​: I​nteger​, 
     “mentorId”​: Integer,​ ​
​     “menteeId”​: Integer​, 
​     “menteeEmail”:​​S​tring,​ 
​     “status”​:​S​tring
​      ​} 
}
```

### **API/v1/sessions/:sessionId/accept**
THEN a I should be able to Accept a session
**DEV Notes**
Request body should be Header with
```
{
   “token”​:​​String,​
}
```
The Response payload should have the following shape
RESPONSE
200 OK
```
{
   “status” ​:​I​nteger: 200​, 
    “​data” ​:​​ {
​        “sessionId”​: ​Integer,​ 
        “mentorId”:​ ​Integer​,
         “menteeId”:​ ​Integer​, ​
        “questions”​: ​String,​ 
        “menteeEmail”​:​S​tring​, 
        “status”:​​S​tring​, // Should be updated to Accepted
    }
}
```

### **API/v1/sessions/:sessionId/reject**
THEN a I should be able to Decline a session
**DEV Notes**
Request body should be Header with
```
{
   “token”​:​​String,​
}
```
The Response payload should have the following shape
RESPONSE
200 OK
```
{
   “status” ​:​I​nteger: 200​, 
    “​data” ​:​​ {
​        “sessionId”​: ​Integer,​ 
        “mentorId”:​ ​Integer​,
         “menteeId”:​ ​Integer​, ​
        “questions”​: ​String,​ 
        “menteeEmail”​:​S​tring​, 
        “status”:​​S​tring​, // Should be updated to declined
    }
}
```

### **API/v1/sessions**
THEN User  should be able to view all requested session by hime if it is a mentor then He should see all session addressed to him
**DEV Notes**
Request body should be Header with
```
{
   “token”​:​​String,​
}
```
The Response payload should have the following shape
RESPONSE
200 OK
```
{
   “status” ​:​I​nteger: 200​, 
    “​data” ​:​​ [
    {
​        “sessionId”​: ​Integer,​ 
        “mentorId”:​ ​Integer​,
         “menteeId”:​ ​Integer​, ​
        “questions”​: ​String,​ 
        “menteeEmail”​:​S​tring​, 
        “status”:​​S​tring​, 
    }
    {
​        “sessionId”​: ​Integer,​ 
        “mentorId”:​ ​Integer​,
         “menteeId”:​ ​Integer​, ​
        “questions”​: ​String,​ 
        “menteeEmail”​:​S​tring​, 
        “status”:​​S​tring​, 
    }]
}
```

### **API/v1/sessions/:sessionId/review**
THEN User  should be able to review the session with a rate between 1 to 5
**DEV Notes**
Request body should be Header with
```
{
   “token”​:​​String,​
}
```

request body
```
“score”​:​​Integer​, // scale of 1 - 5 
“remark”:​​S​tring​,
```
The Response payload should have the following shape
RESPONSE
200 OK
```
{
“status” ​:​I​nteger: 200​, 
“​data” ​:​​ {
​“sessionId”​: ​Integer,​ 
“mentorId”:​ ​Integer​, 
“menteeId”:​ ​Integer​, ​
“score”:​ ​Integer,​ 
“menteeFullName”:​​​String,​ 
“remark”:​​S​tring​,
}
```


### **API/v1/sessions/:sessionId/review**
THEN a I should be able to Delete a review with that Id
**DEV Notes**
Request body should be Header with
```
{
   “token”​:​​String,​
}
```
The Response payload should have the following shape
RESPONSE
200 OK
```
{
​     “status” ​:​200​, 
     “​data” ​:​​ {
            ​“message”​: ​“Review successfully deleted”,​
}
```


## Technologies used

Html and Css
Node Js 
Javascript
    


## Meta

ABIZEYIMANA Victor – [@vicky-abz](https://twitter.com/vicky_abz)

