module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [{
    firstName: 'John',
    lastName: 'Doe',
    email: 'demo@demo.com',
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {}),
};
