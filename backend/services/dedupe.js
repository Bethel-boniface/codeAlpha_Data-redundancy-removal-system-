const crypto = require("crypto");

function generateHash(record) {

    const key =
        `${record.name}${record.email}${record.phone}`;

    return crypto
        .createHash("sha256")
        .update(key)
        .digest("hex");
}

module.exports = generateHash;