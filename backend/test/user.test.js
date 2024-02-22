const request = require('supertest')
const server = require('../app')
const userModel = require('../models/User')
const bcrypt = require('bcrypt')

// initialize all user, a user
let users
let user

// initialize
beforeAll(async() => {
    server
    // get all user
    users = [
        {
            name: 'test3',
            email: 'test77@test.com',
            password: await bcrypt.hash('12345678',10)
        },
        {
            name: 'test4',
            email: 'test87@test.com',
            password: await bcrypt.hash('12345678',10)
        }
    ]

    // register new user, login with new user
    user = {
        name: 'admin',
        email: 'admin1@admin.com',
        password: '12345678'
    }
    try {
        await userModel.create(users)
    } catch(err) {
        console.error(err)
    }
})

// test for get all user
test('get all user', async () => { 
    const res = await request(server).get('/api/v1/user')
    expect(res.statusCode).toBe(200)
    for (let i in res) {
        // finde each element in users, and compare with database's info
        users.forEach(e => {
            if (e.name === i.name) {
                expect(i.email).toEqual(e.email)
            }
        })
    }
})

// register a user
test('register a user', async() => {
    const res = await request(server).post('/api/v1/user/register').send(user)
    user.id = res.body.id
    expect(res.statusCode).toBe(200)
    expect(res.body.name).toEqual(user.name)
    expect(res.body.email).toEqual(user.email)
    expect(res.body.token).toBeDefined()
})

// register user without password
test('register user fail with no password', async() => {
    let failUser = {
        name: 'test4',
        email: 'test789@test.com',
    }
    const res = await request(server).post('/api/v1/user/register').send(failUser)
    // the str from mongoDB will have "" before and after
    let str = res.text.slice(1,-1)
    expect(res.statusCode).toBe(401)
    expect(str).toBe('All fields are required.')
})

// register user with invalid email
test('register user with invalid email', async() => {
    let failUser = {
        name: 'test44',
        email: 'test77.test.com',
        password: '12345678'
    }
    const res = await request(server).post('/api/v1/user/register').send(failUser)
    let str = res.text.slice(1,-1)
    expect(res.statusCode).toBe(401)
    expect(str).toBe('Invalid mail or password.')
})

// register user that was existed
test('register user that was existed', async() => {
    let failUser = {
        name: 'test44',
        email: 'test77@test.com',
        password: '12345678'
    }
    const res = await request(server).post('/api/v1/user/register').send(failUser)
    let str = res.text.slice(1,-1)
    expect(res.statusCode).toBe(409)
    expect(str).toBe('Invalid mail or password.')
})

// login with new created user
test('login', async() => {
    let newUser = {
        email: 'admin1@admin.com',
        password: '12345678'
    }
    const res = await request(server).post('/api/v1/user/login').send(newUser)
    expect(res.statusCode).toBe(200)
    expect(res.body.email).toEqual(newUser.email)
    expect(res.body.token).toBeDefined()
})

// login fail with wrong password
test('login fail with wrong password', async() => {
    let failUser = {
        email: 'admin1@admin.com',
        password: '87654321'
    }
    const res = await request(server).post('/api/v1/user/login').send(failUser)
    let str = res.text.slice(1,-1)
    expect(res.statusCode).toBe(404)
    expect(str).toBe('Invalid email or password.')
})

// find a user
test('find user', async() => {
    const res = await request(server).get(`/api/v1/user/${user.id}`)
    expect(res.statusCode).toBe(200)
    expect(res.body.user.name).toEqual(user.name)
    expect(res.body.user.email).toEqual(user.email)
})

// find a no existed user
test('find a no existed user', async() => {
    const res = await request(server).get(`/api/v1/user/12345`)
    expect(res.statusCode).toBe(404)
    let str = res.text.slice(1,-1)
    expect(str).toBe('There is no this user')
})

    // finish test, global, only happen once
    afterAll(async() => {
        await userModel.deleteMany({ 
            email: { $in: ['test77@test.com', 'test87@test.com', 'admin1@admin.com'] } 
        })
        server.close()
    })