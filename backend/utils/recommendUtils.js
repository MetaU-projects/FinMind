/**
 * This bfsAlgorithm calculates an additional weight for mentors based their 
 * proximity to the logged-in mentee with the mentorship connection graph/network
 * 
 * It uses a BFS (Breadth-First Search) traversal starting from the mentee,
 * exploring all reachable mentors by moving through alternating mentee-mentor connections.
 * 
 * Inputs:
 * @param {Array<Object>} mentees - Array of mentee objects, each with an `id` and `menteeMentorships`
 * @param {Array<Object>} mentors - Array of mentors objects, each with an `id` and `menteeMentorships`
 * @param {number} menteeId - The ID of the mentee traversal is starting from
 * 
 * Output
 * @returns {Object} mentorsEdge - A mapping of mentor IDs to their proximity score (1/distanceFromMentee)
 * Mentors already connected (depth 1) are excluded from the result.
 * 
 * @example
 * const result = bfsAlgorithm(mentees, mentors, 5); 
 * // result will be { "10": 0.2, "11": 0.33 }
*/
const bfsAlgorithm = (mentees, mentors, menteeId) => {
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

module.exports = bfsAlgorithm;