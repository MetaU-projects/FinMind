const { timeOverlaps } = require('./schedulingUtils');

/**
 * Generates a map of recommended meeting based on overlapping availability between a mentee and a mentor across weekdays
 * 
 * @param {Object<string, Array<[string, string]>>} menteeSlots - Availability by day
 * @param {Object<string, Array<[string, string]>>} mentorSlots - Availability by day
 * @returns {Object<string, Array<[string, string]>>} Recommended overlapping time slots
 */

const generateRecommendedTimes = (menteeSlots, mentorSlots) => {
    const result = {};
    for(const [day, session] of Object.entries(menteeSlots)){
        if(mentorSlots[day]){
            const recommendations = timeOverlaps(menteeSlots[day], mentorSlots[day]);
            if(recommendations.length > 0){
                result[day] = recommendations
            }
        }
    }
    return result;
}

module.exports = { generateRecommendedTimes }