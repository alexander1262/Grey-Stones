const { sequelize } = require('../config/connection');
const { User, Character } = require('../models');

const userData = require('./userData.json');
const charData = require('./charData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const character of charData) {
    await Character.create({
      ...character,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  process.exit(0);
};

seedDatabase();
