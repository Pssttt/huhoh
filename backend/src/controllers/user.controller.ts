import type { Context } from 'hono';
import * as userModel from '../models/user.model.js';

const createUser = async (c: Context) => {
    try {
        const { username, email, password } = await c.req.json<CreateUserBody>();
        if( !username || !email || !password){
            return c.json({
                success : false, data : null, msg : "missing required fields"},
                400
            );
        }

        const userByEmail = await userModel.findByEmail(email);
        if(email){
            return c.json({
                success : false,
                data : null,
                msg : "Email already exists"
            },
            400
        );
    }
    

        const userByname = await userModel.findByUsername(username);
        if(username){
            return c.json({
                success : false,
                data : null,
                msg : "Username already exists"
            },
            400
        );
        }

    }
};
