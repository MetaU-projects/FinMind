const prisma = require('../config/prismaClient');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');

const DEFAULT_PASSWORD = 'pass1234';


async function main() {
    await prisma.user.deleteMany();

    const passwordHash = await bcrypt.hash(DEFAULT_PASSWORD, 10);
    const roles = ['MENTOR', 'MENTEE'];
    const classification = ['FRESHMAN', 'SOPHOMORE', 'JUNIOR', 'SENIOR'];

    const colleges = [
        'Havard University',
        'Stanford University',
        'Alabama A&M Univeristy',
        'Fisk University',
        'University of Virginia',
        'Univeristy of Alabama, Huntsville',
        'Howard University',
        'Spelman College',
        'Massachusetts Institute of Technology',
        'University of Carlifornia, Berkeley',
        'Menlo College',
        'Yale University',
        'Georgia Institute of Technology',
        'Rice University',
        'Princeton Univeresity',
        'Columbia University',
        'University of Michigan',
        'Carnegie Mello University'
    ]

    const majors = [
        'Computer Science',
        'Mechanical Engineering',
        'Psychology',
        'Business Administration',
        'Biology',
        'Political Science',
        'Economics',
        'Sociology',
        'Electrical Engineering',
        'Design and Media Arts',
        'Micro-biology'
    ];



    for (let i = 0; i < 30; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@school.edu`;
        const user = await prisma.user.create({
            data: {
                name: `${firstName} ${lastName}`,
                email,
                passwordHash,
                role: faker.helpers.arrayElement(roles),
                school: faker.helpers.arrayElement(colleges),
                major: faker.helpers.arrayElement(majors),
                classification: faker.helpers.arrayElement(classification),
                bio: faker.lorem.paragraph()
            },
        });
    }
}

main()
    .catch((e) => {
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    })