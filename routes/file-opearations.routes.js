import { router } from 'express'
import fs from 'fs'
const fileOperationRoutes = router();

fileOperationRoutes.get('/write', (req, res) => {
    //return all users

    const info = req.query.info;

    const fileData = fs.writeFileSync('../users.json', info);

    res.send(fileData)
})

fileOperationRoutes.get('/read', (req, res) => {
    //return all users
    const fileData = fs.readFileSync('../users.json');

    res.send(fileData)
})


export default fileOperationRoutes;