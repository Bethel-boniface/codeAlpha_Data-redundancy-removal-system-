function validateRecord(data) {

    if (!data.name || data.name.trim().length < 2) {
        return "Please provide a valid full name.";
    }

    if (!data.email || !data.email.includes("@")) {
        return "Please provide a valid email address.";
    }

    if (!data.phone || data.phone.trim().length < 7) {
        return "Please provide a valid mobile number.";
    }

    if (!data.date_of_birth) {
        return "Date of birth is required.";
    }

    if (!data.gender) {
        return "Please select your gender.";
    }

    if (!data.country) {
        return "Country is required.";
    }

    if (!data.state) {
        return "State is required.";
    }

    if (!data.city) {
        return "City is required.";
    }

    if (!data.address || data.address.trim().length < 5) {
        return "Please provide a valid address.";
    }

    if (!data.occupation) {
        return "Occupation is required.";
    }

    return null;
}

module.exports = validateRecord;