module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('auth_providers', {
    user_id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },
    provider_user_id: {
      type: Sequelize.STRING,
    },
    provider_type: {
      type: Sequelize.ENUM([
        'instagram',
        'facebook',
        'vk',
      ]),

      primaryKey: true,
    },
    username: Sequelize.STRING,
    access_token: {
      type: Sequelize.STRING,
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }).then(() => queryInterface.addConstraint('auth_providers', ['user_id'], {
    type: 'FOREIGN KEY',
    references: {
      table: 'users',
      field: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('auth_providers'),
};
