import { useRouter } from "next/router";
import pool from '../../../../lib/db';

export default async function handler(req, res) {

    const method = req.method;
    const params = req.query;

    if(method === 'POST'){
        try {
            const job = await pool.query(`SELECT j.job_id, j.job_title, j.description, j.recruiter_id , c.company_name, j.expiration_date, j.country, j.department, j.salary_range_min, j.salary_range_max, j.worldwide, j.candidate_level 
            FROM job j inner join company c on j.company = c.company_id 
            WHERE j.job_id=$1 LIMIT 1`, [params.jobId]);

            if(job.rows.length === 0){
                res.status(404).json({ message: 'Job not found'});
            } else {
                res.status(200).json(job.rows[0])
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: 'Internal Server Error' }).end()
        }
        
    }else{
        res.status(405).json({message: 'Method not allowed'});
    }
}