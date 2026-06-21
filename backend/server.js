require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: 'http://16.192.76.81',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use(
    "/records",
    require("./routes/records")
);

app.get("/", (req, res) => {
    res.send("Data Dedupe API Running");
});

app.listen(
    process.env.PORT,
    '0.0.0.0',
    () => {
        console.log(
            `Server running on 0.0.0.0:${process.env.PORT}`
        );
    }
);