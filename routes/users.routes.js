import { readJsonFromFile, writeJsonToFile } from "../file-operations.js";
import { Router } from 'express';
import jwt from "jsonwebtoken";
import { Admin, MongoClient } from 'mongodb'
import { encryptString } from '../utils.js'
const userRouter = Router();


userRouter.get('/users', (req, res) => {
    //return all users

    MongoClient.connect(process.env.CONNECTION_STRING, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");

        dbo.collection("users").find({}).toArray(function (err, dbres) {
            if (err) throw err;
            db.close();
            res.json(dbres)
        });
    });

})

userRouter.post('/users', (req, res) => {

    let user = req.body;

    user.password = encryptString(user.password)

    MongoClient.connect(process.env.CONNECTION_STRING, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");

        dbo.collection("users").insertOne(user, function (err, dbres) {
            if (err) throw err;
            console.log("1 document inserted");
            console.log(dbres);
            db.close();

            res.json({ status: true, message: 'user added' })
        });
    });

})

userRouter.delete('/users/:username', (req, res) => {
    //return all users
    const username = req.params.username;

    MongoClient.connect(process.env.CONNECTION_STRING, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myquery = { username: username };

        dbo.collection("users").deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            db.close();

            res.json({
                status: true,
                message: 'User deleted'
            })
        });
    });


})


userRouter.get('/authenticate', (req, res) => {
    const username = req.query.username;
    const password = req.query.password;

    let query = {
        username: username,
        password: encryptString(password)
    }

    //lookup in database

    MongoClient.connect(process.env.CONNECTION_STRING, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");

        dbo.collection("users").find(query).toArray(function (err, dbres) {
            if (err) throw err;
            db.close();
            if (dbres.length > 0) {

                const token = jwt.sign({ username: username }, 'jaklsdfjlkasjdlfkjaskldfklasdf')

                res.json({
                    authenticated: true,
                    token: token
                })
            } else {
                res.json({
                    authenticated: false
                })
            }
        });
    });

})


export default userRouter;