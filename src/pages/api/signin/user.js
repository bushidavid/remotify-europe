import bcrypt from "bcrypt";
import pool from '../../../../lib/db';

export default async function GET(req, res) {

    try {
        
        const {user} = req.body;

        const userMatch = await pool.query("SELECT email, password FROM sysuser WHERE email = ($1)", [user.email]);
        
        if(userMatch) {
            bcrypt.compare(user.password, userMatch.password)
        }

        const match = await pool.query("SELECT count(*) AS found FROM sysuser WHERE email = ($1)", [user.email]);

        res.json(match);
    } catch (error) {
        console.error(error.message);
    }

}