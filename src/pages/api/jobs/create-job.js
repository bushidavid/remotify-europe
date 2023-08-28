import { NextResponse } from "next/server";
import pool from '../../../../lib/db';

// create a job
export default async function POST(req, res) {

    try {
        const job = req.body;
        const newJob = await pool.query("INSERT INTO job(job_title, department, country, description, salary_range_min, salary_range_max, worldwide, currency, company, compDescription, candidate_level) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *", [job.jobTitle, job.jobDepartment, job.selectedCountries, job.jobDescription, job.salaryMin, job.salaryMax, job.worldwide, job,currency, job.company, job.compDescription, job.candidateLevel]);

        res.status(200).end(JSON.stringify(newJob.rows));
    } catch (error) {
        console.log(error);
        res.status(200).end();
    }
}