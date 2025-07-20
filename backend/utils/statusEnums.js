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

const DayMap = Object.freeze({
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6
})

module.exports = { RequestStatus, ConnectionStatus, Role, DayMap };