const prisma = require('../config/prismaClient');

let cachedInterest = null;
const getInterests = async (req, res) => {
    try {
        if(!cachedInterest){
            cachedInterest = await prisma.interest.findMany();
        }
        res.status(200).json(cachedInterest);

    } catch(err) {
        res.status(500).json({ error: "Error getting interests", details: err.message })
    }
}

module.exports = { getInterests };