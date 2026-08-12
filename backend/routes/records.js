const express = require("express");
const router = express.Router();

const pool = require("../db");

const validateRecord =
    require("../services/validator");

const generateHash =
    require("../services/dedupe");

const classify =
    require("../services/classifier");


// GET ALL RECORDS
router.get("/", async (req, res) => {

    try {

        const records = await pool.query(
            `SELECT
                id,
                name,
                email,
                phone,
                date_of_birth,
                gender,
                country,
                state,
                city,
                address,
                occupation,
                organization,
                nationality,
                additional_information,
                created_at
             FROM records
             ORDER BY id DESC`
        );

        res.json(records.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Unable to retrieve records."
        });

    }

});


// CREATE RECORD
router.post("/", async (req, res) => {

    try {

        const data = req.body;

        // 1. Validate
        const validation = validateRecord(data);

        if (validation) {

            return res.status(400).json({
                success: false,
                message: validation
            });

        }


        // 2. Generate dedupe hash
        const hash = generateHash(data);


        // 3. Check exact duplicate
        const duplicate = await pool.query(
            `SELECT id
             FROM records
             WHERE hash = $1`,
            [hash]
        );


        if (duplicate.rows.length > 0) {

            return res.status(409).json({

                success: false,

                code: "DUPLICATE_RECORD",

                message:
                    "Your information has already been taken. This record already exists in our system."

            });

        }


        // 4. Check existing email
        const existingEmail = await pool.query(
            `SELECT *
             FROM records
             WHERE LOWER(email) = LOWER($1)
             LIMIT 1`,
            [data.email]
        );


        if (existingEmail.rows.length > 0) {

            return res.status(409).json({

                success: false,

                code: "EMAIL_ALREADY_REGISTERED",

                message:
                    "Your information has already been taken. This email address is already registered."

            });

        }


        // 5. Check existing phone
        const existingPhone = await pool.query(
            `SELECT *
             FROM records
             WHERE phone = $1
             LIMIT 1`,
            [data.phone]
        );


        if (existingPhone.rows.length > 0) {

            return res.status(409).json({

                success: false,

                code: "PHONE_ALREADY_REGISTERED",

                message:
                    "Your information has already been taken. This mobile number is already registered."

            });

        }


        // 6. Check possible false positive
        const existingByName = await pool.query(
            `SELECT *
             FROM records
             WHERE LOWER(name) = LOWER($1)`,
            [data.name]
        );


        const warning = existingByName.rows.find(
            existing =>
                classify(existing, data) === "FALSE_POSITIVE"
        );


        if (warning) {

            return res.status(409).json({

                success: false,

                code: "POTENTIAL_FALSE_POSITIVE",

                message:
                    "A similar record already exists. Please verify your information.",

                existingRecord: {
                    id: warning.id,
                    name: warning.name
                }

            });

        }


        // 7. Insert verified unique record
        const result = await pool.query(
            `INSERT INTO records
            (
                name,
                email,
                phone,
                date_of_birth,
                gender,
                country,
                state,
                city,
                address,
                occupation,
                organization,
                nationality,
                additional_information,
                hash
            )
            VALUES
            (
                $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14
            )
            RETURNING *`,
            [
                data.name,
                data.email,
                data.phone,
                data.date_of_birth,
                data.gender,
                data.country,
                data.state,
                data.city,
                data.address,
                data.occupation,
                data.organization || null,
                data.nationality || null,
                data.additional_information || null,
                hash
            ]
        );


        // 8. Success
        res.status(201).json({

            success: true,

            message:
                "Your information has been successfully verified and registered.",

            record: result.rows[0]

        });

    } catch (error) {

        console.error("Record creation error:", error);

        res.status(500).json({

            success: false,

            message:
                "An error occurred while processing your information."

        });

    }

});


module.exports = router;