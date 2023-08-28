import { NextResponse } from "next/server";
import { useRouter } from "next/router";
import pool from '../../../../lib/db';

export default async function handler(req, res) {

    const method = req.method;

    if(method === 'GET'){
        try {
            const query = 'SELECT * FROM job'
            const jobs  = await pool.query(query);
            res.status(200).end(JSON.stringify(jobs.rows));
        } catch (error) {
            console.error(err.message);
            res.status(405).end()
        }
        
    }else if(method === 'POST'){
        try {
            //const job = req.body;
            //const newJob = await pool.query("INSERT INTO job(job_title, department, country, description, salary_range_min, salary_range_max, worldwide, currency, company, compDescription, candidate_level) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *", [job.jobTitle, job.jobDepartment, job.selectedCountries, job.jobDescription, job.salaryMin, job.salaryMax, job.worldwide, job,currency, job.company, job.compDescription, job.candidateLevel]);
            console.log("THIS IS A POST REQ");
            res.status(200).end();
            //res.json(newJob.rows);
        } catch (err) {
            console.error(err.message);
            res.status(405).end()
        }
    }else{
        res.status(405).end()
    }
}


///////////////////////////////////////////////////////

//OLD ROUTES 

/*
// GET a single job
export async function GET(req, res) {
    try {
        const {id} = req.params;
        const job = await pool.query("SELECT * FROM job WHERE job_id = $1 ", [id]);
        res.json(job.rows)

    } catch (error) {
        console.error(error.message);
    }
})

// create a job
router.post("/createjob", async (req, res) => {

    try {
        const job = req.body;
        const newJob = await pool.query("INSERT INTO job(job_title, department, country, description, salary_range_min, salary_range_max, worldwide, currency, company, compDescription, candidate_level) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *", [job.jobTitle, job.jobDepartment, job.selectedCountries, job.jobDescription, job.salaryMin, job.salaryMax, job.worldwide, job,currency, job.company, job.compDescription, job.candidateLevel]);

        res.json(newJob.rows);
    } catch (error) {
        console.error(error.message);
    }
})

// update a job
router.patch("/updatejob/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateJob = await pool.query("UPDATE job SET description = $1 WHERE job_id = $2", [description, id]);

        res.json(updateJob.rows);
    } catch (error) {
        console.error(error.message);
    }
})

// delete a job
router.delete("/deletejob/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const deleteJob = await pool.query("DELETE FROM job WHERE job_id = $1", [id]);

        res.json(deleteJob.rows);
    } catch (error) {
        console.error(error.message);
    }
})

// get all countries
router.get("/countries", async (req, res) => {

    try {
        const allCountries = await pool.query("SELECT * FROM countries");
        res.json(allCountries.rows)

    } catch (error) {
        console.error(error.message);
    }

})

// //create new user
// router.post("/newuser", async (req, res) => {
//     try {
//         const {user} = req.body;
//         const newUser = await pool.query("INSERT INTO users(user_name, email, password, is_candidate, is_recruiter) VALUES($1, $2, $3, $4, $5) RETURNING *", [user.user_name, user.email, user.password, user.candidate, user.recruiter]);

//         res.json(newUser.rows);
//     } catch (error) {
//         console.error(error.message);
//     }
// })


module.exports = router;

*/