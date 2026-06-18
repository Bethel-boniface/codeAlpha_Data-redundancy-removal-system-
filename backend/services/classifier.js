function normalize(value) {
    return typeof value === "string"
        ? value.trim().toLowerCase()
        : "";
}

function classify(existing, incoming) {
    const existingName = normalize(existing.name);
    const existingEmail = normalize(existing.email);
    const existingPhone = normalize(existing.phone);

    const incomingName = normalize(incoming.name);
    const incomingEmail = normalize(incoming.email);
    const incomingPhone = normalize(incoming.phone);

    const nameMatches = existingName === incomingName;
    const emailMatches = existingEmail === incomingEmail;
    const phoneMatches = existingPhone === incomingPhone;

    if (nameMatches && emailMatches && phoneMatches) {
        return "DUPLICATE";
    }

    if (nameMatches && !emailMatches) {
        return "FALSE_POSITIVE";
    }

    return "VALID";
}

module.exports = classify;