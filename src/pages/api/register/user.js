import bcrypt from "bcrypt";
import pool from '../../../../lib/db';


export default async function signup(req, res) {
    
    if(req.method === 'POST'){

        console.log(req.body.pwd);

        const user = req.body;

        if(!user.email || !user.pwd) return res.status(400).json({'message': 'Email and Password are required.', "params" : req.body});

        //check for duplicate email in database
        try {
            const response = await pool.query("SELECT count(*) AS found FROM sysuser WHERE email = ($1)", [user.email]);
            console.log(response.found);

            if(response.found === 1){
                return res.status(409); //conflict
            }
        }catch (err) {
            res.status(500).json({'message' : err.message, "here": "here"});
        }

        try{
            //hash password
            const hashPwd = await bcrypt.hash(user.pwd, 10);
            //store new user
            const newUser = { "email" : user.email, "password" : hashPwd, "name" : user.name, "surname" : user.surname, "is_candidate" : user.isCandidate, "is_recruiter" : user.isRecruiter };

            await pool.query("INSERT INTO sysuser (email, password, name, surname, is_candidate, is_recruiter) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", [newUser.email, newUser.password, newUser.name, newUser.surname, newUser.is_candidate, newUser.is_recruiter]);    
    
            res.status(201).json({'success': 'New user ${user.email} created!', 'created' : 'true'});
    
        }catch(err){
            res.status(500).json({'message' : err.message, 'created' : 'false'});
        }

    }else {
        console.log("only POST is allowed");
        res.status(405).end();
    }

}