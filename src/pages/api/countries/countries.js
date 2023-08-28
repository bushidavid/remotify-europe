import { NextResponse } from "next/server";
import pool from '../../../../lib/db';

// get all countries
export default async function GET(req, res) {

    try {
        const allCountries = await pool.query("SELECT * FROM countries");
        res.status(200).end(JSON.stringify(allCountries.rows));

    } catch (error) {
        res.status(405).end();
    }
}