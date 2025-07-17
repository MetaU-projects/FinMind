const RequestStatus = Object.freeze({
    ACCEPTED: "ACCEPTED",
    PENDING: "PENDING",
    DECLINED: "DECLINED",
});

const ConnectionStatus = Object.freeze({
    ACCEPTED: "ACCEPTED",
    ENDED: "ENDED"
});

const Role = Object.freeze({
    MENTEE: "MENTEE",
    MENTOR: "MENTOR"
})

const Weekday = Object.freeze({
    MONDAY: "Monday",
    TUESDAY: "Tuesday",
    WEDNESDAY: "Wednesday",
    THURSDAY: "Thurday",
    FRIDAY: "Friday"
})

module.exports = { RequestStatus, ConnectionStatus, Role, Weekday };