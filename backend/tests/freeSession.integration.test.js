const { generateRecommendedTimes } = require('../utils/generateRecommendedTimes');

describe('generateRecommendedTimes (integration)', () => {
    test('returns correct overlap for one matching day', () => {
        const mentor = { Monday: [['10:00', '12:00']], Friday: [['13:00', '14:00'], ['15:00', '17:00']] };
        const mentee = { Monday: [['11:00', '13:00']], Wednesday: [['12:00', '13:00']], Friday: [['14:00', '16:00']] };
        const expected = { Monday: [['11:00', '12:00']], Friday: [['15:00', '16:00']] };

        const result = generateRecommendedTimes(mentee, mentor);
        expect(result).toEqual(expected);
    });
});