const Role = require('./role.model');
const Homepage = require('./hompage.model')
const { logger } = require('../util')

const roleSeeds = async () => {
    // create admin role if it is not there
    let adminRole = await Role.findOne({ name: 'admin' });
    if (adminRole) {
        // admin role already seeded
        return;
    }

    logger.info('creating admin role');

    adminRole = new Role();
    adminRole.name = 'admin';
    adminRole.permissions = {
        user: {
            read: true,
            write: true
        },
        category: {
            read: true,
            write: true
        },
        product: {
            read: true,
            write: true
        },
        order: {
            read: true,
            write: true
        },
        customer: {
            read: true,
            write: true
        },
        inquiry: {
            read: true,
            write: true
        },
        sales: {
            read: true,
            write: true
        }
    }

    await adminRole.save();
}

const homepageSeed = async () => {
    let homepageCount = await Homepage.countDocuments();
    if (homepageCount === 0) {
        // create default homepage
        const homepage = new Homepage();
        await homepage.save();
    }
}


const runSeeds = async () => {
    await roleSeeds();
    await homepageSeed();
}

module.exports = {
    runSeeds
}