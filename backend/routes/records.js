const express = require("express");
const router = express.Router();

const pool = require("../db");

const validateRecord =
require("../services/validator");

const generateHash =
require("../services/dedupe");

const classify =
require("../services/classifier");

router.post("/", async (req, res) => {

    const data = req.body;

    const validation =
        validateRecord(data);

    if (validation) {
        return res
            .status(400)
            .json({ error: validation });
    }

    const hash =
        generateHash(data);

    const duplicate =
        await pool.query(
            "SELECT * FROM records WHERE hash=$1",
            [hash]
        );

    if (duplicate.rows.length > 0) {
        return res.status(409).json({
            message: "Duplicate record"
        });
    }

    const existingByName =
        await pool.query(
            "SELECT * FROM records WHERE lower(name) = lower($1)",
            [data.name]
        );

    const warning = existingByName.rows.find((existing) => {
        return classify(existing, data) === "FALSE_POSITIVE";
    });

    if (warning) {
        return res.status(409).json({
            message: "Potential false positive: same name but different email",
            existingRecord: warning,
        });
    }

    const result =
        await pool.query(
            `INSERT INTO records
             (name,email,phone,hash)
             VALUES($1,$2,$3,$4)
             RETURNING *`,
            [
                data.name,
                data.email,
                data.phone,
                hash
            ]
        );

    res.status(201).json(result.rows[0]);
});

module.exports = router;