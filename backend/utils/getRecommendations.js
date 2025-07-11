const { spawn } = require('child_process');
const path = require("path");

const getRecommendations = (menteeInterest, mentors) => {
    return new Promise((resolve, reject) => {
        const py = spawn("python3", [path.join(__dirname, "interestMatch.py")]);

        const input = {
            mentee: menteeInterest.description,
            mentors: mentors.map(m => ({ id: m.id, skill: m.description }))
        }

        let data = "";
        let error = "";

        py.stdin.write(JSON.stringify(input));
        py.stdin.end();

        py.stdout.on("data", chunk => data += chunk.toString());
        py.stderr.on("data", chunk => error += chunk.toString());

        py.on("close", code => {
            if (code !== 0) return reject(`Python exited with code ${code}`)
            try {
                resolve(JSON.parse(data))
            } catch (err) {
                reject("Error getting data", err)
            }
        });
    });
};

module.exports = getRecommendations;