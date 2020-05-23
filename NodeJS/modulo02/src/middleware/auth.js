import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';
import { promisify } from 'util';

export default async(req, res, next) => {
    const authHeader = req.headers.authorization;

    //console.log("Header: ", authHeader);
    

    if (!authHeader){
        return res.status(401).json({error: 'Token not provided.'})
    }

    const [, token] = authHeader.split(' ');

    try{
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);

        //console.log("ID:", decoded);
        req.userId = decoded.id;
    } catch(err) {
        return res.status(401).json({error: 'Token invalid.'})
    }


    next();
}