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

module.exports = { RequestStatus, ConnectionStatus, Role };