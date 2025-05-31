import db from "../;
const findByEmail = async (email : String) => {
    const mail = await db.user.findUnique({
        where : {email},
    });
    return mail;
};

const findByUsername = async (username : String) => {
    const account = await db.user.findUnique({
        where : {username},
    });
    return account;
};

const findById = async (id : String)=>{
    const user = await db.user.findUnique({
        where : {id},
    });
    return user;
};

const createUser = async (userName : String , email : String, password : String) =>{
    const hashedPassword = await hash (password,10);
    const user = await db.user.create({
        data :{
            userName : userName,
            email : email,
            password : hashedPassword,
        },
    });
    return user;
};

const getUserInfo = async (id : String) => {
    const user = await db.user.findUnique({
        where : {id},
        select : {
            username : true,
            profilePic : true,
        }
    });
    return user;
};

con