const Fuse = require('fuse.js');

/**
 * 
 * @param {Array} users - Array of user objects from the DB
 * @param {String} query - The search term inputted by the user.
 * @returns 
 */

const fuzzySearch = (users, query) => {
    const fuse = new Fuse(users, {
        keys: ['name', 'school', 'major',  'interests'],
        threshold: 0.3,
        includeScore: true
    });

    const results = fuse.search(query);
    return results.map(res => res.item);
}

module.exports = { fuzzySearch }