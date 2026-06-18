function validateRecord(data) {

    if (!data.name)
        return "Name required";

    if (!data.email)
        return "Email required";

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(data.email))
        return "Invalid email";

    return null;
}

module.exports = validateRecord;