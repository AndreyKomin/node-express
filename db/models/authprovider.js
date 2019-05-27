module.exports = (sequelize, DataTypes) => {
  const AuthProvider = sequelize.define('AuthProvider', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    providerUserId: DataTypes.STRING,
    providerType: {
      type: DataTypes.ENUM([
        'instagram',
        'facebook',
        'vk',
      ]),
      allowNull: false,
      primaryKey: true,
    },
    username: DataTypes.STRING,
    accessToken: DataTypes.STRING,
  }, {
    underscored: true,
    timestamps: true,
  });
  AuthProvider.associate = function (models) {
    console.log(models.AuthProvider.belongsTo);

    models.AuthProvider.belongsTo(models.User, {
      as: 'authProvider',
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });

    // this.belongsTo(models.User, {
    //   foreignKey: 'uuid',
    //   sourceKey: 'uuid',
    //   targetKey: 'user_uuid',
    //   onDelete: 'CASCADE',
    // });
  };

  return AuthProvider;
};
