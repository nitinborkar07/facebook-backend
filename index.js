import express from "express";
import cors from 'cors';
import userRoutes from './routes/users.routes.js'
import mathRoutes from './routes/math.routes.js'
import utilsRoutes from "./routes/test-util-routes.js";
import postRoutes from './routes/posts.routes.js'

import dotenv from 'dotenv'
dotenv.config('./env')

const app = express();
app.use(express.json())
app.use(cors())

app.use(userRoutes);
app.use(mathRoutes);
app.use(utilsRoutes)
app.use(postRoutes)

app.listen(process.env.PORT, () => {
    console.log('Server is listening on ' + process.env.PORT)
})

