const otherRecommendations = (mentees, mentors, menteeId) => {

    const usersConnection = {};
    mentees.map(mentee => {
        usersConnection[mentee.id] = [];
        mentee.menteeMentorships.map(connect => usersConnection[mentee.id].push(connect.mentorId));
    });

    mentors.map(mentor => {
        usersConnection[mentor.id] = [];
        mentor.mentorMentorships.map(connect => usersConnection[mentor.id].push(connect.menteeId));
    });

    const visited = {};
    const result = {};
    const queue = [];

    queue.push({ id: menteeId, depth: 0 });
    visited[menteeId] = true;

    while (queue.length > 0) {
        let { id: curr, depth } = queue.shift();
        result[curr] = depth;
        for (let adjacent of usersConnection[curr]) {
            if (!visited[adjacent]) {
                visited[adjacent] = true;
                queue.push({ id: adjacent, depth: depth + 1 })
            }
        }
    };

    const filterMentors = mentors.filter(mentor => result[mentor.id] !== undefined);
    const mentorsEdge = {}
    filterMentors.map(mentor => {
        if (result[mentor.id] !== 1) {
            const calc = 1 / result[mentor.id];
            mentorsEdge[mentor.id] = calc;
        }
    });

    return mentorsEdge;
}

module.exports = otherRecommendations;