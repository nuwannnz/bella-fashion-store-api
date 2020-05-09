const Role = require('./role.model');
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



const runSeeds = async () => {
    await roleSeeds();
}

module.exports = {
    runSeeds
}