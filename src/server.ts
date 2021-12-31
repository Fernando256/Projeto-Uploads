import express, {Request, Response, ErrorRequestHandler} from "express";
import dotenv from 'dotenv';
import mustache from 'mustache-express';
import path from 'path';
import passport from 'passport';
import cors from 'cors';
import { MulterError } from "multer";
import mainRoutes from './routes/index';


dotenv.config();

const server = express();

server.set('view engine', 'mustache');
server.set('views', path.join(__dirname, 'views'));
server.engine('mustache', mustache());

server.use(cors());

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended: true}));
server.use(passport.initialize());

server.use(mainRoutes);

server.use((req, res) => {
    res.status(404); 
    res.json({message: 'Endpoint not found!'});
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err.status)
        res.status(err.status);
    else
        res.status(400); // Bad Request

    if (err.message)
        res.json({error : err.message});
    else if (err instanceof MulterError)
        res.json({error: err.code});
    else {
        console.log(err);
        res.json({error: 'There is something wrong.'});
    }
}

server.use(errorHandler);

server.listen(process.env.PORT);



