require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
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
    () => {
        console.log(
            `Server running on ${process.env.PORT}`
        );
    }
);