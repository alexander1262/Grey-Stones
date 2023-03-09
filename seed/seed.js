const { sequelize } = require('../config/connection');
const { User, Character } = require('../models');

const userData = require('./userData.json');
const charData = require('./charData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    await sequelize.sync({ force: true });

    await Character.bulkCreate(charData, {
        returning: true,
    });

    process.exit(0);
};

seedDatabase();