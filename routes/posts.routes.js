import { readJsonFromFile, writeJsonToFile } from "../file-operations.js";
import { Router } from 'express';
import jwt from "jsonwebtoken";
import { MongoClient } from 'mongodb'
const postRouter = Router();

postRouter.get('/posts', (req, res) => {

    const token = req.query.token;
    const decodedToken = jwt.verify(token, 'jaklsdfjlkasjdlfkjaskldfklasdf')
    const author = decodedToken.username
    //some validation to authenticate user
    MongoClient.connect(process.env.CONNECTION_STRING, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");

        dbo.collection("posts").find({}).toArray(function (err, dbres) {
            if (err) throw err;
            db.close();
            res.json(dbres)
        });
    });
})


postRouter.post('/posts', (req, res) => {


    const token = req.query.token;
    const decodedToken = jwt.decode(token)
    const author = decodedToken.username


    let post = req.body
    post.author = author;
    post.createdAt = (new Date()).toISOString();
    //some validation to authenticate user
    MongoClient.connect(process.env.CONNECTION_STRING, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("posts").insertOne(post, function (err, dbres) {
            if (err) throw err;

            dbo.collection("posts").find({}).sort({ createdAt: -1 }).toArray(function (err, dbres) {
                if (err) throw err;
                db.close();
                res.json(dbres)
            });
        });
    });

})


postRouter.put('/posts', (req, res) => {

    const body = req.body;



})


postRouter.post('/post', async (req, res) => {

    res.json('created')

})

export default postRouter;